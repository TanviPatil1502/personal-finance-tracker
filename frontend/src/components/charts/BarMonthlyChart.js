import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

function BarMonthlyChart({ transactions }) {

  const monthlyData = {};

  transactions.forEach((t) => {
    const month = new Date(t.date).toLocaleString("default", { month: "short" });

    if (!monthlyData[month]) {
      monthlyData[month] = { month, income: 0, expense: 0 };
    }

    if (t.type === "income") monthlyData[month].income += t.amount;
    else monthlyData[month].expense += t.amount;
  });

  const data = Object.values(monthlyData);

  return (
    <div>
      <h3>Monthly Income vs Expense</h3>
      <BarChart width={400} height={300} data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" fill="#00b894" />
        <Bar dataKey="expense" fill="#d63031" />
      </BarChart>
    </div>
  );
}

export default BarMonthlyChart;
