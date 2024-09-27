import React, { useState } from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [sideBarLinks, setSideBarLinks] = useState([
    {
      id: 1,
      title: "Dashboard",
      redirectTo: "/",
      icon: "https://cdn-icons-png.freepik.com/256/2329/2329087.png?ga=GA1.1.25224160.1712083754&semt=ais_hybrid",
    },
    {
      id: 2,
      title: "Income",
      redirectTo: "/income",
      icon: "https://cdn-icons-png.freepik.com/256/12447/12447387.png?ga=GA1.1.25224160.1712083754&semt=ais_hybrid",
    },
    {
      id: 3,
      title: "Expense",
      redirectTo: "/expense",
      icon: "https://cdn-icons-png.freepik.com/256/12692/12692340.png?ga=GA1.1.25224160.1712083754&semt=ais_hybrid",
    },
  ]);
  return (
    <div className="w-[15%] bg-slate-900 text-white h-screen py-10 sticky top-0">
      <div className="w-[85%] rounded-lg h-20 bg-slate-700 mx-auto flex items-center justify-center">
        <div className="w-[2rem] mr-5">
          <img
            src="https://cdn-icons-png.freepik.com/256/1077/1077114.png?ga=GA1.1.25224160.1712083754&semt=ais_hybrid"
            className="w-[100%]"
          />
        </div>

        <div>
          <h2>Hizbullah</h2>
        </div>
      </div>

      <div className=" flex flex-col items-center mt-8">
        {sideBarLinks.map((sideBarLink) => (
          <Link
            key={sideBarLink.id}
            to={sideBarLink.redirectTo}
            className=" w-full cursor-pointer p-2 "
          >
            <div className="bg-slate-500 flex items-center pl-10 rounded-lg p-1 hover:bg-slate-300 hover:text-black">
              <img src={sideBarLink.icon} className="w-[2rem]" />
              <p className="text-start ml-4">{sideBarLink.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
