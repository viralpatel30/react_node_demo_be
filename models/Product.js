import { DataTypes } from "sequelize";

import sequelize from "../config/database.js";
import { Variant } from "./Variant.js";

const Product = sequelize.define("product", {
  productId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Product.hasMany(Variant, { foreignKey: "productId", onDelete: "CASCADE" });
Variant.belongsTo(Product, { foreignKey: "productId" });

export { Product, Variant };
