const express=require('express');
const app=express();
const userRoute=require("../routes/userRoute")
const taskRoute=require("../routes/taskRoute")
const mongoose=require('mongoose');
const cors = require("cors");
PORT=3000
const bodyParser = require("body-parser");
app.use(bodyParser.json({ strict: false }));

app.use(cors());
app.use('/user',userRoute);
app.use('/task',taskRoute);
app.use(bodyParser.json({ strict: false }));

mongoose.connect('mongodb+srv://sahil:sahil123@cluster0.fkgux3h.mongodb.net/todoApp?retryWrites=true&w=majority&appName=Cluster0')
.then(
    app.listen(PORT,() => console.log(`Server running on port ${PORT}`))
).catch((error) => console.log(error));