import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "./Calculator.css";
import { FaBars } from "react-icons/fa";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CalculatorPage({ onLogout, onNavigate }) {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 900);

  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(10);
  const [months, setMonths] = useState(12);

  const calculateEMI = () => {
    let P = amount;
    let R = rate / 12 / 100;
    let N = months;

    let EMI = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    return EMI.toFixed(2);
  };

  const emi = calculateEMI();
  const totalPayment = (emi * months).toFixed(2);
  const totalInterest = (totalPayment - amount).toFixed(2);

  const pieData = {
    labels: ["Principal", "Interest"],
    datasets: [
      {
        data: [amount, totalInterest],
        backgroundColor: ["#2563eb", "#f43f5e"],
        hoverOffset: 6,
      },
    ],
  };

  return (
    <div className="dashboard-root">

      {/* SIDEBAR */}
      <Sidebar
        isOpen={sidebarOpen}
        onLogout={onLogout}
        onNavigate={onNavigate}
        onClose={() => setSidebarOpen(false)}
      />

      {/* MAIN */}
      <div className={`dashboard-main ${sidebarOpen ? "with-sidebar" : ""}`}>

        {/* HEADER */}
        <div className="dashboard-top">
          <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FaBars />
          </button>
          <h1 className="page-title">Premium EMI Calculator</h1>
        </div>

        <button className="back-btn" onClick={() => onNavigate("dashboard")}>
          ← Back
        </button>

        {/* PREMIUM CARD */}
        <div className="calc-premium-wrapper">
          <div className="calc-premium-card">

            <h2 className="calc-title">Loan EMI Calculator</h2>

            {/* LOAN AMOUNT */}
            <label>Loan Amount: ₹{amount.toLocaleString()}</label>
            <input
              type="range"
              min="1000"
              max="2000000"
              step="1000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />

            {/* INTEREST */}
            <label>Interest Rate: {rate}%</label>
            <input
              type="range"
              min="1"
              max="30"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
            />

            {/* TENURE */}
            <label>Loan Tenure: {months} months</label>
            <input
              type="range"
              min="1"
              max="300"
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
            />

            {/* RESULT CARD */}
            <div className="emi-results-box">
              <p>💠 Monthly EMI: <strong>₹{emi}</strong></p>
              <p>💠 Total Interest: <strong>₹{totalInterest}</strong></p>
              <p>💠 Total Payable: <strong>₹{totalPayment}</strong></p>
            </div>

            {/* PIE CHART */}
            <div className="emi-chart">
              <Pie data={pieData} />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
