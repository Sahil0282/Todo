import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import Cookies from "js-cookie";

const RenderTodos = ({ todos, fetchTodo }) => {
  const accessToken = Cookies.get("token");
  const [editTodoId, setEditTodoId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const [editedDescription, setEditedDescription] = useState("");

  async function deleteTodo(todoId) {
    try {
      const response = await fetch(`https://ticker-z5a3.onrender.com/task/${todoId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        fetchTodo();
      } else {
        console.error("Failed to delete TODO");
      }
    } catch (error) {
      console.error("Error deleting TODO:", error);
    }
  }

  const handleEdit = (todo) => {
    setEditTodoId(todo._id);
    setEditedTitle(todo.title);
    setEditedDescription(todo.description);
  };
  const handleCancleEdit = () => {
    setEditTodoId(null);
  };
  async function updateTodo(todoId) {
    try {
      const response = await fetch(`https://ticker-z5a3.onrender.com/task/${todoId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editedTitle,
          description: editedDescription,
          isCompleted: isCompleted,
        }),
      });
      if (response.ok) {
        fetchTodo();
        setEditTodoId(null);
      } else {
        console.error("Failed to update TODO");
      }
    } catch (error) {
      console.error("Error updating TODO:", error);
    }
  }

  return (
    <>
      {Array.isArray(todos) && todos.length > 0
        ? todos.map((todo, index) => (
            <div
              key={index}
              className="w-full  bg-white  text-black flex items-center justify-between px-10 py-3 mt-2 shadow rounded-sm transition-transform duration-300 hover:scale-101 hover:shadow-2xl font-light text-gray-600">
              <p className="w-1/12 text-center">{index + 1}</p>
              {editTodoId == todo._id ? (
                <>
                  <input
                    type="text"
                    className="w-4/12 text-center border"
                    value={editedTitle}
                    onChange={(e) => {
                      setEditedTitle(e.target.value);
                    }}
                  />
                  <input
                    type="text"
                    className="w-4/12 text-center border"
                    value={editedDescription}
                    onChange={(e) => {
                      setEditedDescription(e.target.value);
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
                  <p className="w-2/12 text-center hidden">
                    {todo.isCompleted ? "Completed" : "Pending"}
                  </p>
                </>
              ) : (
                <>
                  <p className="w-3/12 text-center">{todo.title}</p>
                  <p className="w-4/12 text-center">{todo.description}</p>
                  <p className="w-2/12 text-center">
                    {todo.isCompleted ? "Completed" : "Pending"}
                  </p>
                </>
              )}

              <div className="w-2/12 flex justify-center gap-x-4">
                {editTodoId == todo._id ? (
                  <>
                    <button onClick={() => updateTodo(todo._id)}>
                      <SaveIcon />
                    </button>
                    <button onClick={handleCancleEdit}>
                      <CancelIcon />
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => {
                      if(window.confirm("Are you sure you want to delete this?")){
                        deleteTodo(todo._id);
                      }
                    }}>
                      <DeleteIcon />
                    </button>
                    <button onClick={() => handleEdit(todo)}>
                      <EditIcon />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        : ""}
    </>
  );
};

export default RenderTodos;
