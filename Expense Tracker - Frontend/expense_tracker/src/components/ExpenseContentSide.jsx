import React from "react";
import ExpenseHeader from "./ExpenseHeader";
import ExpensePostForm from "./ExpensePostForm";
import ExpensePastList from "./ExpensePastList";

const ExpenseContentSide = () => {
  return (
    <div className="bg-white w-[85%] rounded-lg shadow-xl m-5 p-5">
      <ExpenseHeader />

      <div className="flex mt-5 items-center justify-between gap-x-5">
        <ExpensePostForm />
        <ExpensePastList />
      </div>
    </div>
  );
};

export default ExpenseContentSide;
