const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  note: { type: String },
});

module.exports = mongoose.model("Reminder", ReminderSchema);

