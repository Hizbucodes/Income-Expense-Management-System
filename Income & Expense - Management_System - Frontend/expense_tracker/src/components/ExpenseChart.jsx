import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseChart = () => {
  const GET_GRAPH_STATS = "http://localhost:8080/api/stats/getChartData";

  const [date, setDate] = useState([]);
  const [amount, setAmount] = useState([]);

  useEffect(() => {
    const getExpenseDateLabels = async () => {
      try {
        const response = await axios.get(GET_GRAPH_STATS);
        setDate(response.data?.expenseList);
        setAmount(response.data?.expenseList);
      } catch (err) {
        console.log("something went wrong" + err);
      }
    };

    getExpenseDateLabels();
  }, []);

  const options = { responsive: true };
  const incomeData = {
    labels: date.map((dte) => dte.date),
    datasets: [
      {
        label: "Expense",
        data: amount.map((amt) => amt.amount),
        borderColor: "red",
        backgroundColor: "red",
      },
    ],
  };
  return (
    <div className="w-[100%] bg-white shadow-md rounded-lg min-h-[550px] mt-5">
      <div className="bg-gray-200 py-5 text-center font-semibold rounded-t-lg">
        <h1>Expense Chart</h1>
      </div>

      <Line options={options} data={incomeData} />
    </div>
  );
};

export default ExpenseChart;
