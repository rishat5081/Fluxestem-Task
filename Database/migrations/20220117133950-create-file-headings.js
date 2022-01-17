"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("fileHeadings", {
      headingID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      headingsName: {
        type: Sequelize.STRING,
      },
      fileID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        foreignKey: true,
        autoIncrement: false,
        references: {
          model: "filesNames",
          key: "fileID",
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
    await queryInterface.dropTable("fileHeadings");
  },
};
