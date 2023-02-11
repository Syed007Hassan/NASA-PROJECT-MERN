const {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require("../models/launches.model");

const HttpGetAllLaunches = (req, res) => {
  return res.status(200).json(getAllLaunches());
};

const HttpAddNewLaunch = (req, res) => {
  const launch = req.body;
  console.log("the launch is: ", launch);
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }

  addNewLaunch(launch);
  return res.status(201).json(launch);
};

const HttpAbortLaunch = (req, res) => {
  const launchId = Number(req.params.id);

  if (!existsLaunchWithId(launchId)) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }
  const aborted = abortLaunchById(launchId);
  return res.status(200).json(aborted);
};

module.exports = {
  HttpGetAllLaunches,
  HttpAddNewLaunch,
  HttpAbortLaunch,
};
