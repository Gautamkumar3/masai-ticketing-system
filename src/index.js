const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/db.js");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const TicketRouter = require("./modal/ticket.router");
const UserRouter = require("./modal/user.router");
const BookmarksRouter = require("./modal/bookmarks.router");
require("dotenv").config();
const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/ticket", TicketRouter);
app.use("/", UserRouter);
app.use("/bookmarks", BookmarksRouter);

app.get("/", (req, res) => {
  res.send("Wecome to masai ticket system");
});

app.listen(PORT, async () => {
  await dbConnect();
  console.log(`Server is running on port ${PORT}`);
});
