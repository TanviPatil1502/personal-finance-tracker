const express = require("express");
const router = express.Router();
const Reminder = require("../models/Reminder");
const auth = require("../middleware/auth");

// Add Reminder
router.post("/", auth, async (req, res) => {
  try {
    const reminder = new Reminder({
      user: req.user.id,
      ...req.body
    });

    await reminder.save();
    res.json(reminder);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Get All Reminders
router.get("/", auth, async (req, res) => {
  try {
    const reminders = await Reminder.find({ user: req.user.id });
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// Delete Reminder
router.delete("/:id", auth, async (req, res) => {
  try {
    await Reminder.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
