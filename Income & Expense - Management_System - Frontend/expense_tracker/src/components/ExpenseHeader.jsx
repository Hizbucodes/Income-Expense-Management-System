import axios from "axios";
import React, { useEffect, useState } from "react";

const ExpenseHeader = () => {
  const GET_TOTAL_EXPENSE_API = "http://localhost:8080/api/stats/getStates";
  const [totalExpense, setTotalExpense] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getTotalExpense = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(GET_TOTAL_EXPENSE_API);

        setTotalExpense(response.data.expense);
      } catch (err) {
        console.log("Something went wrong", err);
      } finally {
        setIsLoading(false);
      }
    };

    getTotalExpense();
  }, []);
  return (
    <header className="bg-slate-300 h-[80px] w-full flex items-center justify-center rounded-lg mt-2">
      {isLoading ? (
        <p className="font-bold">Loadin Total Expense...</p>
      ) : (
        <p className="font-bold">
          Total Expense:{" "}
          <span className="text-red-600">LKR {totalExpense}</span>
        </p>
      )}
    </header>
  );
};

export default ExpenseHeader;
