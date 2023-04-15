const { DataTypes } = require("sequelize");
const connection = require("../config/connection");

const User = connection.define(
  "User",
  {
    userId: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    privileges: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    clinicId: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    branchId: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = User;
