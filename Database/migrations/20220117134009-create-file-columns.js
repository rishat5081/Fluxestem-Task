"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("fileColumns", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      columnData: {
        type: Sequelize.STRING,
      },
      headingID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        autoIncrement: false,
        references: {
          model: "fileHeadings",
          key: "headingID",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("fileColumns");
  },
};
