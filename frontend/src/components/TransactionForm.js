import React, { useState } from "react";
import { addTransaction } from "../api";

function TransactionForm({ onAdd }) {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await addTransaction(
      { amount: Number(amount), type, category, date, note },
      token
    );

    if (onAdd) onAdd();  // ✔ FIXED — will not crash now

    setAmount("");
    setCategory("");
    setDate("");
    setNote("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Transaction</h3>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      /><br />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select><br />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      /><br />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      /><br />

      <input
        type="text"
        placeholder="Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      /><br />

      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default TransactionForm;
