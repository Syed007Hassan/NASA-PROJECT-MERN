//versioning api routes
const express = require("express");
const app = express();
const api = express.Router();

const planetsRouter = require("./planets.router");
const launchesRouter = require("./launches.router");

api.use(planetsRouter);
api.use(launchesRouter);

module.exports = api;
