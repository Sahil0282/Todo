import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signup from "../assets/signup.png";
import Cookies from "js-cookie";


const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
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
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (formData.acceptedTerms !== true) {
      alert("accept the terms and condition!");
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:3000/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        Cookies.set("token", data.token, {
          expires: 1,
          secure: true,
          sameSite: "Strict",
        });
        console.log("Signup successful:", data);
        navigate("/dashboard");
      } else {
        if (data.errorType === "USER_EXISTS") {
          alert("Username already exists. Please choose a different one.");
        } else if (data.errorType === "SERVER_ERROR") {
          alert("Server error. Please try again later.");
        } else {
          alert("Signup failed. Please check your details and try again.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred. Please try again.");
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
        <div className="bg-white h-3/4 w-2/3 rounded shadow-2xl flex flex-col gap-2 overflow-auto">
          <h1 className="mt-4 text-4xl font-medium text-center">Sign Up !</h1>
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

              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full p-2 border border-gray-300 rounded mb-3"
                onChange={handleChange}
                value={formData.email}
                required
              />

              <label className="block text-gray-700 mb-1">Password</label>
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
              </div>

              <label className="block text-gray-700 mt-3 mb-1">
                Retype Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your Password"
                  className="w-full p-2 border border-gray-300 rounded pr-10"
                  onChange={handleChange}
                  value={formData.confirmPassword}
                  required
                />
              </div>

              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  name="acceptedTerms"
                  className="mr-2"
                  checked={formData.acceptedTerms}
                  onChange={handleChange}
                />
                <span className="text-gray-700 text-sm">
                  I accepted all{" "}
                  <span className="font-bold">terms & conditions</span>.
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white p-3 mt-6 rounded">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="h-screen w-1/2 bg-[#FFFF] rounded">
        <img className="mt-20" src={signup} alt="" />
      </div>
    </section>
  );
};

export default SignUp;
