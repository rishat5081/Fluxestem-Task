var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  res.render("index", { title: "Express" });
});

router.post("/uploadFileContent", async (req, res) => {
  const { headings, content, fileName } = req.body;
  console.log(JSON.parse(headings), JSON.parse(content), fileName);
  res.send({ status: "Okay" });
});

module.exports = router;
