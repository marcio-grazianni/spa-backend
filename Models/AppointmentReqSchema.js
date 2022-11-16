const mongoose = require("mongoose");

// Schema of Appointment Slots of the schedulling application to store data in db for requests
const AppointmentReqSchema = new mongoose.Schema({
  location: {
    type: Number,
    require: true,
  },
  patient_name: {
    type: String,
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
  slot_time: {
    type: Date,
    require: true,
  },
});

const AppointmentReqs = new mongoose.model(
  "AppointmentReqs",
  AppointmentReqSchema
);

module.exports = AppointmentReqs;
