import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import Collection from "./models/userModel.mjs"; // Ensure the correct path
import "./config/dbConfig.mjs"; // Ensure the correct path
import userRouter from "./routes/userRoutes.mjs";
import adminRouter from "./routes/adminRoutes.mjs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

app.use(express.static("public"));

// Body parser middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8001");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(cors());

app.use("/user", userRouter);
app.use("/admin", adminRouter);

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server is running on PORT-${PORT}`);
});
