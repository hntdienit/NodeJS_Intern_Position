import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import sequelize from "./config/db.js";
import relationship from "./models/Relationship.js";
import router from "./routes/index.js";

import passport from "passport";
import cookieSession from "cookie-session";

const app = express();

/* connection Mysql */
try {
  await sequelize.authenticate();
  relationship();
  await sequelize.sync();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

/* take data req.body */
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: true }));

/* middlewares */
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT,
    credentials: true,
    optionSuccessStatus: 200,
  })
);

app.use(express.static("public"));

app.use(
  cookieSession({
    name: "google-auth-session",
    keys: ["key1", "key2"],
    // sessionSameSite: "none",
    // cookieIpCheck: "none",
  })
);

app.use((req, res, next) => {
  if (req.session && !req.session.regenerate) {
    req.session.regenerate = (cb) => {
      cb();
    };
  }
  if (req.session && !req.session.save) {
    req.session.save = (cb) => {
      cb();
    };
  }
  next();
});

app.use(passport.initialize());
app.use(passport.session());

/* routes */
router(app);

/* start server */
app.listen(process.env.PORT, () => {
  console.log(`✅ server runing on http://localhost:${process.env.PORT}`);
});
