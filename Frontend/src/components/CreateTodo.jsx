import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Cookies from "js-cookie";

const CreateTodo = ({ fetchTodo }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const accessToken = Cookies.get("token");
  async function handleClick() {
    if (!newTitle || !newDescription) {
      alert("Please fill in both fields");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:3000/task/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
          isCompleted:isCompleted
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      fetchTodo();
      setNewTitle("");
      setNewDescription("");
      setIsAdding(false);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  }

  return (
    <>
      <div className="w-full  bg-[#F3F4F6] flex items-center justify-evenly px-10 py-3 mt-2  rounded-sm  font-light text-gray-600 gap-x-2">
        {isAdding == true ? (
          <>
            <div></div>
            <input
              type="text"
              className="w-4/12 text-center border"
              onChange={(e) => {
                setNewTitle(e.target.value);
              }}
            />
            <input
              type="text"
              className="w-4/12 text-center border"
              onChange={(e) => {
                setNewDescription(e.target.value);
              }}
            />
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4"
                onChange={(e) => {
                  setIsCompleted(e.target.checked);
                }}
                checked={isCompleted}
              />
              <span>Status</span>
            </label>
            <button
              type="button"
              onClick={handleClick}
              className="focus:outline-none h-13 text-white bg-green-700 hover:bg-green-800  font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              New Task <AddIcon />
            </button>
          </>
        ) : (
          <>
            {" "}
            <button
              type="button"
              onClick={() => setIsAdding(true)}
              className="focus:outline-none h-13 text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5">
              New Task <AddIcon />
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default CreateTodo;
