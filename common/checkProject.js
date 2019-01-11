module.exports = (req, res, next) => {
  const project = req.body;
  const { name, description } = project;

  if (
    name.length > 0 &&
    typeof name === "string" &&
    name.length <= 128 &&
    typeof description === "string" &&
    description.length > 0
  ) {
    next();
  } else {
    res.status(400).json({
      message: "Please include both name and description under 128 characters"
    });
  }
};
