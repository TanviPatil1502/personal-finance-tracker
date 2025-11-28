// backend/controllers/reminderController.js
const Reminder = require("../models/Reminder");

exports.createReminder = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ msg: "Not authenticated" });

    const userId = req.user; // your auth middleware sets req.user to user id string
    const { title, date, time, note } = req.body;

    const reminder = await Reminder.create({
      userId,
      title,
      date,
      time,
      note,
    });

    res.json(reminder);
  } catch (err) {
    console.error("createReminder:", err);
    res.status(500).json({ msg: err.message });
  }
};

exports.getReminders = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ msg: "Not authenticated" });

    const userId = req.user;
    const reminders = await Reminder.find({ userId }).sort({ date: 1, createdAt: 1 });
    res.json(reminders);
  } catch (err) {
    console.error("getReminders:", err);
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteReminder = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ msg: "Not authenticated" });

    const userId = req.user;
    const { id } = req.params;

    // ensure owner can only delete their own reminder
    const rem = await Reminder.findById(id);
    if (!rem) return res.status(404).json({ msg: "Reminder not found" });
    if (String(rem.userId) !== String(userId)) {
      return res.status(403).json({ msg: "Forbidden" });
    }

    await Reminder.findByIdAndDelete(id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    console.error("deleteReminder:", err);
    res.status(500).json({ msg: err.message });
  }
};
