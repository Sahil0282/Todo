import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import RenderTodos from "../components/RenderTodos";
import CreateTodo from "../components/CreateTodo";

const Dashboard = () => {
  const [todo, setTodo] = useState([]);
  const accessToken = Cookies.get("token");

  const fetchTodo = async () => {
    try {
      const response = await fetch("https://ticker-z5a3.onrender.com/task/", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
  
      const data = await response.json();
      console.log(data.tasks);
  
      if (Array.isArray(data.tasks)) { 
        setTodo(data.tasks);
      } else {
        console.error("Expected an array but got:", data);
        setTodo([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  useEffect(() => {
    fetchTodo(); 
  }, []);

  return (
    <section className="w-full h-screen flex flex-col px-2 ">
      <div className="w-full h-13 bg-white mt-5 shadow rounded-sm flex justify-between items-center px-10 py-3">
        <p className="w-1/12 text-center">ID</p>
        <p className="w-3/12 text-center">Title</p>
        <p className="w-4/12 text-center">Description</p>
        <p className="w-2/12 text-center">Status</p>
        <p className="w-2/12 text-center">Actions</p>
      </div>
      <RenderTodos todos={todo} fetchTodo={fetchTodo} />
       <div className="flex items-center justify-end w-full h-20 mt-2">
          <CreateTodo fetchTodo={fetchTodo}/>
       </div>
    </section>
  );
};

export default Dashboard;
