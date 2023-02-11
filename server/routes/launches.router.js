const express = require("express");

const launchesRouter = express.Router();

const {
  HttpGetAllLaunches,
  HttpAddNewLaunch,
  HttpAbortLaunch,
} = require("./launches.controller");

launchesRouter.get("/launches", HttpGetAllLaunches);
launchesRouter.post("/launches", HttpAddNewLaunch);
launchesRouter.delete("/launches/:id", HttpAbortLaunch);

module.exports = launchesRouter;
