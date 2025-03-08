import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, logout } from "../redux/userSlice";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <div className="grid lg:grid-cols-[300px,1fr] h-screen max-h-screen">
      <section className="bg-white">
        <Sidebar />
      </section>
      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default Home;
