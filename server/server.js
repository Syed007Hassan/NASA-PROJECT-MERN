const app = require("./app");

const { loadPlanetsData } = require("./models/planets.model");

const port = 5000 || process.env.PORT;

async function startServer() {
  await loadPlanetsData();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();
module.exports = app;
