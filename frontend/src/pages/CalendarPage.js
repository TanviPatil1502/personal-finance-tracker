import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import { getTransactions } from "../api";
import "./Calendar.css";
import { FaBars, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function CalendarPage({ onLogout, onNavigate }) {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 900);
  const [calendarData, setCalendarData] = useState([]);

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  // MAIN DATA LOADER
  const loadData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await getTransactions(token);

      // ==== GENERATE CALENDAR GRID ====
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDay = new Date(year, month, 1).getDay();

      let grid = [];

      // Blank cells before the month starts
      for (let i = 0; i < firstDay; i++) {
        grid.push({ blank: true });
      }

      // Actual cells
      for (let day = 1; day <= daysInMonth; day++) {
        const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        const dayTx = data.filter((tx) => tx.date?.slice(0, 10) === dateKey);

        const income = dayTx
          .filter((tx) => tx.type === "income")
          .reduce((sum, tx) => sum + tx.amount, 0);

        const expense = dayTx
          .filter((tx) => tx.type === "expense")
          .reduce((sum, tx) => sum + tx.amount, 0);

        grid.push({ day, income, expense });
      }

      setCalendarData(grid);
    } catch (err) {
      console.error(err);
    }
  }, [month, year]);

  // LOAD WHENEVER MONTH OR YEAR CHANGES
  useEffect(() => {
    loadData();

    const handleResize = () => {
      setSidebarOpen(window.innerWidth > 900);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [loadData]);

  // MONTH NAVIGATION
  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const monthName = new Date(year, month).toLocaleString("default", { month: "long" });

  return (
    <div className="dashboard-root">

      {/* SIDEBAR */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={onLogout}
        onNavigate={onNavigate}
      />

      <div className={`dashboard-main ${sidebarOpen ? "with-sidebar" : ""}`}>

        {/* HEADER */}
        <div className="dashboard-top">
          <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FaBars />
          </button>
          <h1 className="page-title">Calendar</h1>
        </div>

        {/* BACK BUTTON */}
        <button className="back-btn" onClick={() => onNavigate("dashboard")}>
          ← Back
        </button>

        {/* MONTH HEADER */}
        <div className="calendar-header">
          <FaChevronLeft className="calendar-arrow" onClick={prevMonth} />
          <span>{monthName} {year}</span>
          <FaChevronRight className="calendar-arrow" onClick={nextMonth} />
        </div>

        {/* WEEKDAYS */}
        <div className="calendar-weekdays">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* GRID */}
        <div className="calendar-grid-advanced">
          {calendarData.map((day, index) =>
            day.blank ? (
              <div key={index} className="calendar-cell empty"></div>
            ) : (
              <div
                key={index}
                className={`calendar-cell ${
                  day.day === new Date().getDate() &&
                  month === new Date().getMonth() &&
                  year === new Date().getFullYear()
                    ? "today"
                    : ""
                }`}
              >
                <div className="cal-day">{day.day}</div>
                <div className="cal-income">Income: ₹{day.income}</div>
                <div className="cal-expense">Expense: ₹{day.expense}</div>
              </div>
            )
          )}
        </div>

      </div>
    </div>
  );
}
