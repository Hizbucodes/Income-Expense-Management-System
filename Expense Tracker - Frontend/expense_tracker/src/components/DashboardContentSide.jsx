import React from "react";
import DashBoardHeader from "./DashBoardHeader";
import IncomeChart from "./IncomeChart";
import DashBoardRecentHistory from "./DashBoardRecentHistory";
import ExpenseChart from "./ExpenseChart";

const DashboardContentSide = () => {
  return (
    <div className="bg-white w-[85%] rounded-lg shadow-xl m-5 p-5">
      <DashBoardHeader />
      <div className="flex gap-x-8">
        <div className="flex flex-col w-full">
          <IncomeChart />
          <ExpenseChart />
        </div>
        <DashBoardRecentHistory />
      </div>
    </div>
  );
};

export default DashboardContentSide;
