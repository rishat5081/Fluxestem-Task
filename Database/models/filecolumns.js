"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class fileColumns extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.fileHeadings.hasMany(fileColumns, {
        foreignKey: "headingID",
      });

      fileColumns.belongsTo(models.fileHeadings, {
        targetKey: "headingID",
        foreignKey: "headingID",
      });
    }
  }
  fileColumns.init(
    {
      columnData: DataTypes.TEXT,
      headingID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
        autoIncrement: false,
        references: {
          model: "fileHeadings",
          key: "headingID",
        },
      },
    },
    {
      sequelize,
      modelName: "fileColumns",
      freezeTableName: true,
    }
  );
  return fileColumns;
};
