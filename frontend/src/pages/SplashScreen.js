import React from "react";
import "./SplashScreen.css";

export default function SplashScreen({ appName = "MoneyMate", onContinue }) {
  return (
    <div className="splash-root">
      <div className="splash-card">
        <div className="logo-circle">{appName[0]}</div>
        <h1 className="splash-title">{appName}</h1>
        <p className="splash-sub">Your personal finance companion</p>

        <button className="splash-cta" onClick={onContinue}>
          Get Started
        </button>
      </div>
    </div>
  );
}
