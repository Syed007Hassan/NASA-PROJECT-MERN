const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: "Keppler Observation X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  destination: "Kepler-442 b",
  customer: ["ZTM", "NASA"],
};

// Add launch to map of launches with flightNumber as key
launches.set(launch.flightNumber, launch);

const getAllLaunches = () => {
  return Array.from(launches.values());
};

const addNewLaunch = (launch) => {
  latestFlightNumber++;
  launch.set(
    launch.flightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      customers: ["Zero To Mastery", "NASA"],
      upcoming: true,
      success: true,
    })
  );
};

module.exports = {
  getAllLaunches,
};
