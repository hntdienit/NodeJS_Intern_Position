import joi from "joi";
import createError from "../utils/createError.js";

export const vBody = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return next(createError(400, error.details));
    } else {
      if (!req.value) req.value = {};
      req.value.body = value;
      next();
    }
  };
};

export const vParam = (schema, name) => {
  return (req, res, next) => {
    const { error, value } = schema.validate({ param: req.params[name] }, { abortEarly: false });
    if (error) {
      return next(createError(400, "Thông tin nhập chưa chính xác!"));
    } else {
      if (!req.value) req.value = {};
      if (!req.value["params"]) req.value.params = {};
      req.value.params[name] = req.params[name];
      next();
    }
  };
};

const validate = {
  firstName: joi.string().required().max(50),
  lastName: joi.string().required().max(50),
  email: joi.string().required().email(),
  password: joi.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$")),
  confirmedPassword: joi.ref("password"),
};

export const schemas = {
  register: joi.object({
    firstName: validate.firstName,
    lastName: validate.lastName,
    email: validate.email,
    password: validate.password,
    confirmedPassword: validate.confirmedPassword,
  }),

  login: joi.object({
    email: validate.email,
    password: validate.password,
  }),

  changepassword: joi.object({
    oldpassword: validate.password,
    newpassword: validate.password,
    confirmedPassword: validate.confirmedPassword,
  }),

  updateprofile: joi.object({
    firstName: validate.firstName,
    lastName: validate.lastName,
  }),

  email: joi.object({
    email: validate.email,
  }),

  updateuser: joi.object({
    firstName: validate.firstName,
    lastName: validate.lastName,
    email: validate.email,
    password: validate.password,
  }),

  forgotPassword: joi.object({
    password: validate.password,
    confirmedPassword: validate.confirmedPassword,
  }),
};
