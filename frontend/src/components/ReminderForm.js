import React, { useState } from "react";
import "./ReminderForm.css";

export default function ReminderForm({ onAddReminder }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date || !time) {
      alert("Please fill Title, Date & Time");
      return;
    }

    const newReminder = { title, date, time, note };
    onAddReminder(newReminder);

    setTitle("");
    setDate("");
    setTime("");
    setNote("");
  };

  return (
    <div className="reminder-card">
      <h3 className="form-title">Set Reminder</h3>

      <form onSubmit={handleSubmit} className="reminder-form">

        <label>Title</label>
        <input
          type="text"
          placeholder="Reminder title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label>Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <label>Note (optional)</label>
        <input
          type="text"
          placeholder="Short note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button className="reminder-btn" type="submit">
          Add Reminder
        </button>
      </form>
    </div>
  );
}
