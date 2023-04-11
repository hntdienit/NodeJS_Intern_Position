import express from "express";
import { register, login, logout } from "../controllers/auth.controller.js";
import { vBody, schemas } from "../middlewares/validate.middleware.js";

const router = express.Router();

router.route("/register").post(vBody(schemas.register), register);
router.route("/login").post(vBody(schemas.login), login);
router.route("/logout").post(logout);

export default router;
