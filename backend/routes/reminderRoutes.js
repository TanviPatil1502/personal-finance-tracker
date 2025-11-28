// backend/routes/reminderRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createReminder,
  getReminders,
  deleteReminder,
} = require("../controllers/reminderController");

router.post("/", auth, createReminder);
router.get("/", auth, getReminders);
router.delete("/:id", auth, deleteReminder);

module.exports = router;
