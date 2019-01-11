const projectModel = require("../data/helpers/projectModel");
module.exports = async (req, res, next) => {
  const { project_id, description, notes } = req.body;
  const project = await projectModel.get(project_id);
  console.log(project);
  if (
    project &&
    description.length > 0 &&
    typeof description === "string" &&
    typeof notes === "string"
  ) {
    next();
  } else if (!project) {
    res
      .status(400)
      .json({ message: "Project id does not exist in the database" });
  } else {
    res.status(400).json({
      message:
        "Please include the correct project id and descriptions up to 128 characters."
    });
  }
};
