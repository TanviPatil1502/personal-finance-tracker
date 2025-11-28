import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";
import { FaBars, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getTransactions } from "../api";

export default function CalendarPage({ onLogout, onNavigate }) {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 900);
  const [calendarData, setCalendarData] = useState([]);
  const [incomeSum, setIncomeSum] = useState(0);
  const [expenseSum, setExpenseSum] = useState(0);

  // Current month/year
  const [currentDate, setCurrentDate] = useState(new Date());

  // ----------------------------
  // GENERATE CALENDAR (Memoized)
  // ----------------------------
  const generateCalendar = useCallback(
    (data) => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();

      const firstDay = new Date(year, month, 1).getDay(); 
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      let calendar = [];
      let totalIncome = 0;
      let totalExpense = 0;

      // Blank cells until month starts
      for (let i = 0; i < firstDay; i++) {
        calendar.push({ empty: true });
      }

      // Days with data
      for (let day = 1; day <= daysInMonth; day++) {
        const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(
          day
        ).padStart(2, "0")}`;

        const dayTx = data.filter((tx) => tx.date?.slice(0, 10) === dateKey);

        const income = dayTx
          .filter((t) => t.type === "income")
          .reduce((sum, t) => sum + t.amount, 0);

        const expense = dayTx
          .filter((t) => t.type === "expense")
          .reduce((sum, t) => sum + t.amount, 0);

        totalIncome += income;
        totalExpense += expense;

        calendar.push({
          day,
          income,
          expense,
          today:
            day === new Date().getDate() &&
            month === new Date().getMonth() &&
            year === new Date().getFullYear(),
        });
      }

      setIncomeSum(totalIncome);
      setExpenseSum(totalExpense);
      setCalendarData(calendar);
    },
    [currentDate]
  );

  // ----------------------------
  // LOAD TRANSACTIONS
  // ----------------------------
  const loadData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await getTransactions(token);
      generateCalendar(data);
    } catch (error) {
      console.error("Calendar loading error:", error);
    }
  }, [generateCalendar]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // ----------------------------
  // MONTH NAVIGATION
  // ----------------------------
  const prevMonth = () => {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() - 1);
    setCurrentDate(d);
  };

  const nextMonth = () => {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() + 1);
    setCurrentDate(d);
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
          <h1 className="page-title">Calendar</h1>
        </div>

        <button className="back-btn" onClick={() => onNavigate("dashboard")}>
          ← Back
        </button>

        {/* MONTH NAVIGATION */}
        <div className="month-nav">
          <FaChevronLeft className="month-btn" onClick={prevMonth} />

          <h2 className="month-title">
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
            {currentDate.getFullYear()}
          </h2>

          <FaChevronRight className="month-btn" onClick={nextMonth} />
        </div>

        {/* SUMMARY BAR */}
        <div className="month-summary">
          <div>
            Income: <span className="cal-income">₹{incomeSum}</span>
          </div>
          <div>
            Expenses: <span className="cal-expense">₹{expenseSum}</span>
          </div>
          <div>
            Total: <span className="cal-total">₹{incomeSum - expenseSum}</span>
          </div>
        </div>

        {/* WEEKDAYS */}
        <div className="calendar-weekdays">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* CALENDAR GRID */}
        <div className="calendar-grid-advanced">
          {calendarData.map((item, i) =>
            item.empty ? (
              <div className="calendar-cell empty" key={i}></div>
            ) : (
              <div
                className={`calendar-cell ${item.today ? "today" : ""}`}
                key={i}
              >
                <div className="cal-day">{item.day}</div>

                {item.income > 0 && (
                  <div className="cal-income">₹{item.income}</div>
                )}

                {item.expense > 0 && (
                  <div className="cal-expense">₹{item.expense}</div>
                )}
              </div>
            )
          )}
        </div>

      </div>
    </div>
  );
}
