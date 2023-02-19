const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

let DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: "Keppler Observation X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

const existsLaunchWithId = async (launchId) => {
  return await launchesDatabase.findOne({
    flightNumber: launchId,
  });
};

const getLatestFlightNumber = async () => {
  const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
};

const getAllLaunches = async () => {
  return await launchesDatabase.find({}, { _id: 0, __v: 0 });
};

const saveLaunch = async (launch) => {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error("No matching planet found");
  }
  await launchesDatabase.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
};

saveLaunch(launch);

const scheduleNewLaunch = async (launch) => {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["Zero to Mastery", "NASA"],
    flightNumber: newFlightNumber,
  });

  await saveLaunch(newLaunch);
};

const abortLaunchById = async (launchId) => {
  const aborted = await launchesDatabase.findOneAndUpdate(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  );
  if (!aborted) {
    return false;
  }
  return true;
};

module.exports = {
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
};
