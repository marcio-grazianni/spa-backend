const mongoose = require("mongoose");

// Schema of Appontment Types of the schedulling application to store data in db for requests
const AppointmentSchema = new mongoose.Schema({
  location: {
    type: Number,
    require: true,
  },
  appointment_types: {
    type: [
      {
        id: Number,
        name: String,
      },
    ],
    require: true,
  },
});

const Appointments = new mongoose.model("Appointments", AppointmentSchema);

module.exports = Appointments;
