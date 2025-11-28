const API_URL = "http://localhost:5000/api";

// REGISTER
export const registerUser = async (data) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

// LOGIN
export const loginUser = async (data) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

// ADD TRANSACTION
export const addTransaction = async (data, token) => {
  const response = await fetch(`${API_URL}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

// GET TRANSACTIONS
export const getTransactions = async (token) => {
  const response = await fetch(`${API_URL}/transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

// DELETE TRANSACTION
export const deleteTransaction = async (id, token) => {
  const response = await fetch(`${API_URL}/transactions/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
// REMINDERS API

export const addReminder = async (reminder, token) => {
  const res = await fetch("/api/reminders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token
    },
    body: JSON.stringify(reminder)
  });
  return res.json();
};

export const getReminders = async (token) => {
  const res = await fetch("/api/reminders", {
    headers: { "x-auth-token": token }
  });
  return res.json();
};

export const deleteReminder = async (id, token) => {
  const res = await fetch(`/api/reminders/${id}`, {
    method: "DELETE",
    headers: { "x-auth-token": token }
  });
  return res.json();
};
