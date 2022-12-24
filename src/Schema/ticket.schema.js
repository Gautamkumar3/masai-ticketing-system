const mongoose = require("mongoose");

let TicketSchema = mongoose.Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Tickets = mongoose.model("ticket", TicketSchema);

module.exports = Tickets;
