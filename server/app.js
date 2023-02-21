const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const dotenv = require("dotenv");
const api = require("./routes/api");

dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//morgan is a logger middleware for node.js
app.use(morgan("short"));

app.use(express.static(path.join(__dirname, "public")));

app.use("/v1", api);

// This is a catch-all route handler that sends back the React app's index.html file.
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;
