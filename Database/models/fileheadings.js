"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class fileHeadings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      models.filesName.hasMany(fileHeadings, {
        foreignKey: "fileID",
      });

      fileHeadings.belongsTo(models.filesName, {
        targetKey: "fileID",
        foreignKey: "fileID",
      });
    }
  }
  fileHeadings.init(
    {
      headingID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      headingsName: DataTypes.STRING,
      fileID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        autoIncrement: false,
        references: {
          model: "filesName",
          key: "fileID",
        },
      },
    },
    {
      sequelize,
      modelName: "fileHeadings",
      freezeTableName: true,
    }
  );
  return fileHeadings;
};
