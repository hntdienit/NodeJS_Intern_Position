import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Users = sequelize.define(
  "Users",
  {
    firstName: { type: DataTypes.STRING, allowNull: true },
    lastName: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: true },
    avatarImage: { type: DataTypes.TEXT, allowNull: true },
    role: { type: DataTypes.STRING, defaultValue: "user" },
    emailVerified: { type: DataTypes.INTEGER, defaultValue: "0" },
  },
  {
    // Other model options go here
  }
);

export default Users;
