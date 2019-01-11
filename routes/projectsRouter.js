const express = require("express");
const route = express.Router();

const projectModel = require("../data/helpers/projectModel");

function generalErr(err, res) {
  res
    .status(500)
    .json({ message: "There is something wrong is the database." });
}
route.get("/", async (req, res) => {
  try {
    const projectList = await projectModel.get();
    res.json(projectList);
  } catch (err) {
    generalErr();
  }
});

route.post("/add", async (req, res) => {
  const newProject = req.body;
  try {
    const result = await projectModel.insert(newProject);
    res.status(201).json({ message: `Project has been created!` });
  } catch (err) {
    generalErr(err, res);
  }
});

module.exports = route;
