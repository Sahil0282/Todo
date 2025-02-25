import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signup from "../assets/login.jpg";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://ticker-z5a3.onrender.com/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        Cookies.set("token", data.token, {
          expires: 1,
          secure: true,
          sameSite: "Strict",
        });
        console.log("Login successful:", data);
        navigate("/dashboard");
      } else {
        console.error("Login failed:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="w-full h-screen flex">
      <div
        className="h-screen w-1/2 flex justify-center items-center  rounded bg-[#ffff]"
        style={{
          backgroundImage:
            "url(https://img.freepik.com/premium-vector/abstract-geometric-pattern-design_260839-594.jpg)",
        }}>
        <div className="bg-white h-2/3 w-2/3 rounded shadow-2xl flex flex-col gap-2 overflow-auto">
          <h1 className="mt-5 text-4xl font-medium text-center">Sign In</h1>
          <p className="font-light text-center text-gray-400">
            Welcome back! Please enter your details
          </p>
          <div className="flex flex-col justify-center items-center">
            <form className="bg-white p-6 w-96" onSubmit={handleSubmit}>
              <label className="block text-gray-700 mb-1">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your Username"
                className="w-full p-2 border border-gray-300 rounded mb-3"
                onChange={handleChange}
                value={formData.username}
                required
              />

              <label className="block text-gray-700 mb-4">Password</label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your Password"
                  className="w-full p-2 border border-gray-300 rounded pr-10"
                  onChange={handleChange}
                  value={formData.password}
                  required
                />
                <div className="mt-3 text-left">
                  <NavLink
                    to="/login"
                    className="text-blue-500 underline font-light">
                    Forget Password
                  </NavLink>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white p-3 mt-10 rounded">
                Login
              </button>
            </form>
            <div>
              Don't have an account? <a className="text-blue-500 font-light" href="/signup">Sign up</a>
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen w-1/2 bg-[#FFFF] rounded">
        <img className="mt-20" src={signup} alt="" />
      </div>
    </section>
  );
};

export default Login;
