import express from "express";
import { register, login, logout, googleSuccess } from "../controllers/auth.controller.js";
import { vBody, schemas } from "../middlewares/validate.middleware.js";
import passport from "passport";
import "../middlewares/passport.middleware.js";

const router = express.Router();

router.route("/register").post(vBody(schemas.register), register);
router.route("/login").post(vBody(schemas.login), login);
router.route("/logout").post(logout);

// Google
router.route("/google").get(passport.authenticate("google", { scope: ["email", "profile"] }));
router.route("/callback").get(
  passport.authenticate("google", {
    successRedirect: "/auth/callback/success",
    failureRedirect: "/auth/callback/failure",
  })
);
router.route("/callback/success").get(googleSuccess);
router.route("/callback/failure").get((req, res) => {
  res.send("Error");
});
// Google

export default router;
