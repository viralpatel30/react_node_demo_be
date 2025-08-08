import { Sequelize } from "sequelize";
import express from "express";

const app = express();

const sequelize = new Sequelize(process.env.DATABASE_NAME, "root", process.env.MYSQL_PASSWORD, {
  dialect: "mysql",
  host: "localhost",
});

export default sequelize;

export async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL Connected");

    await sequelize.sync();
  } catch (err) {
    console.error("❌ Error:", err);
  }
}
