const express = require("express");

const planetsRouter = express.Router();

const { getAllPlanets } = require("./planets.controller");

// GET /planets
planetsRouter.get("/", getAllPlanets);

module.exports = planetsRouter;
