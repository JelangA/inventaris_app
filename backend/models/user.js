const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "User",
  {
    id: {
      field: "id",
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      field: "name",
      allowNull: false,
      type: DataTypes.STRING,
    },
    job: {
      field: "job",
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "users",
  }
);

module.exports = User;
