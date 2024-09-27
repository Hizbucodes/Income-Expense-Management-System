import React from "react";
import ExpenseContentSide from "../components/ExpenseContentSide";
import SideBar from "../components/SideBar";

const ExpensePage = () => {
  return (
    <div className="bg-slate-100 p-2 flex">
      <SideBar />
      <ExpenseContentSide />
    </div>
  );
};

export default ExpensePage;
