import React, { useEffect, useState } from "react";
import { getTransactions, deleteTransaction } from "../api";
import TransactionForm from "../components/TransactionForm";
import Sidebar from "../components/Sidebar";

import PieCategoryChart from "../components/charts/PieCategoryChart";
import BarMonthlyChart from "../components/charts/BarMonthlyChart";
import BalanceLineChart from "../components/charts/BalanceLineChart";

import "./Dashboard.css";
import { FaBars } from "react-icons/fa";

export default function Dashboard({ onLogout, onNavigate }) {
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 900);

  // Load data + listen to window resize
  useEffect(() => {
    loadTransactions();

    const handleResize = () => {
      if (window.innerWidth > 900) setSidebarOpen(true);
      else setSidebarOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch transactions
  const loadTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await getTransactions(token);

      setTransactions(data);

      let inc = 0, exp = 0;
      data.forEach((tx) => {
        if (tx.type === "income") inc += tx.amount;
        else exp += tx.amount;
      });

      setIncome(inc);
      setExpense(exp);
      setBalance(inc - exp);
    } catch (err) {
      alert("Failed to load transactions");
      console.error(err);
    }
  };

  // Delete a transaction
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await deleteTransaction(id, token);
      loadTransactions();
    } catch (err) {
      alert("Delete failed");
      console.error(err);
    }
  };

  return (
    <div className="dashboard-root">

      {/* SIDEBAR */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={onLogout}
        onNavigate={onNavigate}   // ⭐ IMPORTANT FIX
      />

      {/* MAIN CONTENT */}
      <div className={`dashboard-main ${sidebarOpen ? "with-sidebar" : ""}`}>

        <div className="dashboard-top">
          {/* Hamburger button */}
          <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FaBars />
          </button>

          <h1 className="page-title">Dashboard</h1>
        </div>

        {/* SUMMARY CARDS */}
        <div className="summary-cards">
          <div className="card income-card">
            <h3>Income</h3>
            <p className="amount">₹{income}</p>
          </div>

          <div className="card expense-card">
            <h3>Expense</h3>
            <p className="amount">₹{expense}</p>
          </div>

          <div className="card balance-card">
            <h3>Balance</h3>
            <p className="amount">₹{balance}</p>
          </div>
        </div>

        {/* CHARTS */}
        <div className="charts-container">

          <div className="chart-card">
            <PieCategoryChart transactions={transactions} />
          </div>

          <div className="chart-card">
            <BarMonthlyChart transactions={transactions} />
          </div>

          <div className="chart-card">
            <BalanceLineChart transactions={transactions} />
          </div>

        </div>

        {/* ADD TRANSACTION FORM */}
        <div className="section-title">Add Transaction</div>

        <div className="form-card pretty-form">
          <h3 className="form-title">Add New Transaction</h3>
          <TransactionForm onAdd={loadTransactions} />
        </div>

        {/* TABLE OF ALL TRANSACTIONS */}
        <div className="section-title">All Transactions</div>

        <div className="transactions-table-container">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Note</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((tx) => (
                <tr key={tx._id}>
                  <td><span className={`tx-pill ${tx.type}`}>{tx.type}</span></td>
                  <td>₹{tx.amount}</td>
                  <td>{tx.category}</td>
                  <td>{tx.date?.slice(0, 10)}</td>
                  <td>{tx.note}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(tx._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}
