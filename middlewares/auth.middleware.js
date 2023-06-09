import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const endCode = (id, email, role) => {
  return jwt.sign(
    {
      iss: "thanhdien",
      sub: { id, email, role },
      iat: new Date().setTime(),
      exp: new Date().setDate(new Date().getDate() + 3),
    },
    process.env.JWT_SECRET
  );
};

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return next(createError(401, "You are not logged in!"));

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) return next(createError(403, "The authentication code is incorrect!"));
    req.user = payload.sub;
    next();
  });
};

export const checkPermission = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return next(createError(403, "You do not have enough access!"));
    }
    next();
  } catch (err) {
    next(err);
  }
};
