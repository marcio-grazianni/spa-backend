const mongoose = require("mongoose");

// Schema of location of the schedulling application to store data in db for requests
const LocationSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  id: {
    type: Number,
    require: true,
  },
});

const Locations = new mongoose.model("Locations", LocationSchema);

module.exports = Locations;
