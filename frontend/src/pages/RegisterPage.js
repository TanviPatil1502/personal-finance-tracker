import React, { useState } from "react";
import "./Auth.css";

export default function RegisterPage({ onRegister, onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Fill both fields");
    onRegister({ email, password });
  };

  return (
    <div className="auth-root">
      <div className="auth-big-card">

        <h2 className="auth-title">Create your MoneyMate Account</h2>
        <p className="auth-sub">Start tracking & improving your finances</p>

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
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="auth-btn" type="submit">Create Account</button>
        </form>

        <div className="auth-footer">
          <span>Already have an account?</span>
          <button className="link-btn" onClick={onSwitchToLogin}>Sign In</button>
        </div>

      </div>
    </div>
  );
}
