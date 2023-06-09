import bcrypt from "bcrypt";
import fs from "fs";
import sequelize from "../config/db.js";
import { Op } from "sequelize";

import mailer from "../utils/mailer.js";
import createError from "../utils/createError.js";
import Users from "../models/User.model.js";

const base64_encode = (file) => {
  return "data:image/gif;base64," + fs.readFileSync(file, "base64");
};

export const getProfile = async (req, res, next) => {
  const user = await Users.findByPk(req.user.id, {
    attributes: ["id", "firstName", "lastName", "email", "avatarImage"],
  });
  if (!user) {
    return next(createError(404, "The user you're looking for doesn't exist!"));
  }
  res.status(200).send(user);
};

export const updateProfile = async (req, res, next) => {
  try {
    const base64str = base64_encode(req.file.path);
    await Users.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        avatarImage: base64str,
      },
      {
        where: {
          id: req.user.id,
        },
      }
    );
    return res.status(201).json("Profile update successful!");
  } catch (err) {
    next(err);
  }
};

export const listUser = async (req, res, next) => {
  try {
    const listUser = await Users.findAll({
      attributes: ["id", "firstName", "lastName", "email", "avatarImage"],
      where: {
        role: "user",
      },
    });
    res.json(listUser);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  const user = await Users.findByPk(req.params.id, {
    attributes: ["id", "firstName", "lastName", "email", "avatarImage"],
  });
  if (!user) {
    return next(createError(404, "The user you're looking for doesn't exist!"));
  }
  res.status(200).send(user);
};

export const updateUser = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    await Users.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        role: req.body.role,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    return res.status(201).json("User update successful!");
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await Users.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(201).json("Delete user successfully!");
  } catch (err) {
    next(err);
  }
};

export const pagination = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.keyword || "";
    const offset = limit * page;
    const totalRows = await Users.count({
      where: {
        [Op.or]: [
          { firstName: { [Op.like]: "%" + search + "%" } },
          { lastName: { [Op.like]: "%" + search + "%" } },
          { email: { [Op.like]: "%" + search + "%" } },
        ],
        role: "user",
      },
      offset: offset,
      limit: limit,
      order: [["id", "DESC"]],
    });

    const totalPage = Math.ceil(totalRows / limit);
    const result = await Users.findAll({
      attributes: ["id", "firstName", "lastName", "email", "avatarImage"],
      where: {
        [Op.or]: [
          { firstName: { [Op.like]: "%" + search + "%" } },
          { lastName: { [Op.like]: "%" + search + "%" } },
          { email: { [Op.like]: "%" + search + "%" } },
        ],
        role: "user",
      },
      offset: offset,
      limit: limit,
      order: [["id", "DESC"]],
    });

    res.json({
      result: result,
      page: page,
      limit: limit,
      totalRows: totalRows,
      totalPage: totalPage,
    });
  } catch (err) {
    next(err);
  }
};

export const findEmail = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      attributes: ["email", "firstName", "emailVerified"],
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return next(createError(404, "The email you are looking for does not exist!"));
    }

    mailer(
      user.email,
      "Verify Email",
      `<div style="text-align: center">
              <h2>Confirm email for account!</h2>
              <p>Hello <span style="color: #00aff0">${user.firstName}!</span></p>
              <p>You just signed up for an account</p>
              <h2>Your account verification code : <span style="color: #00aff0">${user.emailVerified}</span></h2>
            </div>`
    );

    return res.status(201).json({ verify: "verify", email: user.email });
  } catch (err) {
    next(err);
  }
};

export const checkOTP = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return next(createError(404, "The email you are looking for does not exist!"));
    }

    if (user.emailVerified !== parseInt(req.body.emailVerified)) {
      return next(createError(400, "Your otp code is incorrect!"));
    }

    res.status(200).send({ email: user.email });
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const user = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return next(createError(404, "The email you are looking for does not exist!"));
    }
    await Users.update(
      {
        password: hash,
        emailVerified: Math.floor(Math.random() * (999999 - 100000)) + 100000,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    return res.status(201).json("Password update successful!");
  } catch (err) {
    next(err);
  }
};

export const changepassword = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.user.id,
      },
    });
    if (!user) {
      return next(createError(404, "The email you are looking for does not exist!"));
    }

    bcrypt.compare(req.body.oldpassword, user.password).then((match) => {
      if (!match) return res.status(200).json({ error: "Incorrect  password!" });

      Users.update(
        {
          password: bcrypt.hashSync(req.body.newPassword, 5),
        },
        {
          where: {
            id: user.id,
          },
        }
      );
      return res.status(201).json("Password update successful!");
    });
  } catch (err) {
    next(err);
  }
};
