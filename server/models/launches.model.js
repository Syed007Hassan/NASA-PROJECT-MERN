const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");
const launches = new Map();

let latestFlightNumber = 100;

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

const existsLaunchWithId = (launchId) => {
  return launches.has(launchId);
};

const getAllLaunches = async () => {
  return await launchesDatabase.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
};

const saveLaunch = async (launch) => {
  try {
    const planet = await planets.findOne({
      keplerName: launch.target,
    });

    if (!planet) {
      throw new Error("No matching planet found");
    }

    await launchesDatabase.updateOne(
      {
        flightNumber: launch.flightNumber,
      },
      launch,
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
};
saveLaunch(launch);

const abortLaunchById = (launchId) => {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
};

const addNewLaunch = (newLaunch) => {
  latestFlightNumber++;
  launches.set(
    latestFlightNumber,
    Object.assign(newLaunch, {
      success: true,
      upcoming: true,
      customers: ["ZTM", "NASA"],
      flightNumber: latestFlightNumber,
    })
  );
};

module.exports = {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
};
