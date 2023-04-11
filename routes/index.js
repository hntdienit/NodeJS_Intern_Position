import authRoute from "./auth.route.js";
import userRoute from "./user.route.js";

import createError from "../utils/createError.js";

const router = (app) => {
  app.get("/", (req, res, next) => {
    return res.status(200).json({
      message: "server run ok!",
    });
  });

  app.use("/auth", authRoute);
  app.use("/user", userRoute);

  app.use("/:error", (req, res, next) => {
    return next(createError(404, "The desired path was not found!"));
  });

  app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "An error has occurred!";
    return res.status(errorStatus).json({ error: errorMessage });
  });
};

export default router;
