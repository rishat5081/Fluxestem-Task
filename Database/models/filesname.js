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
      fileName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "filesName",
    }
  );
  return filesName;
};
