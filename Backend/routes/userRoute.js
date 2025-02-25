const express=require('express');
const router=express.Router();
const userMiddleware=require("../middleware/userMiddleware")
const { signUp,signIn,test}=require("../controllers/userControl")

router.post('/signup',signUp)
router.post('/signin',signIn)


module.exports=router;