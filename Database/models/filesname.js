"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class filesName extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  filesName.init(
    {
      fileID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      fileName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "filesName",
      freezeTableName: true,
    }
  );
  return filesName;
};
