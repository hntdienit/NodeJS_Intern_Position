import sequelize from "../config/db.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import emailExistence from "email-existence";

import mailer from "../utils/mailer.js";
import createError from "../utils/createError.js";
import { endCode } from "../middlewares/auth.middleware.js";

import Users from "../models/User.model.js";

export const register = async (req, res, next) => {
  try {
    const user = await Users.findOne({ where: { email: req.body.email } });

    if (user) return res.status(200).json({ error: "Email has been registered account!" });

    const hash = bcrypt.hashSync(req.body.password, 5);

    const newUser = await Users.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
      emailVerified: Math.floor(Math.random() * (999999 - 100000)) + 100000,
    });

    emailExistence.check(newUser.email, function (error, response) {
      if (response) {
        mailer(
          newUser.email,
          "Verify Email",
          `<div style="text-align: center">
              <h2>Confirm email for account!</h2>
              <p>Hello <span style="color: #00aff0">${newUser.firstName}!</span></p>
              <h2 style="color: #00aff0">You have successfully registered an account!</h2>
            </div>`
        );
        return res.status(201).json({ email: newUser.email, message: "Successful account registration!" });
      } else {
        Users.destroy({ where: { email: newUser.email } });
        return res.json({ error: "Email does not exist!" });
      }
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ where: { email: email } });

    if (!user) return res.status(200).json({ error: "Account does not exist!" });

    bcrypt.compare(password, user.password).then((match) => {
      if (!match) return res.status(200).json({ error: "Incorrect account or password!" });
      const accessToken = endCode(user.id, user.email, user.role);
      return res
        .cookie("accessToken", accessToken, {
          httpOnly: true,
        })
        .status(200)
        .json({
          userId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          avatarImage: user.avatarImage,
          role: user.role,
          AccessToken: accessToken,
        });
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("You have successfully signed out. Goodbye!");
};

export const googleSuccess = async (req, res) => {
  const user = req.user;
  if (!user) return res.redirect("/auth/callback/failure");
  const accessToken = endCode(user.id, user.email, user.role);
  return res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
    })
    .status(200)
    .json({
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatarImage: user.avatarImage,
      role: user.role,
      AccessToken: accessToken,
    });
};
