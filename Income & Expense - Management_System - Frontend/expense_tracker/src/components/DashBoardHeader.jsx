import React, { useEffect, useState } from "react";
import axios from "axios";
const DashBoardHeader = () => {
  const GET_TOTAL_STATS_API = "http://localhost:8080/api/stats/getStates";
  const [balance, setBalance] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getTotalStates = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(GET_TOTAL_STATS_API);

        setBalance(response.data.balance);
        setTotalIncome(response.data.income);
        setTotalExpense(response.data.expense);
      } catch (err) {
        console.log("Something went wrong", err);
      } finally {
        setIsLoading(false);
      }
    };

    getTotalStates();
  }, []);
  return (
    <header className="bg-slate-300 h-[80px] w-full flex items-center rounded-lg">
      <div className=" w-[400px] h-full flex items-center border-r-2 justify-center">
        <p className="font-medium">
          Balance:{" "}
          {isLoading ? (
            <span className="font-bold text-gray-700">
              Balance is Loading...
            </span>
          ) : (
            <span className="font-bold text-gray-700">{balance}</span>
          )}
        </p>
      </div>

      <div className=" w-full h-full flex items-center justify-around">
        <div>
          <p className="font-medium">
            Total Income:{" "}
            {isLoading ? (
              <span className="text-green-600 font-bold">
                Total Income is Loading...
              </span>
            ) : (
              <span className="text-green-600 font-bold">{totalIncome}</span>
            )}
          </p>
        </div>

        <div>
          <p className="font-medium">
            Total Expense:{" "}
            {isLoading ? (
              <span className="text-red-600 font-bold">
                Total Expense is Loading...
              </span>
            ) : (
              <span className="text-red-600 font-bold">{totalExpense}</span>
            )}
          </p>
        </div>
      </div>
    </header>
  );
};

export default DashBoardHeader;
