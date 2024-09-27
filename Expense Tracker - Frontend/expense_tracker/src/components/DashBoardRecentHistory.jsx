import axios from "axios";
import React, { useEffect, useState } from "react";

const DashBoardRecentHistory = () => {
  const GET_ALL_STATS_API = "http://localhost:8080/api/stats/getStates";

  const [isLoading, setIsLoading] = useState(false);

  const [recentIncomeMoney, setRecentIncomeMoney] = useState(0);
  const [recentExpenseMoney, setRecentExpenseMoney] = useState(0);

  const [recentIncomeTitle, setRecentIncomeTitle] = useState("");
  const [recentExpenseTitle, setRecentExpenseTitle] = useState("");

  const [recentMinimumIncome, setRecentMinimunIncome] = useState(0);
  const [recentMaximumIncome, setRecentMaximumIncome] = useState(0);

  const [recentMinimumExpense, setRecentMinimumExpense] = useState(0);
  const [recentMaximumExpense, setRecentMaximumExpense] = useState(0);

  useEffect(() => {
    const getTotalStates = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(GET_ALL_STATS_API);
        setRecentIncomeMoney(response.data?.latestIncome?.amount);
        setRecentExpenseMoney(response.data?.latestExpense?.amount);
        setRecentIncomeTitle(response.data?.latestIncome?.title);
        setRecentExpenseTitle(response.data?.latestExpense?.title);
        setRecentMinimunIncome(response.data?.minIncome);
        setRecentMaximumIncome(response.data?.maxIncome);
        setRecentMinimumExpense(response.data?.minExpense);
        setRecentMaximumExpense(response.data?.maxExpense);
      } catch (err) {
        console.log("Something went wrong", err);
      } finally {
        setIsLoading(false);
      }
    };

    getTotalStates();
  }, [GET_ALL_STATS_API]);
  return (
    <div className="bg-white shadow-md w-[40%] rounded-lg h-[550px] mt-5">
      <div className="bg-gray-200 py-5 text-center font-semibold rounded-t-lg">
        <h1>Recent History</h1>
      </div>

      <div className="flex flex-col gap-y-2  px-2">
        <div className="border-2 border-t-0 py-5 text-center rounded-b-lg">
          <p className="text-green-600 font-semibold">
            +<span>{recentIncomeMoney.toFixed(1)}</span>{" "}
            <span>{recentIncomeTitle}</span>
          </p>
        </div>

        <div className="border-2 py-5 text-center rounded-lg">
          <p className="text-red-600 font-semibold">
            <span>-{recentExpenseMoney.toFixed(1)}</span>{" "}
            <span>{recentExpenseTitle}</span>
          </p>
        </div>
      </div>

      <div className="bg-gray-200 py-5 text-center font-semibold mt-3">
        <h1>Income</h1>
      </div>
      <div className="flex  mt-3 px-2 py-2 items-center justify-around">
        <p className=" font-medium  w-full border-r-2 border-gray-400 text-center">
          minimum: {recentMinimumIncome}
        </p>

        <p className="font-medium w-full text-center">
          maximum: {recentMaximumIncome}
        </p>
      </div>

      <div className="bg-gray-200 py-5 text-center font-semibold mt-3">
        <h1>Expense</h1>
      </div>
      <div className="flex  mt-3 px-2 py-2 items-center justify-around">
        <p className=" font-medium  w-full border-r-2 border-gray-400 text-center">
          minimum: {recentMinimumExpense}
        </p>

        <p className="font-medium w-full text-center">
          maximum: {recentMaximumExpense}
        </p>
      </div>
    </div>
  );
};

export default DashBoardRecentHistory;
