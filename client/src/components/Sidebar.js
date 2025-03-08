import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useSelector } from "react-redux";
import Avatar from "./Avatar";

const Sidebar = () => {
  const user = useSelector((state) => state?.user);
  return (
    <div className="w-full h-full grid grid-cols-[48px,1fr] bg-white">
      <div className="bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between">
        <div>
          <NavLink
            className={({ isActive }) =>
              `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${
                isActive && "bg-slate-200"
              }`
            }
            title="chat"
          >
            <IoChatbubbleEllipses size={20} />
          </NavLink>
          <div
            title="add friend"
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded"
          >
            <FaUserPlus size={20} />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <button
          title="logout"
          className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded"
        >
          <span className="-ml-2">
            <BiLogOut size={20} />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
