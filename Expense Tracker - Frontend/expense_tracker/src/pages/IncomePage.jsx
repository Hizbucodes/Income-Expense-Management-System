import React from "react";
import SideBar from "../components/SideBar";
import IncomeContentSide from "../components/IncomeContentSide";

const IncomePage = () => {
  return (
    <div className="bg-slate-100 p-2 flex ">
      <SideBar />
      <IncomeContentSide />
    </div>
  );
};

export default IncomePage;
