const express=require('express');
const router=express.Router();
const userMiddleware=require("../middleware/userMiddleware")
const {createTask, displayTask,updateTask,deleteTask}=require("../controllers/taskControl")

router.post('/',userMiddleware,createTask)
router.get('/',userMiddleware,displayTask)
router.patch('/:taskId', userMiddleware, updateTask);
router.delete('/:taskId', userMiddleware, deleteTask);


module.exports=router;