require("dotenv").config();
require("./database");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const ContactRoutes = require("./Routes/ContactRoutes");
const SchedullingRoutes = require("./Routes/SchedullingRoutes");

const app = express();

// PORT
const PORT = process.env.PORT || 5500;

app.use(cors());
app.use(bodyParser.json());

// Default Route to test the server is running or not
app.get("/", (req, res) => {
  res.send("Hello from Node js Server");
});

// Using the Routes
// API Routes for the contact application
app.use("/api", ContactRoutes);

// API Routes for the Schedulling Application
app.use("/api", SchedullingRoutes);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`));
