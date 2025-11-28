import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";
import { FaBars } from "react-icons/fa";

export default function CalculatorPage({ onLogout, onNavigate }) {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 900);

  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [emi, setEmi] = useState(null);

  const calculateEMI = () => {
    if (!principal || !rate || !tenure) {
      alert("Please fill all fields");
      return;
    }

    let P = parseFloat(principal);
    let R = parseFloat(rate) / 12 / 100; // monthly interest
    let N = parseInt(tenure * 12); // months

    let emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);

    setEmi(emiValue.toFixed(2));
  };

  return (
    <div className="dashboard-root">

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={onLogout}
        onNavigate={onNavigate}
      />

      <div className={`dashboard-main ${sidebarOpen ? "with-sidebar" : ""}`}>

        {/* Header */}
        <div className="dashboard-top">
          <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FaBars />
          </button>
          <h1 className="page-title">EMI Calculator</h1>
        </div>

        {/* Back Button */}
        <button className="back-btn" onClick={() => onNavigate("dashboard")}>
          ← Back
        </button>

        {/* Main Card */}
        <div className="emi-card">
          <h2 className="emi-title">Loan EMI Calculator</h2>

          <div className="emi-input-group">
            <label>Loan Amount (₹)</label>
            <input
              type="number"
              placeholder="Enter loan amount"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
            />
          </div>

          <div className="emi-input-group">
            <label>Interest Rate (%)</label>
            <input
              type="number"
              placeholder="Enter annual interest rate"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
            />
          </div>

          <div className="emi-input-group">
            <label>Tenure (Years)</label>
            <input
              type="number"
              placeholder="Enter loan tenure in years"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
            />
          </div>

          <button className="emi-btn" onClick={calculateEMI}>
            Calculate EMI
          </button>

          {emi && (
            <div className="emi-result">
              <h3>Your Monthly EMI:</h3>
              <p>₹ {emi}</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
