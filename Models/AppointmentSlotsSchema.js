const mongoose = require("mongoose");

// Schema of Appointment Slots of the schedulling application to store data in db for requests
const AppointmentSchema = new mongoose.Schema({
  location: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
  appointment_type: {
    type: String,
    require: true,
  },
  insurance_option: {
    type: String,
    require: true,
  },
  provider_name: {
    type: String,
    require: true,
  },
  next_available_date: Date,
  slots: [
    {
      time: {
        type: Date,
        require: true,
      },
      status: {
        type: String,
        require: true,
      },
    },
  ],
});

const AppointmentSlots = new mongoose.model(
  "AppointmentSlots",
  AppointmentSchema
);

module.exports = AppointmentSlots;
