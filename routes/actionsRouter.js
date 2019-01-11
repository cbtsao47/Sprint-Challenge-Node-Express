const express = require("express");
const route = express.Router();

const actionModel = require("../data/helpers/actionModel");

function generalErr(err, res) {
  res
    .status(500)
    .json({ message: "There is something wrong is the database." });
}

route.get("/", async (req, res) => {
  try {
    const actionList = await actionModel.get();
    res.json(actionList);
  } catch (err) {
    generalErr(err, res);
  }
});

route.post("/add", async (req, res) => {
  const action = req.body;
  try {
    const result = await actionModel.insert(action);
    if (result) {
      res.status(201).json({ message: "Action has been created!" });
    }
  } catch (err) {
    generalErr(err, res);
  }
});

route.put("/:id", async (req, res) => {
  const { id } = req.params;
  const change = req.body;
  try {
    const action = await actionModel.get(id);
    if (action) {
      const result = await actionModel.update(id, change);
      res.json({ message: `Action has been updated` });
    } else {
      res.status(404).json({ message: "Action not found!" });
    }
  } catch (err) {
    generalErr(err, res);
  }
});

route.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const action = await actionModel.get(id);
    if (action) {
      const count = await actionModel.remove(id);
      res.json({
        message: `${count} action has been deleted`
      });
    } else {
      res.status(404).json({ message: "Action not found!" });
    }
  } catch (err) {
    generalErr(err, res);
  }
});

module.exports = route;
