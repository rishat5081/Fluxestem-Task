var express = require("express"),
  router = express.Router(),
  Database = require("../Database/models");

/* GET home page. */
router.get("/", async (req, res, next) => {
  res.render("index", { title: "Express" });
});

router.post("/uploadFileContent", async (req, res) => {
  const { headings, content, fileName } = req.body;
  console.log(JSON.parse(content), fileName);

  try {
    //creating the new file into the database
    const insertFile = await Database.filesName
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
    const insertFileHeadings = await Database.filesHeadings
      .bulkCreate(fileHeading)
      .then((result) => {
        if (result) return result;
      })
      .catch((err) => {
        if (err) {
          throw new Error("Error Inserting File Name");
        }
      });
  } catch (error) {
    console.log(error);
    res.send({ status: 500, message: "Error Occur" });
  }
  res.send({ status: "Okay" });
});

module.exports = router;
