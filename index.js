import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import sequelize from "./config/db.js";
import relationship from "./models/Relationship.js";
import router from "./routes/index.js";

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

/* routes */
router(app);

/* start server */
app.listen(process.env.PORT, () => {
  console.log(`✅ server runing on http://localhost:${process.env.PORT}`);
});
