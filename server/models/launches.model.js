const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

// axios is a promise based HTTP client for the browser and node.js to make http requests
const axios = require("axios");

let DEFAULT_FLIGHT_NUMBER = 100;

// commented name shows the name of the property in the SPACEX API
// const launch = {
//   flightNumber: 100, // flight_number
//   mission: "Keppler Observation X", // mission_name
//   rocket: "Explorer IS1", // rocket.name
//   launchDate: new Date("December 27, 2030"), // date_local
//   target: "Kepler-442 b", // not available in SPACEX API
//   customer: ["ZTM", "NASA"], // payloads.customers  for each payload
//   upcoming: true, // upcoming
//   success: true, // success
// };

// saveLaunch(launch);

const findLaunch = async (filter) => {
  return await launchesDatabase.findOne(filter);
};

// to check if a launch with a given flight number exists
const existsLaunchWithId = async (launchId) => {
  return await findLaunch({
    flightNumber: launchId,
  });
};

// to get the latest flight number
const getLatestFlightNumber = async () => {
  const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
};

// to get all launches from the database
const getAllLaunches = async (skip, limit) => {
  return await launchesDatabase
    .find({}, { _id: 0, __v: 0 })
    .sort({ flightNumber: 1 })
    .skip(skip)
    .limit(limit);
};

// to save a launch to the database
const saveLaunch = async (launch) => {
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

const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

const populateLaunches = async () => {
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });

  if (response.status !== 200) {
    console.log("Problem downloading launch data");
    throw new Error("Launch data download failed");
  }

  const launchDocs = response.data.docs;
  for (const launchDoc of launchDocs) {
    const payloads = launchDoc["payloads"];
    // payloads.flatMap() is a new method in ES2020 that returns a new array
    // with the results of calling a provided function on every element in the calling array
    const customers = payloads.flatMap((payload) => {
      return payload["customers"];
    });

    const launch = {
      flightNumber: launchDoc["flight_number"],
      mission: launchDoc["name"],
      rocket: launchDoc["rocket"]["name"],
      launchDate: launchDoc["date_local"],
      upcoming: launchDoc["upcoming"],
      success: launchDoc["success"],
      customers,
    };

    console.log(`${launch.flightNumber} ${launch.mission}`);
    await saveLaunch(launch);
  }
};

// to populate the database with launch data
const loadLaunchData = async () => {
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });

  if (firstLaunch) {
    console.log("Launch data already loaded");
  } else {
    await populateLaunches();
  }
};

// to schedule a new launch
const scheduleNewLaunch = async (launch) => {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error("No matching planet found");
  }
  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["Zero to Mastery", "NASA"],
    flightNumber: newFlightNumber,
  });

  await saveLaunch(newLaunch);
};

// to abort a launch by its flight number
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
  loadLaunchData,
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
};
