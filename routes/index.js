var express = require("express"),
  router = express.Router(),
  Database = require("../Database/models");

/* GET home page. */
router.get("/", async (req, res, next) => {
  const fileList = await Database.filesNames
    .findAll({
      attributes: ["fileName", "createdAt"],
      include: {
        model: Database.fileHeadings,
        required: true,
        include: {
          model: Database.fileColumns,
          required: true,
        },
      },
    })
    .then((result) => {
      if (result) return result;
    })
    .catch((err) => {
      if (err) {
        throw new Error("Error Inserting File Name");
      }
    });

  console.log(fileList[0].dataValues.fileHeadings[0]);
  res.render("index", { title: "Task", fileList });
});

router.post("/uploadFileContent", async (req, res) => {
  const { headings, content, fileName } = req.body;

  try {
    //creating the new file into the database
    const insertFile = await Database.filesNames
      .create({
        fileName,
      })
      .then((result) => {
        if (result) return result;
      })
      .catch((err) => {
        if (err) {
          throw new Error("Error Inserting File Name");
        }
      });
    //parsing the heading to JSON
    const fileHeading = JSON.parse(headings);
    //the file is created now adding the file columns names
    //using the sequelize bulkCreate to insert many values at once
    const insertFileHeadings = await Database.fileHeadings
      .bulkCreate(
        fileHeading.map((heading) => ({
          headingsName: heading,
          fileID: insertFile.dataValues.fileID,
        }))
      )
      .then((result) => {
        if (result) return result;
      })
      .catch((err) => {
        if (err) {
          throw new Error("Error Inserting File Name");
        }
      });

    //now the last part
    //manipulating the file content
    // adding the heading primary key to the
    //last child table

    const fileContent = JSON.parse(content);
    var refinedData = [];

    fileContent.forEach((element, fileContentIndex) => {
      element.forEach((content, contentIndex) => {
        insertFileHeadings.forEach((headingID, index) => {
          if (index === contentIndex) {
            refinedData.push({
              headingID: headingID.dataValues.headingID,
              columnData: content,
            });
          }
        });
      });
    });

    //now the data is in the form of the table,
    //inserting the values into the database
    //using the bulkCreate

    const insertFileColumns = await Database.fileColumns
      .bulkCreate(
        refinedData.map((element) => ({
          headingID: element.headingID,
          columnData: element.columnData,
        }))
      )
      .then((result) => {
        if (result) return result;
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          throw new Error("Error Inserting File Columns");
        }
      });

    res.send({ status: "Okay" });
  } catch (error) {
    console.log(error);
    res.send({ status: 500, message: "Error Occur" });
  }
});

module.exports = router;
