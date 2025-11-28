import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getTransactions } from "../api";
import "./Dashboard.css"; // Reuse the same styles

export default function Reports({ onLogout, onNavigate }) {
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 900);

  useEffect(() => {
    loadData();
    const resize = () => setSidebarOpen(window.innerWidth > 900);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const loadData = async () => {
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
    }
  };

  return (
    <div className="dashboard-root">

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onLogout={onLogout}
        onNavigate={onNavigate}
        onClose={() => setSidebarOpen(false)}
      />

      <div className={`dashboard-main ${sidebarOpen ? "with-sidebar" : ""}`}>
        
        <h1 className="page-title">Reports</h1>

<button className="back-btn" onClick={() => onNavigate("dashboard")}>
  ← Back
</button>

        {/* SUMMARY CARDS (Same as Dashboard) */}
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

        {/* Transactions Table */}
        <div className="transactions-table-container">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Note</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((tx) => (
                <tr key={tx._id}>
                  <td>
                    <span className={`tx-pill ${tx.type}`}>{tx.type}</span>
                  </td>
                  <td>₹{tx.amount}</td>
                  <td>{tx.category}</td>
                  <td>{tx.date?.slice(0, 10)}</td>
                  <td>{tx.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
