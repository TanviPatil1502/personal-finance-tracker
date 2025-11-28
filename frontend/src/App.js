import React, { useState } from "react";
import { loginUser, registerUser } from "./api";

// Pages
import SplashScreen from "./pages/SplashScreen";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import ReportsPage from "./pages/ReportsPage";
import CalendarPage from "./pages/CalendarPage";
import CalculatorPage from "./pages/CalculatorPage";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [view, setView] = useState(token ? "pages" : "splash");
  const [currentPage, setCurrentPage] = useState("dashboard");

  /* -------------------------
      LOGIN
  -------------------------- */
  const handleLogin = async ({ email, password }) => {
    try {
      const res = await loginUser({ email, password });

      if (res?.token) {
        localStorage.setItem("token", res.token);
        setToken(res.token);
        setView("pages");
        setCurrentPage("dashboard");
      } else {
        alert(res?.message || "Login failed.");
      }
    } catch (err) {
      alert("Login error");
    }
  };

  /* -------------------------
      REGISTER
  -------------------------- */
  const handleRegister = async ({ email, password }) => {
    try {
      const res = await registerUser({ email, password });

      if (res?.message) {
        alert(res.message);
        setView("login");
      } else if (res?.token) {
        localStorage.setItem("token", res.token);
        setToken(res.token);
        setView("pages");
        setCurrentPage("dashboard");
      } else {
        alert("Registration failed.");
      }
    } catch (err) {
      alert("Registration error");
    }
  };

  /* -------------------------
      LOGOUT
  -------------------------- */
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setView("login");
    setCurrentPage("dashboard");
  };

  /* -------------------------
      NOT LOGGED IN
  -------------------------- */

  if (!token) {
    if (view === "splash") {
      return <SplashScreen onContinue={() => setView("login")} />;
    }

    if (view === "login") {
      return (
        <LoginPage
          onLogin={handleLogin}
          onSwitchToRegister={() => setView("register")}
        />
      );
    }

    if (view === "register") {
      return (
        <RegisterPage
          onRegister={handleRegister}
          onSwitchToLogin={() => setView("login")}
        />
      );
    }

    return null;
  }

  /* -------------------------
      LOGGED IN PAGES
  -------------------------- */

  return (
    <>
      {currentPage === "dashboard" && (
        <Dashboard onLogout={handleLogout} onNavigate={setCurrentPage} />
      )}

      {currentPage === "reports" && (
        <ReportsPage onLogout={handleLogout} onNavigate={setCurrentPage} />
      )}

      {currentPage === "calendar" && (
        <CalendarPage onLogout={handleLogout} onNavigate={setCurrentPage} />
      )}

      {currentPage === "calculator" && (
        <CalculatorPage onLogout={handleLogout} onNavigate={setCurrentPage} />
      )}
    </>
  );
}

export default App;
