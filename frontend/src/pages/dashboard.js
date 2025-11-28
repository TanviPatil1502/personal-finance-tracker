import React, { useEffect, useState } from "react";
import {
  getTransactions,
  deleteTransaction,
  addReminder,
  getReminders,
  deleteReminder,
} from "../api";

import Sidebar from "../components/Sidebar";
import TransactionForm from "../components/TransactionForm";
import ReminderForm from "../components/ReminderForm";

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

  const [reminders, setReminders] = useState([]);

  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 900);

  // Load data on mount
  useEffect(() => {
    loadTransactions();
    loadReminders();

    const handleResize = () => {
      setSidebarOpen(window.innerWidth > 900);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ----------------------------------
        LOAD TRANSACTIONS
  -----------------------------------*/
  const loadTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await getTransactions(token);

      setTransactions(data);

      let inc = 0,
        exp = 0;
      data.forEach((tx) => {
        if (tx.type === "income") inc += tx.amount;
        else exp += tx.amount;
      });

      setIncome(inc);
      setExpense(exp);
      setBalance(inc - exp);
    } catch (err) {
      console.error(err);
      alert("Failed to load transactions");
    }
  };

  /* ----------------------------------
        DELETE TRANSACTION
  -----------------------------------*/
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await deleteTransaction(id, token);
      loadTransactions();
    } catch (err) {
      console.error(err);
    }
  };

  /* ----------------------------------
        REMINDERS FROM BACKEND
  -----------------------------------*/
  const loadReminders = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await getReminders(token);
      setReminders(data);
    } catch (err) {
      console.error(err);
    }
  };

  /* ----------------------------------
        ADD REMINDER (SAVE TO DB)
  -----------------------------------*/
  const addNewReminder = async (reminder) => {
    try {
      const token = localStorage.getItem("token");
      await addReminder(reminder, token);
      loadReminders();
    } catch (err) {
      console.error(err);
    }
  };

  /* ----------------------------------
        DELETE REMINDER
  -----------------------------------*/
  const removeReminder = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await deleteReminder(id, token);
      loadReminders();
    } catch (err) {
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
        onNavigate={onNavigate}
      />

      {/* MAIN SECTION */}
      <div className={`dashboard-main ${sidebarOpen ? "with-sidebar" : ""}`}>

        {/* HEADER */}
        <div className="dashboard-top">
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
          <div className="chart-card"><PieCategoryChart transactions={transactions} /></div>
          <div className="chart-card"><BarMonthlyChart transactions={transactions} /></div>
          <div className="chart-card"><BalanceLineChart transactions={transactions} /></div>
        </div>

        {/* SECTION TITLE */}
        <div className="section-title">Add Transaction & Reminders</div>

        {/* SIDE-BY-SIDE INPUT CARDS */}
        <div className="add-sections">

          {/* ADD TRANSACTION */}
          <div className="chart-card add-card">
            <h3 className="add-title">Add Transaction</h3>
            <TransactionForm onAdd={loadTransactions} />
          </div>

          {/* SET REMINDER */}
          <div className="chart-card add-card">
            
            <ReminderForm onAddReminder={addNewReminder} />
          </div>

        </div>

        {/* REMINDER LIST */}
        <div className="section-title">Upcoming Reminders</div>

        <div className="reminder-list">
          {reminders.length === 0 ? (
            <p>No reminders yet.</p>
          ) : (
            reminders.map((r) => (
              <div key={r._id} className="reminder-box">
                <strong>{r.title}</strong>
                <div>Date: {r.date}</div>
                <div>Time: {r.time}</div>
                {r.note && <div>Note: {r.note}</div>}

                <button className="delete-btn" onClick={() => removeReminder(r._id)}>
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        {/* TRANSACTION TABLE */}
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
                    <button className="delete-btn" onClick={() => handleDelete(tx._id)}>
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
