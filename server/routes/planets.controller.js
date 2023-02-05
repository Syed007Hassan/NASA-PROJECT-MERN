const { planets } = require("../models/planets.model");

const getAllPlanets = (req, res) => {
  console.log(planets);
  res.status(200).json(planets);
};

module.exports = {
  getAllPlanets: getAllPlanets,
};
