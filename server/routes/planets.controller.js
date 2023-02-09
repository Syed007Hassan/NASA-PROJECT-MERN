const { getAllPlanets } = require("../models/planets.model");

const HttpGetAllPlanets = (req, res) => {
  res.status(200).json(getAllPlanets());
};

module.exports = {
  HttpGetAllPlanets,
};
