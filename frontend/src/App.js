import React, { useState, useEffect } from "react";
import {
  loginUser,
  registerUser,
  addTransaction,
  getTransactions,
  deleteTransaction,
} from "./api";

import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [transactions, setTransactions] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Fetch all transactions
  const fetchTransactions = async () => {
    if (!token) return;
    const data = await getTransactions(token);
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, [token]);

  // Login handler
  const handleLogin = async () => {
    const data = await loginUser({ email, password });

    if (data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      fetchTransactions();
    } else {
      alert(data.message);
    }
  };

  // Register handler
  const handleRegister = async () => {
    const data = await registerUser({ email, password });
    alert(data.message);
  };

  // Add a new transaction
  const handleAddTransaction = async (transaction) => {
    await addTransaction(transaction, token);
    fetchTransactions();
  };

  // ⭐ DELETE handler
  const handleDelete = async (id) => {
    await deleteTransaction(id, token);
    fetchTransactions(); // refresh list
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Personal Finance Tracker</h1>

      {!token ? (
        <>
          <h2>Login / Register</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />

          <button onClick={handleLogin}>Login</button>

          <button style={{ marginLeft: "10px" }} onClick={handleRegister}>
            Register
          </button>
        </>
      ) : (
        <>
          <h3>You are logged in!</h3>

          {/* Add Transaction Form */}
          <TransactionForm onAdd={handleAddTransaction} />

          {/* Transaction List + Delete button */}
          <TransactionList
            transactions={transactions}
            onDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
}

export default App;
