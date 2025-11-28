import React, { useState } from "react";
import { addTransaction } from "../api";

export default function TransactionForm({ onAdd }) {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  // Convert dd-mm-yyyy → yyyy-mm-dd
  const convertDate = (d) => {
    if (!d.includes("-")) return d;
    const [dd, mm, yyyy] = d.split("-");
    return `${yyyy}-${mm}-${dd}`; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !category || !date) {
      alert("Please fill all fields.");
      return;
    }

    const token = localStorage.getItem("token");

    const newTx = {
      amount: Number(amount),
      type,
      category,
      date: convertDate(date),
      note,
    };

    try {
      await addTransaction(newTx, token);
      onAdd();   // refresh dashboard

      // reset form
      setAmount("");
      setType("income");
      setCategory("");
      setDate("");
      setNote("");
    } catch (err) {
      console.error(err);
      alert("Failed to add transaction");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">

      <label>Amount</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />

      <label>Type</label>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <label>Category</label>
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Food / Travel / Salary / etc"
      />

      <label>Date (dd-mm-yyyy)</label>
      <input
        type="text"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="dd-mm-yyyy"
      />

      <label>Note (optional)</label>
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Any note"
      />

      <button type="submit" className="add-btn">Add Transaction</button>
    </form>
  );
}
