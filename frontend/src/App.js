import React, { useState, useEffect } from "react";
import { loginUser, registerUser } from "./api";

import SplashScreen from "./pages/SplashScreen";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import CalendarPage from "./pages/CalendarPage";
import CalculatorPage from "./pages/CalculatorPage";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [view, setView] = useState("splash");  
  const [currentPage, setCurrentPage] = useState("dashboard");

  useEffect(() => {
    if (token) {
      setView("pages");
      setCurrentPage("dashboard");
    }
  }, [token]);

  const handleLogin = async ({ email, password }) => {
    const data = await loginUser({ email, password });
    if (data?.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setView("pages");
    } else {
      alert("Login Failed");
    }
  };

  const handleRegister = async ({ email, password }) => {
    const data = await registerUser({ email, password });
    if (data?.message) {
      alert(data.message);
      setView("login");
    } else {
      alert("Registration failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setView("login");
  };

  // SHOW SPLASH + AUTH SCREENS
  if (!token) {
    if (view === "splash") return <SplashScreen appName="MoneyMate" onContinue={() => setView("login")} />;
    if (view === "login") return <LoginPage onLogin={handleLogin} onSwitchToRegister={() => setView("register")} />;
    if (view === "register") return <RegisterPage onRegister={handleRegister} onSwitchToLogin={() => setView("login")} />;
  }

  // SHOW MAIN PAGES AFTER LOGIN
  return (
    <>
      {currentPage === "dashboard"   && <Dashboard onLogout={handleLogout} onNavigate={setCurrentPage} />}
      {currentPage === "reports"     && <Reports onLogout={handleLogout} onNavigate={setCurrentPage} />}
      {currentPage === "calendar"    && <CalendarPage onLogout={handleLogout} onNavigate={setCurrentPage} />}
      {currentPage === "calculator"  && <CalculatorPage onLogout={handleLogout} onNavigate={setCurrentPage} />}
    </>
  );
}

export default App;
