const Router = require("express").Router();
const ContactController = require("../Controllers/ContactController");

// Route for the message application
Router.post("/inbound", ContactController.contact);

module.exports = Router;
