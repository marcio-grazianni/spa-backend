const mongoose = require("mongoose");

// Schema of location of the schedulling application to store data in db for requests
const InsuranceSchema = new mongoose.Schema({
  location: {
    type: Number,
    require: true,
  },
  insurance_options: {
    type: [
      {
        id: Number,
        name: String,
      },
    ],
    require: true,
  },
});

const Insurances = new mongoose.model("Insurances", InsuranceSchema);

module.exports = Insurances;
