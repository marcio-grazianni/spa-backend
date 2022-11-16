const Contacts = require("../Models/ContactSchema");

class ContactController {
  // Controller for the inbound route
  async contact(req, res) {
    const { name, email, phone, type } = req.body;
    const newContact = new Contacts({
      name,
      email,
      phone,
      type,
    });
    try {
      // Saves the data in the database and return the response
      const contact = await newContact.save();
      if (contact) {
        res.status(200).send(contact);
      }
    } catch (err) {
      // Return error response on Some thing Wrong
      res.status(400).send({
        msg: "Some thing Wrong",
      });
    }
  }
}

module.exports = new ContactController();
