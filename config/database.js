import { Sequelize } from "sequelize";
import express from "express";

const app = express();

const sequelize = new Sequelize("assignment_task", "root", "mineSQL#30", {
  dialect: "mysql",
  host: "localhost",
});

export default sequelize;

const port = process.env.PORT || 4000;

export async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL Connected");

    await sequelize.sync({ alter: true });  

    app.listen(port, () => console.log(`🚀 Server running on port ${port} `));
  } catch (err) {
    console.error("❌ Error:", err);
  }
}
