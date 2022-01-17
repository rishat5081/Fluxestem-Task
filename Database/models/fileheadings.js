'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fileHeadings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  fileHeadings.init({
    columnNames: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'fileHeadings',
  });
  return fileHeadings;
};