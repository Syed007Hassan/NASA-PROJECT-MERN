const express = require("express");

const planetsRouter = express.Router();

const { HttpGetAllPlanets } = require("./planets.controller");

// GET /planets
planetsRouter.get("/planets", HttpGetAllPlanets);

module.exports = planetsRouter;
