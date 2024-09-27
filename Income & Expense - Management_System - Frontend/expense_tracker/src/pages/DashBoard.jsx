import React from "react";
import SideBar from "../components/SideBar";
import DashboardContentSide from "../components/DashboardContentSide";

const DashBoard = () => {
  return (
    <div className="bg-slate-100 p-2 flex">
      <SideBar />
      <DashboardContentSide />
    </div>
  );
};

export default DashBoard;
