import axios from "axios";
import React, { useEffect, useState } from "react";

const IncomeHeader = () => {
  const GET_TOTAL_INCOME_API = "http://localhost:8080/api/stats/getStates";
  const [totalIncome, setTotalIncome] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getTotalIncome = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(GET_TOTAL_INCOME_API);

        setTotalIncome(response.data.income);
      } catch (err) {
        console.log("Something went wrong", err);
      } finally {
        setIsLoading(false);
      }
    };

    getTotalIncome();
  }, []);

  return (
    <header className="bg-slate-300 h-[80px] w-full flex items-center justify-center rounded-lg mt-2">
      {isLoading ? (
        <p className="font-bold">Loadin Total Income...</p>
      ) : (
        <p className="font-bold">
          Total Income:{" "}
          <span className="text-green-600">LKR {totalIncome}</span>
        </p>
      )}
    </header>
  );
};

export default IncomeHeader;
