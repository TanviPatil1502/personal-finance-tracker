import React from "react";
import "./Sidebar.css";
import { FaHome, FaChartPie, FaCalendarAlt, FaCalculator, FaSignOutAlt } from "react-icons/fa";

export default function Sidebar({ isOpen, onClose, onLogout, onNavigate }) {
  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <h2 className="sidebar-title">MoneyMate</h2>

        <ul className="sidebar-menu">

          <li onClick={() => onNavigate("dashboard")}>
            <FaHome /> <span>Dashboard</span>
          </li>

          <li onClick={() => onNavigate("reports")}>
            <FaChartPie /> <span>Reports</span>
          </li>

          <li onClick={() => onNavigate("calendar")}>
            <FaCalendarAlt /> <span>Calendar</span>
          </li>

          <li onClick={() => onNavigate("calculator")}>
            <FaCalculator /> <span>Calculator</span>
          </li>

        </ul>

        <button className="logout-btn" onClick={onLogout}>
          <FaSignOutAlt /> <span>Logout</span>
        </button>
      </div>

      <div
        className={`sidebar-overlay ${isOpen ? "visible" : ""}`}
        onClick={onClose}
      />
    </>
  );
}
