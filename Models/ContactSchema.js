const mongoose = require("mongoose");

// Schema for the messaging(Contact) application to store data in db for requests
const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  type: {
    type: String,
  },
});

const Contacts = new mongoose.model("Contacts", ContactSchema);

module.exports = Contacts;
