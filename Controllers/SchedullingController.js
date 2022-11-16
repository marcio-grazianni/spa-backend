const Locations = require("../Models/LocationSchema");
const Appointments = require("../Models/AppointmentsSchema");
const Insurance = require("../Models/InsuranceSchema");
const AppointmentSlots = require("../Models/AppointmentSlotsSchema");
const AppointmentReqs = require("../Models/AppointmentReqSchema");

class SchedullingController {
  // Controller to get locations
  async getLocations(req, res) {
    try {
      const response = await Locations.find();
      if (response) {
        res.status(200).send({
          count: response.length,
          result: response,
        });
      } else {
        res.status(200).send({
          count: 0,
          result: [],
        });
      }
    } catch (err) {
      res.status(400).send({
        msg: "Some thing Wrong",
      });
    }
  }

  // Controller to get appointment types
  async getAppointments(req, res) {
    try {
      const { location } = req.query;
      let response;
      if (location !== undefined) {
        // Do query to the database to get appointments against the location
        response = await Appointments.find({ location });
        if (response.length === 0) {
          res.status(200).send({
            count: 0,
            result: response,
          });
          return;
        }
      } else {
        response = await Appointments.find();
        res.status(200).send({
          count: 0,
          result: response,
        });
        return;
      }

      // Destructure the appointment object from the array of response
      const [appointmentObj] = response;

      // Destructuring the appointment from the object
      const { appointment_types } = appointmentObj;

      // Sending response to the client if appointment types exists
      if (appointment_types) {
        res.status(200).send({
          count: appointment_types.length,
          result: appointment_types,
        });
      } else {
        res.status(200).send({
          count: 0,
          result: [],
        });
      }
    } catch (err) {
      res.status(400).send({
        msg: "Some thing Wrong",
      });
    }
  }

  // Controller to get Insurance Options
  async getInsuranceOptions(req, res) {
    try {
      const { location } = req.query;
      // Do query to the database to get insurance against the location

      let response;
      if (location !== undefined) {
        response = await Insurance.find({ location });
        if (response.length === 0) {
          res.status(200).send({
            count: 0,
            result: response,
          });
          return;
        }
      } else {
        response = await Insurance.find();
        res.status(200).send({
          count: 0,
          result: response,
        });
        return;
      }
      // Destructure the insurance object from the array of response
      const [insuranceObj] = response;
      // Destructuring the insurance from the object
      const { insurance_options } = insuranceObj;
      // Sending response to the client if insurance options exists
      if (insurance_options) {
        res.status(200).send({
          count: insurance_options.length,
          result: insurance_options,
        });
      }
    } catch (err) {
      res.status(400).send({
        msg: "Some thing Wrong",
      });
    }
  }

  // Controller to get Appointments Slots
  async getAppointmentSlots(req, res) {
    try {
      const { location, appointment_type, insurance_option } = req.query;

      let response = "";
      if (location && appointment_type && insurance_option) {
        response = await AppointmentSlots.find({
          location,
          appointment_type,
          insurance_option,
        });
      } else {
        response = await AppointmentSlots.find();
      }

      if (response) {
        res.status(200).send({
          result: response,
        });
      }
    } catch (err) {
      res.status(400).send({
        msg: "Some thing Wrong",
      });
    }
  }

  // Controller to book appointment slots
  async bookAppointment(req, res) {
    // Destructuring from the req body
    const {
      location,
      appointment_type,
      insurance_option,
      provider_name,
      slot_time,
      patient_name,
    } = req.body;

    try {
      const newAppointmentReq = new AppointmentReqs({
        location,
        appointment_type,
        insurance_option,
        provider_name,
        slot_time,
        patient_name,
      });
      // Save to the database
      const response = await newAppointmentReq.save();

      // On success fully saving send response to the client
      if (response) {
        res.status(200).send({ result: response });
      }
    } catch (err) {
      res.status(400).send({ msg: "Some thing Wrong" });
    }
  }

  async add(req, res) {
    const d5 = new AppointmentSlots({
      location: 1,
      date: new Date().toDateString(),
      appointment_type: "Appointment 1 New York",
      insurance_option: "Insurance Otion 1 New York",
      provider_name: "Dr. Jhons Smith",
      next_available_date: new Date(),
      slots: [
        {
          time: new Date("2022-10-01T07:00:00.000-09:00"),
          status: "available",
        },
        {
          time: new Date("2022-10-01T07:00:00.000-09:15"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-01T07:00:00.000-09:20"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-01T07:00:00.000-09:25"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-01T07:00:00.000-09:30"),
          status: "available",
        },
        {
          time: new Date("2022-10-01T07:00:00.000-09:45"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-01T07:00:00.000-10:00"),
          status: "available",
        },
        {
          time: new Date("2022-10-02T07:00:00.000-10:15"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-02T07:00:00.000-10:30"),
          status: "available",
        },
        {
          time: new Date("2022-10-02T07:00:00.000-10:45"),
          status: "available",
        },
        {
          time: new Date("2022-10-02T07:00:00.000-11:00"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-03T07:00:00.000-09:00"),
          status: "available",
        },
        {
          time: new Date("2022-10-03T07:00:00.000-09:15"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-03T07:00:00.000-09:30"),
          status: "available",
        },
        {
          time: new Date("2022-10-03T07:00:00.000-09:45"),
          status: "available",
        },
        {
          time: new Date("2022-10-03T07:00:00.000-10:00"),
          status: "available",
        },
        {
          time: new Date("2022-10-03T07:00:00.000-10:15"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-03T07:00:00.000-10:30"),
          status: "available",
        },
        {
          time: new Date("2022-10-03T07:00:00.000-10:45"),
          status: "available",
        },
        {
          time: new Date("2022-10-24T07:00:00.000-11:00"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-04T07:00:00.000-09:00"),
          status: "available",
        },
        {
          time: new Date("2022-10-04T07:00:00.000-09:15"),
          status: "available",
        },
        {
          time: new Date("2022-10-04T07:00:00.000-09:30"),
          status: "available",
        },
        {
          time: new Date("2022-10-05T07:00:00.000-09:45"),
          status: "available",
        },
        {
          time: new Date("2022-10-05T07:00:00.000-10:00"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-05T07:00:00.000-10:15"),
          status: "available",
        },
        {
          time: new Date("2022-10-05T07:00:00.000-10:30"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-06T07:00:00.000-10:45"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-06T07:00:00.000-11:00"),
          status: "unavailable",
        },

        {
          time: new Date("2022-10-07T07:00:00.000-09:00"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-07T07:00:00.000-09:15"),
          status: "available",
        },
        {
          time: new Date("2022-10-07T07:00:00.000-09:30"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-07T07:00:00.000-09:45"),
          status: "available",
        },
        {
          time: new Date("2022-10-07T07:00:00.000-10:00"),
          status: "available",
        },
        {
          time: new Date("2022-10-08T07:00:00.000-10:15"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-08T07:00:00.000-10:30"),
          status: "available",
        },
        {
          time: new Date("2022-10-08T07:00:00.000-10:45"),
          status: "available",
        },
        {
          time: new Date("2022-10-08T07:00:00.000-11:00"),
          status: "available",
        },

        {
          time: new Date("2022-10-09T07:00:00.000-11:00"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-09T07:00:00.000-11:00"),
          status: "available",
        },
        {
          time: new Date("2022-10-10T07:00:00.000-09:00"),
          status: "available",
        },
        {
          time: new Date("2022-10-10T07:00:00.000-09:15"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-10T07:00:00.000-09:30"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-10T07:00:00.000-09:45"),
          status: "available",
        },
        {
          time: new Date("2022-10-10T07:00:00.000-10:00"),
          status: "available",
        },
        {
          time: new Date("2022-10-11T07:00:00.000-10:15"),
          status: "available",
        },
        {
          time: new Date("2022-10-11T07:00:00.000-10:30"),
          status: "available",
        },
        {
          time: new Date("2022-10-11T07:00:00.000-10:45"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-11T07:00:00.000-11:00"),
          status: "available",
        },

        {
          time: new Date("2022-10-12T07:00:00.000-09:00"),
          status: "available",
        },
        {
          time: new Date("2022-10-12T07:00:00.000-09:15"),
          status: "available",
        },
        {
          time: new Date("2022-10-12T07:00:00.000-09:30"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-12T07:00:00.000-09:45"),
          status: "available",
        },
        {
          time: new Date("2022-10-12T07:00:00.000-10:00"),
          status: "available",
        },
        {
          time: new Date("2022-10-13T07:00:00.000-10:15"),
          status: "available",
        },
        {
          time: new Date("2022-10-13T07:00:00.000-10:30"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-13T07:00:00.000-10:45"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-13T07:00:00.000-11:00"),
          status: "available",
        },
        {
          time: new Date("2022-10-14T07:00:00.000-09:00"),
          status: "available",
        },
        {
          time: new Date("2022-10-14T07:00:00.000-09:15"),
          status: "available",
        },
        {
          time: new Date("2022-10-14T07:00:00.000-09:30"),
          status: "available",
        },
        {
          time: new Date("2022-10-14T07:00:00.000-09:45"),
          status: "available",
        },
        {
          time: new Date("2022-10-14T07:00:00.000-10:00"),
          status: "available",
        },
        {
          time: new Date("2022-10-14T07:00:00.000-10:15"),
          status: "available",
        },
        {
          time: new Date("2022-10-14T07:00:00.000-10:30"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-14T07:00:00.000-10:45"),
          status: "available",
        },
        {
          time: new Date("2022-10-15T07:00:00.000-11:00"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-15T07:00:00.000-09:00"),
          status: "available",
        },
        {
          time: new Date("2022-10-15T07:00:00.000-09:15"),
          status: "available",
        },
        {
          time: new Date("2022-10-15T07:00:00.000-09:30"),
          status: "available",
        },
        {
          time: new Date("2022-10-16T07:00:00.000-09:45"),
          status: "available",
        },
        {
          time: new Date("2022-10-16T07:00:00.000-10:00"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-16T07:00:00.000-10:15"),
          status: "available",
        },
        {
          time: new Date("2022-10-16T07:00:00.000-10:30"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-17T07:00:00.000-10:45"),
          status: "available",
        },
        {
          time: new Date("2022-10-17T07:00:00.000-11:00"),
          status: "available",
        },

        {
          time: new Date("2022-10-18T07:00:00.000-09:00"),
          status: "available",
        },
        {
          time: new Date("2022-10-18T07:00:00.000-09:15"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-18T07:00:00.000-09:30"),
          status: "available",
        },
        {
          time: new Date("2022-10-18T07:00:00.000-09:45"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-18T07:00:00.000-10:00"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-19T07:00:00.000-10:15"),
          status: "available",
        },
        {
          time: new Date("2022-10-19T07:00:00.000-10:30"),
          status: "available",
        },
        {
          time: new Date("2022-10-19T07:00:00.000-10:45"),
          status: "available",
        },
        {
          time: new Date("2022-10-19T07:00:00.000-11:00"),
          status: "unavailable",
        },

        {
          time: new Date("2022-10-20T07:00:00.000-09:00"),
          status: "available",
        },
        {
          time: new Date("2022-10-20T07:00:00.000-09:15"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-20T07:00:00.000-09:30"),
          status: "available",
        },
        {
          time: new Date("2022-10-20T07:00:00.000-09:45"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-20T07:00:00.000-10:00"),
          status: "available",
        },
        {
          time: new Date("2022-10-21T07:00:00.000-10:15"),
          status: "available",
        },
        {
          time: new Date("2022-10-21T07:00:00.000-10:30"),
          status: "available",
        },
        {
          time: new Date("2022-10-21T07:00:00.000-10:45"),
          status: "available",
        },
        {
          time: new Date("2022-10-21T07:00:00.000-11:00"),
          status: "unavailable",
        },

        {
          time: new Date("2022-10-12T07:00:00.000-09:00"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-12T07:00:00.000-09:15"),
          status: "available",
        },
        {
          time: new Date("2022-10-12T07:00:00.000-09:30"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-12T07:00:00.000-09:45"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-12T07:00:00.000-10:00"),
          status: "available",
        },
        {
          time: new Date("2022-10-23T07:00:00.000-10:15"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-23T07:00:00.000-10:30"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-23T07:00:00.000-10:45"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-23T07:00:00.000-11:00"),
          status: "available",
        },
        {
          time: new Date("2022-10-24T07:00:00.000-09:00"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-24T07:00:00.000-09:15"),
          status: "available",
        },
        {
          time: new Date("2022-10-24T07:00:00.000-09:30"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-24T07:00:00.000-09:45"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-24T07:00:00.000-10:00"),
          status: "available",
        },
        {
          time: new Date("2022-10-24T07:00:00.000-10:15"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-24T07:00:00.000-10:30"),
          status: "available",
        },
        {
          time: new Date("2022-10-24T07:00:00.000-10:45"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-25T07:00:00.000-11:00"),
          status: "available",
        },
        {
          time: new Date("2022-10-25T07:00:00.000-09:00"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-25T07:00:00.000-09:15"),
          status: "available",
        },
        {
          time: new Date("2022-10-25T07:00:00.000-09:30"),
          status: "available",
        },
        {
          time: new Date("2022-10-26T07:00:00.000-09:45"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-26T07:00:00.000-10:00"),
          status: "available",
        },
        {
          time: new Date("2022-10-26T07:00:00.000-10:15"),
          status: "available",
        },
        {
          time: new Date("2022-10-26T07:00:00.000-10:30"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-27T07:00:00.000-10:45"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-27T07:00:00.000-11:00"),
          status: "available",
        },

        {
          time: new Date("2022-10-28T07:00:00.000-09:00"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-28T07:00:00.000-09:15"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-28T07:00:00.000-09:30"),
          status: "available",
        },
        {
          time: new Date("2022-10-28T07:00:00.000-09:45"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-28T07:00:00.000-10:00"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-29T07:00:00.000-10:15"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-29T07:00:00.000-10:30"),
          status: "available",
        },
        {
          time: new Date("2022-10-29T07:00:00.000-10:45"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-29T07:00:00.000-11:00"),
          status: "available",
        },

        {
          time: new Date("2022-10-30T07:00:00.000-09:00"),
          status: "available",
        },
        {
          time: new Date("2022-10-30T07:00:00.000-09:15"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-30T07:00:00.000-09:30"),
          status: "available",
        },
        {
          time: new Date("2022-10-30T07:00:00.000-09:45"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-30T07:00:00.000-10:00"),
          status: "available",
        },

        {
          time: new Date("2022-09-01T07:00:00.000-09:00"),
          status: "available",
        },
        {
          time: new Date("2022-09-01T07:00:00.000-09:15"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-01T07:00:00.000-09:30"),
          status: "available",
        },
        {
          time: new Date("2022-09-01T07:00:00.000-09:45"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-01T07:00:00.000-10:00"),
          status: "available",
        },
        {
          time: new Date("2022-09-02T07:00:00.000-10:15"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-02T07:00:00.000-10:30"),
          status: "available",
        },
        {
          time: new Date("2022-09-02T07:00:00.000-10:45"),
          status: "available",
        },
        {
          time: new Date("2022-09-02T07:00:00.000-11:00"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-03T07:00:00.000-09:00"),
          status: "available",
        },
        {
          time: new Date("2022-09-03T07:00:00.000-09:15"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-03T07:00:00.000-09:30"),
          status: "available",
        },
        {
          time: new Date("2022-09-03T07:00:00.000-09:45"),
          status: "available",
        },
        {
          time: new Date("2022-09-03T07:00:00.000-10:00"),
          status: "available",
        },
        {
          time: new Date("2022-09-03T07:00:00.000-10:15"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-03T07:00:00.000-10:30"),
          status: "available",
        },
        {
          time: new Date("2022-09-03T07:00:00.000-10:45"),
          status: "available",
        },
        {
          time: new Date("2022-09-24T07:00:00.000-11:00"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-04T07:00:00.000-09:00"),
          status: "available",
        },
        {
          time: new Date("2022-09-04T07:00:00.000-09:15"),
          status: "available",
        },
        {
          time: new Date("2022-09-04T07:00:00.000-09:30"),
          status: "available",
        },
        {
          time: new Date("2022-09-05T07:00:00.000-09:45"),
          status: "available",
        },
        {
          time: new Date("2022-09-05T07:00:00.000-10:00"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-05T07:00:00.000-10:15"),
          status: "available",
        },
        {
          time: new Date("2022-09-05T07:00:00.000-10:30"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-06T07:00:00.000-10:45"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-06T07:00:00.000-11:00"),
          status: "unavailable",
        },

        {
          time: new Date("2022-09-07T07:00:00.000-09:00"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-07T07:00:00.000-09:15"),
          status: "available",
        },
        {
          time: new Date("2022-09-07T07:00:00.000-09:30"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-07T07:00:00.000-09:45"),
          status: "available",
        },
        {
          time: new Date("2022-09-07T07:00:00.000-10:00"),
          status: "available",
        },
        {
          time: new Date("2022-09-08T07:00:00.000-10:15"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-08T07:00:00.000-10:30"),
          status: "available",
        },
        {
          time: new Date("2022-09-08T07:00:00.000-10:45"),
          status: "available",
        },
        {
          time: new Date("2022-09-08T07:00:00.000-11:00"),
          status: "available",
        },

        {
          time: new Date("2022-09-09T07:00:00.000-11:00"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-09T07:00:00.000-11:00"),
          status: "available",
        },
        {
          time: new Date("2022-09-10T07:00:00.000-09:00"),
          status: "available",
        },
        {
          time: new Date("2022-09-10T07:00:00.000-09:15"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-10T07:00:00.000-09:30"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-10T07:00:00.000-09:45"),
          status: "available",
        },
        {
          time: new Date("2022-09-10T07:00:00.000-10:00"),
          status: "available",
        },
        {
          time: new Date("2022-09-11T07:00:00.000-10:15"),
          status: "available",
        },
        {
          time: new Date("2022-09-11T07:00:00.000-10:30"),
          status: "available",
        },
        {
          time: new Date("2022-09-11T07:00:00.000-10:45"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-11T07:00:00.000-11:00"),
          status: "available",
        },

        {
          time: new Date("2022-09-12T07:00:00.000-09:00"),
          status: "available",
        },
        {
          time: new Date("2022-09-12T07:00:00.000-09:15"),
          status: "available",
        },
        {
          time: new Date("2022-09-12T07:00:00.000-09:30"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-12T07:00:00.000-09:45"),
          status: "available",
        },
        {
          time: new Date("2022-09-12T07:00:00.000-10:00"),
          status: "available",
        },
        {
          time: new Date("2022-09-13T07:00:00.000-10:15"),
          status: "available",
        },
        {
          time: new Date("2022-09-13T07:00:00.000-10:30"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-13T07:00:00.000-10:45"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-13T07:00:00.000-11:00"),
          status: "available",
        },
        {
          time: new Date("2022-09-14T07:00:00.000-09:00"),
          status: "available",
        },
        {
          time: new Date("2022-09-14T07:00:00.000-09:15"),
          status: "available",
        },
        {
          time: new Date("2022-09-14T07:00:00.000-09:30"),
          status: "available",
        },
        {
          time: new Date("2022-09-14T07:00:00.000-09:45"),
          status: "available",
        },
        {
          time: new Date("2022-09-14T07:00:00.000-10:00"),
          status: "available",
        },
        {
          time: new Date("2022-09-14T07:00:00.000-10:15"),
          status: "available",
        },
        {
          time: new Date("2022-09-14T07:00:00.000-10:30"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-14T07:00:00.000-10:45"),
          status: "available",
        },
        {
          time: new Date("2022-09-15T07:00:00.000-11:00"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-15T07:00:00.000-09:00"),
          status: "available",
        },
        {
          time: new Date("2022-09-15T07:00:00.000-09:15"),
          status: "available",
        },
        {
          time: new Date("2022-09-15T07:00:00.000-09:30"),
          status: "available",
        },
        {
          time: new Date("2022-09-16T07:00:00.000-09:45"),
          status: "available",
        },
        {
          time: new Date("2022-09-16T07:00:00.000-10:00"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-16T07:00:00.000-10:15"),
          status: "available",
        },
        {
          time: new Date("2022-09-16T07:00:00.000-10:30"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-17T07:00:00.000-10:45"),
          status: "available",
        },
        {
          time: new Date("2022-09-17T07:00:00.000-11:00"),
          status: "available",
        },

        {
          time: new Date("2022-09-18T07:00:00.000-09:00"),
          status: "available",
        },
        {
          time: new Date("2022-09-18T07:00:00.000-09:15"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-18T07:00:00.000-09:30"),
          status: "available",
        },
        {
          time: new Date("2022-09-18T07:00:00.000-09:45"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-18T07:00:00.000-10:00"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-19T07:00:00.000-10:15"),
          status: "available",
        },
        {
          time: new Date("2022-09-19T07:00:00.000-10:30"),
          status: "available",
        },
        {
          time: new Date("2022-09-19T07:00:00.000-10:45"),
          status: "available",
        },
        {
          time: new Date("2022-09-19T07:00:00.000-11:00"),
          status: "unavailable",
        },

        {
          time: new Date("2022-09-20T07:00:00.000-09:00"),
          status: "available",
        },
        {
          time: new Date("2022-09-20T07:00:00.000-09:15"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-20T07:00:00.000-09:30"),
          status: "available",
        },
        {
          time: new Date("2022-09-20T07:00:00.000-09:45"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-20T07:00:00.000-10:00"),
          status: "available",
        },
        {
          time: new Date("2022-09-21T07:00:00.000-10:15"),
          status: "available",
        },
        {
          time: new Date("2022-09-21T07:00:00.000-10:30"),
          status: "available",
        },
        {
          time: new Date("2022-09-21T07:00:00.000-10:45"),
          status: "available",
        },
        {
          time: new Date("2022-09-21T07:00:00.000-11:00"),
          status: "unavailable",
        },

        {
          time: new Date("2022-09-12T07:00:00.000-09:00"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-12T07:00:00.000-09:15"),
          status: "available",
        },
        {
          time: new Date("2022-09-12T07:00:00.000-09:30"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-12T07:00:00.000-09:45"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-12T07:00:00.000-10:00"),
          status: "available",
        },
        {
          time: new Date("2022-09-23T07:00:00.000-10:15"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-23T07:00:00.000-10:30"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-23T07:00:00.000-10:45"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-23T07:00:00.000-11:00"),
          status: "available",
        },
        {
          time: new Date("2022-09-24T07:00:00.000-09:00"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-24T07:00:00.000-09:15"),
          status: "available",
        },
        {
          time: new Date("2022-09-24T07:00:00.000-09:30"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-24T07:00:00.000-09:45"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-24T07:00:00.000-10:00"),
          status: "available",
        },
        {
          time: new Date("2022-09-24T07:00:00.000-10:15"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-24T07:00:00.000-10:30"),
          status: "available",
        },
        {
          time: new Date("2022-09-24T07:00:00.000-10:45"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-25T07:00:00.000-11:00"),
          status: "available",
        },
        {
          time: new Date("2022-09-25T07:00:00.000-09:00"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-25T07:00:00.000-09:15"),
          status: "available",
        },
        {
          time: new Date("2022-09-25T07:00:00.000-09:30"),
          status: "available",
        },
        {
          time: new Date("2022-09-26T07:00:00.000-09:45"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-26T07:00:00.000-10:00"),
          status: "available",
        },
        {
          time: new Date("2022-09-26T07:00:00.000-10:15"),
          status: "available",
        },
        {
          time: new Date("2022-09-26T07:00:00.000-10:30"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-27T07:00:00.000-10:45"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-27T07:00:00.000-11:00"),
          status: "available",
        },

        {
          time: new Date("2022-09-28T07:00:00.000-09:00"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-28T07:00:00.000-09:15"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-28T07:00:00.000-09:30"),
          status: "available",
        },
        {
          time: new Date("2022-09-28T07:00:00.000-09:45"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-28T07:00:00.000-10:00"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-29T07:00:00.000-10:15"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-29T07:00:00.000-10:30"),
          status: "available",
        },
        {
          time: new Date("2022-09-29T07:00:00.000-10:45"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-29T07:00:00.000-11:00"),
          status: "available",
        },

        {
          time: new Date("2022-09-30T07:00:00.000-09:00"),
          status: "available",
        },
        {
          time: new Date("2022-09-30T07:00:00.000-09:15"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-30T07:00:00.000-09:30"),
          status: "available",
        },
        {
          time: new Date("2022-09-30T07:00:00.000-09:45"),
          status: "unavailable",
        },
        {
          time: new Date("2022-09-30T07:00:00.000-10:00"),
          status: "available",
        },

        {
          time: new Date("2022-10-31T07:00:00.000-09:00"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-31T07:00:00.000-09:15"),
          status: "unavailable",
        },
        {
          time: new Date("2022-10-31T07:00:00.000-09:30"),
          status: "available",
        },

        {
          time: new Date("2022-11-01T07:00:00.000-10:15"),
          status: "available",
        },
        {
          time: new Date("2022-11-01T07:00:00.000-10:30"),
          status: "available",
        },
        {
          time: new Date("2022-11-01T07:00:00.000-10:45"),
          status: "unavailable",
        },
        {
          time: new Date("2022-11-01T07:00:00.000-11:00"),
          status: "available",
        },

        {
          time: new Date("2022-11-02T07:00:00.000-09:00"),
          status: "available",
        },
        {
          time: new Date("2022-11-02T07:00:00.000-09:15"),
          status: "available",
        },
        {
          time: new Date("2022-11-02T07:00:00.000-09:30"),
          status: "unavailable",
        },
        {
          time: new Date("2022-11-02T07:00:00.000-09:45"),
          status: "available",
        },
        {
          time: new Date("2022-11-02T07:00:00.000-10:00"),
          status: "available",
        },
        {
          time: new Date("2022-11-03T07:00:00.000-10:15"),
          status: "available",
        },
        {
          time: new Date("2022-11-03T07:00:00.000-10:30"),
          status: "unavailable",
        },
        {
          time: new Date("2022-11-03T07:00:00.000-10:45"),
          status: "unavailable",
        },
        {
          time: new Date("2022-11-03T07:00:00.000-11:00"),
          status: "available",
        },
        {
          time: new Date("2022-11-04T07:00:00.000-09:00"),
          status: "available",
        },
        {
          time: new Date("2022-11-04T07:00:00.000-09:15"),
          status: "available",
        },
        {
          time: new Date("2022-11-04T07:00:00.000-09:30"),
          status: "available",
        },
        {
          time: new Date("2022-11-05T07:00:00.000-09:45"),
          status: "available",
        },
        {
          time: new Date("2022-11-05T07:00:00.000-10:00"),
          status: "available",
        },
        {
          time: new Date("2022-11-05T07:00:00.000-10:15"),
          status: "available",
        },
        {
          time: new Date("2022-11-05T07:00:00.000-10:30"),
          status: "unavailable",
        },
        {
          time: new Date("2022-11-05T07:00:00.000-10:45"),
          status: "available",
        },
        {
          time: new Date("2022-11-01T07:00:00.000-11:00"),
          status: "unavailable",
        },
        {
          time: new Date("2022-11-02T07:00:00.000-11:00"),
          status: "unavailable",
        },

        {
          time: new Date("2022-11-03T07:00:00.000-11:00"),
          status: "unavailable",
        },
        {
          time: new Date("2022-11-04T07:00:00.000-11:00"),
          status: "unavailable",
        },
        {
          time: new Date("2022-11-05T07:00:00.000-11:00"),
          status: "unavailable",
        },
      ],
    });

    await d5.save();
  }
}

module.exports = new SchedullingController();
