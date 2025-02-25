const Task = require("../models/taskModel");
const User = require("../models/userModel");

const createTask = async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const isCompleted = req.body.isCompleted;

  const isPresent = await Task.findOne({
    title,
    description,
    isCompleted,
  });

  const user=await User.findOne({username:req.username})
  if(!user){
    console.log(false+" failed to find the user with username :"+req.username)
  }
 
  if (!isPresent) {
    const newTask = await Task.create({
      title,
      description,
      isCompleted,
      user:user._id
    });

    if (!newTask) {
      return res.status(200).json({
        message: "Failled to Created Task",
        sucess: false,
      });
    }
    res.status(200).json({
      message: "Task Created Sucessfully",
      sucess: true,
      task: newTask,
    });
  }
};

const displayTask = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.username });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const tasks = await Task.find({ user: user._id });

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({
        message: "No tasks found for this user",
        success: false,
        tasks: [],
      });
    }

    res.json({
      tasks, 
      success: true,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching tasks",
      success: false,
      error: error.message,
      tasks: [], 
    });
  }
};



const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedTask) {
    return res.status(404).json({
      message: "Task not found",
      success: false,
    });
  }
  res.json({ message: "Task updated", task: updatedTask, success: true });
};

const deleteTask = async (req, res) => {
  console.log("Received DELETE request for taskId:", req.params.taskId);
  const { taskId } = req.params;

  const deletedTask = await Task.findByIdAndDelete(taskId);
  
  if (!deletedTask) {
      return res.status(404).json({
          message: "Task not found",
          success: false,
      });
  }
  res.json({ message: "Task deleted", task: deletedTask, success: true });
};

module.exports = {
  createTask,
  displayTask,
  updateTask,
  deleteTask
};
