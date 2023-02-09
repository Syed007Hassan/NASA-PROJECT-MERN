const express = require("express");

const launchesRouter = express.Router();

const {
  HttpGetAllLaunches,
  HttpAddNewLaunch,
} = require("./launches.controller");

launchesRouter.get("/launches", HttpGetAllLaunches);
launchesRouter.post("/launches", HttpAddNewLaunch);

module.exports = launchesRouter;
