import React, { useState } from "react";
import API from "../api";

function TransactionForm({ onSuccess }) {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/transactions/add", {
        amount,
        type,
        category,
        date,
        note,
      });

      alert("Transaction added!");
      onSuccess(); // reload data
    } catch (error) {
      alert("Failed to add transaction");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>

      <input
        type="number"
        placeholder="Amount"
        onChange={(e) => setAmount(e.target.value)}
        required
      /><br /><br />

      <select onChange={(e) => setType(e.target.value)}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select><br /><br />

      <input
        type="text"
        placeholder="Category"
        onChange={(e) => setCategory(e.target.value)}
        required
      /><br /><br />

      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
        required
      /><br /><br />

      <input
        type="text"
        placeholder="Note"
        onChange={(e) => setNote(e.target.value)}
      /><br /><br />

      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default TransactionForm;
