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

// Add launch to map of launches with flightNumber as key
launches.set(launch.flightNumber, launch);

const existsLaunchWithId = (launchId) => {
  return launches.has(launchId);
};

const getAllLaunches = () => {
  return Array.from(launches.values());
};

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
