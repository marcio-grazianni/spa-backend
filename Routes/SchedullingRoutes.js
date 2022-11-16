const Router = require("express").Router();
const SchedullingController = require("../Controllers/SchedullingController");

// Route for the Schedulling application

// Get Location Routes
Router.get("/locations", SchedullingController.getLocations);
// Get Appointments Routes
Router.get("/appointment_types", SchedullingController.getAppointments);
// Get Insurance Options Routes
Router.get("/insurance_options", SchedullingController.getInsuranceOptions);
// Get Appointment Slots Routes
Router.get("/appointment_slots", SchedullingController.getAppointmentSlots);
// Post to book an appointment
Router.post("/appointments", SchedullingController.bookAppointment);

Router.get("/add", SchedullingController.add);

module.exports = Router;
