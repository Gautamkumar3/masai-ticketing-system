const express = require("express");
const Tickets = require("../Schema/ticket.schema");

const app = express.Router();

app.post("/", async (req, res) => {
  const { category, title, message } = req.body;
  const id = req.headers.userid;
  if ((!category, !title, !message)) {
    return res.statusCode(500).send("All fields are required");
  }
  try {
    let ticket = new Tickets({ ...req.body, userId: id });
    await ticket.save();
    res.status(200).send(ticket);
  } catch (er) {
    return res.status(500).send({ msg: er.message });
  }
});

app.get("/", async (req, res) => {
  try {
    let allTickets = await Tickets.find();
    res.status(200).send(allTickets);
  } catch (er) {
    return res.status(404).send({ msg: er.message });
  }
});

module.exports = app;
