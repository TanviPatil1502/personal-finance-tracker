// ===========================
//  API Helper Functions
// ===========================

// Base URL automatically points to backend through proxy (from package.json)
const BASE_URL = "/api";

// ---------------------------
//  AUTH
// ---------------------------

export const loginUser = async ({ email, password }) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });
  return res.json();
};

export const registerUser = async ({ email, password }) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });
  return res.json();
};

// ---------------------------
//  TRANSACTIONS
// ---------------------------

export const getTransactions = async (token) => {
  const res = await fetch(`${BASE_URL}/transactions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token
    }
  });
  return res.json();
};

export const addTransaction = async (data, token) => {
  const res = await fetch(`${BASE_URL}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const deleteTransaction = async (id, token) => {
  const res = await fetch(`${BASE_URL}/transactions/${id}`, {
    method: "DELETE",
    headers: {
      "x-auth-token": token
    }
  });
  return res.json();
};

// ---------------------------
//  REMINDERS
// ---------------------------

export const getReminders = async (token) => {
  const res = await fetch(`${BASE_URL}/reminders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token
    }
  });
  return res.json();
};

export const addReminder = async (data, token) => {
  const res = await fetch(`${BASE_URL}/reminders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const deleteReminder = async (id, token) => {
  const res = await fetch(`${BASE_URL}/reminders/${id}`, {
    method: "DELETE",
    headers: {
      "x-auth-token": token
    }
  });
  return res.json();
};
