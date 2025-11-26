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

import PieCategoryChart from "./components/charts/PieCategoryChart";
import BarMonthlyChart from "./components/charts/BarMonthlyChart";
import BalanceLineChart from "./components/charts/BalanceLineChart";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [transactions, setTransactions] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Fetch transactions
  const fetchTransactions = useCallback(async () => {
    if (!token) return;
    const data = await getTransactions(token);
    setTransactions(data);
  }, [token]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

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

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setTransactions([]);
  };

  // Add transaction
  const handleAddTransaction = async (transaction) => {
    await addTransaction(transaction, token);
    fetchTransactions();
  };

  // Delete transaction
  const handleDelete = async (id) => {
    await deleteTransaction(id, token);
    fetchTransactions();
  };

  // Summary values
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  return (
    <div>

      {/* NAVBAR */}
      <div style={{
        width: "100%",
        background: "#222",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <h2 style={{ color: "white", margin: 0 }}>Personal Finance Tracker</h2>
        
        {token && (
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 15px",
              background: "#ff4d4d",
              border: "none",
              color: "white",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        )}
      </div>

      <div style={{ padding: "20px" }}>
        {!token ? (
          <>
            <h2>Login / Register</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /><br/><br/>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /><br/><br/>

            <button onClick={handleLogin}>Login</button>
            <button style={{ marginLeft: "10px" }} onClick={handleRegister}>
              Register
            </button>
          </>
        ) : (
          <>
            {/* Summary Cards */}
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

            {/* Charts */}
            <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", marginBottom: "40px" }}>
              <PieCategoryChart transactions={transactions} />
              <BarMonthlyChart transactions={transactions} />
              <BalanceLineChart transactions={transactions} />
            </div>

            {/* Add Transaction */}
            <TransactionForm onAdd={handleAddTransaction} />

            {/* List */}
            <TransactionList
              transactions={transactions}
              onDelete={handleDelete}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
