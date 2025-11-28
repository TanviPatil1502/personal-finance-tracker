import React, { useState } from "react";
import "./Auth.css";

export default function LoginPage({ onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Enter email & password");
    onLogin({ email, password });
  };

  return (
    <div className="auth-root">
      <div className="auth-big-card">

        <h2 className="auth-title">Welcome to MoneyMate</h2>
        <p className="auth-sub">Log in to continue managing your finances</p>

        <form onSubmit={submit} className="auth-form">

          <label>Email</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="auth-btn" type="submit">Sign In</button>

        </form>

        <div className="auth-footer">
          <span>Don't have an account?</span>
          <button className="link-btn" onClick={onSwitchToRegister}>Create Account</button>
        </div>

      </div>
    </div>
  );
}
