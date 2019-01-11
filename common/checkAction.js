const actionModel = require("../data/helpers/actionModel");

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const project = await actionModel.get(id);
};
