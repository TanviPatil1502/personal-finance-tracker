import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function BalanceLineChart({ transactions }) {
  const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

  let runningBalance = 0;

  const data = sorted.map((t) => {
    runningBalance += (t.type === "income" ? t.amount : -t.amount);

    return {
      date: new Date(t.date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      }),
      balance: runningBalance,
    };
  });

  return (
    <div>
      <h3>Balance Trend Over Time</h3>

      <LineChart width={450} height={300} data={data}>
        <CartesianGrid stroke="#ddd" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="balance" stroke="#0984e3" strokeWidth={3} />
      </LineChart>
    </div>
  );
}

export default BalanceLineChart;
