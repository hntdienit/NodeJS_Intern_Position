import express from "express";
import { verifyToken, checkPermission } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";
import { vBody, schemas } from "../middlewares/validate.middleware.js";

import {
  getProfile,
  updateProfile,
  listUser,
  getUser,
  updateUser,
  deleteUser,
  pagination,
  findEmail,
  checkOTP,
  forgotPassword,
  changepassword,
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/list").get(verifyToken, checkPermission, listUser);

router.route("/pagination").get(verifyToken, checkPermission, pagination);

router.route("/findemail").post(vBody(schemas.email), findEmail);

router.route("/checkotp").post(vBody(schemas.email), checkOTP);

router.route("/forgotpassword").post(vBody(schemas.forgotPassword), forgotPassword);

router.route("/changepassword").post(verifyToken, vBody(schemas.changepassword), changepassword);

router
  .route("/")
  .get(verifyToken, getProfile)
  .patch(verifyToken, upload.single("avatarImage"), vBody(schemas.updateprofile), updateProfile);

router
  .route("/:id")
  .get(verifyToken, checkPermission, getUser)
  .patch(verifyToken, checkPermission, vBody(schemas.updateuser), updateUser)
  .delete(verifyToken, checkPermission, deleteUser);

export default router;
