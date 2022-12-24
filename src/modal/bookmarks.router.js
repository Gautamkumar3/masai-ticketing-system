const express = require("express");
const BookMarks = require("../Schema/bookmarks.schema");

const app = express.Router();

app.post("/", async (req, res) => {
  const id = req.headers.userid;
  try {
    let bookmarksData = new BookMarks({ ...req.body, userId: id });
    await bookmarksData.save();
    res.status(200).send(bookmarksData);
  } catch (er) {
    return res.status(500).send({ msg: er.message });
  }
});

app.get("/", async (req, res) => {
  try {
    let allBookmarks = await BookMarks.find();
    res.status(200).send(allBookmarks);
  } catch (er) {
    return res.status(404).send({ msg: er.message });
  }
});

module.exports = app;
