const { getAllLaunches } = require("../models/launches.model");

const HttpGetAllLaunches = (req, res) => {
  return res.status(200).json(getAllLaunches());
};

module.exports = {
  HttpGetAllLaunches,
};
