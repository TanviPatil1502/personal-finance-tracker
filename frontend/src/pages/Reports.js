import React from "react";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";

export default function Reports({ onLogout, onNavigate }) {
  return (
    <div className="dashboard-root">
      <Sidebar isOpen={true} onClose={() => {}} onLogout={onLogout} onNavigate={onNavigate} />
      <div className="dashboard-main with-sidebar">
        <button className="back-btn" onClick={() => onNavigate("dashboard")}>
  ← Back
</button>

        <h1 className="page-title">Reports</h1>
        <p style={{fontSize:"18px", color:"#555"}}>Detailed insights will appear here</p>
      </div>
    </div>
  );
}
