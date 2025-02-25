import React from "react";
import Hero from "../assets/Hero.png";
import { NavLink } from "react-router-dom";


const Home = () => {
  return (
    <section className="bg-white  h-screen w-full flex  ">
      <div className="w-full flex">
        <div className="w-1/3  flex flex-col mt-50">
          <h1 className="text-3xl font-medium mb-4 text-center">
            Stay Organized, Stay Productive
          </h1>
          <p className="text-xl ml-6 text-center text-gray-500 mb-6">
            Effortlessly manage your tasks and achieve your goals with our
            easy-to-use TODO app.
          </p>
          <button className="bg-black rounded text-xl text-white ml-25 w-1/2 p-2">
            <NavLink to="/signup">Get Started </NavLink>
          </button>
        </div>
        <div className="w-2/3">
          <img src={Hero} className="mt-25" />
        </div>
      </div>
    </section>
  );
};

export default Home;
