const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.set("strictQuery", false);

const { loadPlanetsData } = require("./models/planets.model");
const { loadLaunchData } = require("./models/launches.model");

const port = 5000 || process.env.PORT;

async function startServer() {
  await connectDb();
  await loadPlanetsData();
  await loadLaunchData();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
//creating a db connection
const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://admin-hassan:" +
      process.env.MONGOATLASPASWORD +
      "@cluster0.yipmq.mongodb.net/NasaProject",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  );
  console.log("MongoDB Server is up and running");
};

const mongooseDisconnect = async () => {
  await mongoose.disconnect();
};

startServer();
module.exports = {
  app,
  connectDb,
  mongooseDisconnect,
};
