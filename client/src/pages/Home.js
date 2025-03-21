import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, logout } from "../redux/userSlice";
import Sidebar from "../components/Sidebar";
import logo from "../assets/logo.png";

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  console.log("redux user", user);
  const fetchUserDetails = async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`;

      const response = await axios({
        url: URL,
        withCredentials: true,
      });

      dispatch(setUser(response.data.data));

      if (response.data.data.logout) {
        dispatch(logout());
        navigate("/email");
      }

      console.log("current user Details", response);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const basePath = location.pathname === "/";
  console.log(basePath);
  return (
    <div className="grid lg:grid-cols-[300px,1fr] h-screen max-h-screen">
      <section className={`bg-white ${basePath ? "" : "hidden"} lg:block`}>
        <Sidebar />
      </section>
      {/**message component**/}
      <section className={`${basePath ? "hidden" : ""}`}>
        <Outlet />
      </section>
      <div
        className={`justify-center items-center flex-col gap-2 hidden ${
          !basePath ? "hidden" : "lg:flex"
        }`}
      >
        <div>
          <img src={logo} width={250} alt="logo" />
        </div>
        <p className="text-lg mt-2 text-slate-500">
          Select user to send message
        </p>
      </div>
    </div>
  );
};

export default Home;
