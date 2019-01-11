const express = require("express");
const route = express.Router();

const projectModel = require("../data/helpers/projectModel");

// middleware
const checkProject = require("../common/checkProject");
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
    generalErr(err, res);
  }
});
route.get("/:id/actions", async (req, res) => {
  const { id } = req.params;
  const actionlist = await projectModel.getProjectActions(id);
  if (actionlist) {
    res.json({ actionlist });
  } else {
    res.status(404).json({
      message: "Project not found"
    });
  }
});

route.post("/add", checkProject, async (req, res) => {
  const newProject = req.body;
  try {
    const result = await projectModel.insert(newProject);
    if (result) {
      res.status(201).json({ message: `Project has been created!` });
    }
  } catch (err) {
    generalErr(err, res);
  }
});
route.put("/:id", checkProject, async (req, res) => {
  const { id } = req.params;
  const change = req.body;
  try {
    const project = await projectModel.get(id);
    if (project) {
      const result = await projectModel.update(id, change);
      res.json({ message: `Project has been updated` });
    } else {
      res.status(404).json({ message: "Project not found!" });
    }
  } catch (err) {
    generalErr(err, res);
  }
});

route.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const project = await projectModel.get(id);
    if (project) {
      const count = await projectModel.remove(id);
      res.json({
        message: `${count} project with the title: "${
          project.name
        }"has been deleted`
      });
    } else {
      res.status(404).json({ message: "Project not found!" });
    }
  } catch (err) {
    generalErr(err, res);
  }
});
module.exports = route;
