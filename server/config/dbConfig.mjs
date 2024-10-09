import mongoose from "mongoose";

const connect = mongoose.connect('mongodb://localhost:27017/react-user'); //creating connect with database

//checking db connected or not
connect
.then(() => {
    console.log("Database connected successfully");
})
.catch(() => {
    console.log("Database cannot be connected");
})

export default connect
