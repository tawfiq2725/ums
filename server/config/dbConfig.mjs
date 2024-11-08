import mongoose from "mongoose";

const connect = mongoose.connect(
  "mongodb+srv://tawfiq:8xD1zgIa5oIVgXC2@mern-auth.kugzw.mongodb.net/My-app?retryWrites=true&w=majority&appName=Mern-auth"
); //creating connect with database

//checking db connected or not
connect
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch(() => {
    console.log("Database cannot be connected");
  });

export default connect;
