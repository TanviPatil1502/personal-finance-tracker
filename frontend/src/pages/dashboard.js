import React, { useEffect, useState } from "react";
import API from "../api";
import TransactionForm from "../components/TransactionForm";

function Dashboard() {

  const [transactions, setTransactions] = useState([]);

  // Load all transactions when page opens
  useEffect(() => {
    loadTransactions();
  }, []);

  // Fetch transactions from backend
  const loadTransactions = async () => {
    try {
      const res = await API.get("/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.error("Error loading transactions:", err);
      alert(err.response?.data?.msg || "Failed to load transactions");
    }
  };

  return (
    <div style={{ width: "600px", margin: "40px auto" }}>
      <h2>Your Transactions</h2>

      {/* Add Transaction Form */}
      <TransactionForm onSuccess={loadTransactions} />

      <h3>All Transactions</h3>

      {transactions.length === 0 ? (
        <p>No transactions yet. Add one above!</p>
      ) : (
        <ul>
          {transactions.map((tx) => (
            <li key={tx._id} style={{ marginBottom: "10px" }}>
              <strong>{tx.type.toUpperCase()}</strong> — ₹{tx.amount}
              <br />
              Category: {tx.category}
              <br />
              Date: {tx.date?.slice(0, 10)}
              <br />
              Note: {tx.note}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;

