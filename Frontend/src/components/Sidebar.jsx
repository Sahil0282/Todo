import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import LogoImg from "../assets/DoDay.png";
import logo1 from "../assets/logo1.jpg";
import Cookies from "js-cookie";

const Sidebar = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const accessToken = Cookies.get("token");
    if (accessToken) {
      setIsLogin(true);
    }
  }, [isLogin]);

  const handleLogout = () => {
    Cookies.remove("token");
    setIsLogin(false);
  };

  return (
    <aside className="h-screen w-64 bg-black text-white flex flex-col items-center py-6">
      <div className="text-xl font-bold mb-6 shadow p-2">
        <NavLink to="/">
          <img src={logo1} alt="Logo" className="h-13 w-auto" />
        </NavLink>
      </div>
      <ul className="flex flex-col gap-4 w-full text-center">
        <li className="hover:bg-gray-500 hover:rounded mx-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-gray-300 flex items-center px-4 py-2 gap-3 ${isActive ? "text-gray-300 bg-gray-600 rounded" : ""}`
            }>
            <HomeRoundedIcon /> Home
          </NavLink>
        </li>
        <li className="hover:bg-gray-500 hover:rounded mx-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `hover:text-gray-300 flex items-center px-4 py-2 gap-3 ${isActive ? "text-gray-300 bg-gray-600 rounded" : ""}`
            }>
            <DashboardCustomizeRoundedIcon /> Dashboard
          </NavLink>
        </li>
        {isLogin ? (
          <>
            <li className="hover:bg-gray-500 hover:rounded mx-2">
              <button
                onClick={handleLogout}
                className="hover:text-gray-300 flex items-center px-4 py-2 gap-3 w-full text-left">
                <LogoutIcon /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="hover:bg-gray-500 hover:rounded mx-2">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `hover:text-gray-300 flex items-center px-4 py-2 gap-3 ${isActive ? "text-gray-300 bg-gray-600 rounded" : ""}`
                }>
                <LoginRoundedIcon /> Login
              </NavLink>
            </li>
            <li className="hover:bg-gray-500 hover:rounded mx-2">
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `hover:text-gray-300 flex items-center px-4 py-2 gap-3 ${isActive ? "text-gray-300 bg-gray-600 rounded" : ""}`
                }>
                <PersonAddAltRoundedIcon /> Signup
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
