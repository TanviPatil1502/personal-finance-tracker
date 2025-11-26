import React, { useState, useEffect, useCallback } from "react";
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

  // ⭐ FETCH TRANSACTIONS (wrapped in useCallback to remove warnings)
  const fetchTransactions = useCallback(async () => {
    if (!token) return;
    const data = await getTransactions(token);
    setTransactions(data);
  }, [token]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // LOGIN HANDLER
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

  // REGISTER HANDLER
  const handleRegister = async () => {
    const data = await registerUser({ email, password });
    alert(data.message);
  };

  // ADD TRANSACTION
  const handleAddTransaction = async (transaction) => {
    await addTransaction(transaction, token);
    fetchTransactions();
  };

  // DELETE TRANSACTION
  const handleDelete = async (id) => {
    await deleteTransaction(id, token);
    fetchTransactions();
  };

  // ⭐ SUMMARY CALCULATIONS
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

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
          <br /><br />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br /><br />

          <button onClick={handleLogin}>Login</button>

          <button
            style={{ marginLeft: "10px" }}
            onClick={handleRegister}
          >
            Register
          </button>
        </>
      ) : (
        <>
          <h3>You are logged in!</h3>

          {/* ⭐ SUMMARY CARDS */}
          <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
            <div style={{ padding: "15px", background: "#e9ffe9", borderRadius: "8px", minWidth: "150px" }}>
              <h4>Income</h4>
              <h2 style={{ color: "green" }}>₹{income}</h2>
            </div>

            <div style={{ padding: "15px", background: "#ffe9e9", borderRadius: "8px", minWidth: "150px" }}>
              <h4>Expense</h4>
              <h2 style={{ color: "red" }}>₹{expense}</h2>
            </div>

            <div style={{ padding: "15px", background: "#e9f3ff", borderRadius: "8px", minWidth: "150px" }}>
              <h4>Balance</h4>
              <h2 style={{ color: "blue" }}>₹{balance}</h2>
            </div>
          </div>

          {/* ADD FORM */}
          <TransactionForm onAdd={handleAddTransaction} />

          {/* TRANSACTION LIST */}
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
