import React from "react";
import IncomeHeader from "./IncomeHeader";
import IncomePostForm from "./IncomePostForm";
import IncomePastList from "./IncomePastList";

const IncomeContentSide = () => {
  return (
    <div className="bg-white w-[85%] rounded-lg shadow-xl m-5 p-5">
      <IncomeHeader />

      <div className="flex mt-5 items-center justify-between gap-x-5">
        <IncomePostForm />
        <IncomePastList />
      </div>
    </div>
  );
};

export default IncomeContentSide;
