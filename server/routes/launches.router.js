const express = require("express");

const launchesRouter = express.Router();

const { HttpGetAllLaunches } = require("./launches.controller");

launchesRouter.get("/launches", HttpGetAllLaunches);

module.exports = launchesRouter;
