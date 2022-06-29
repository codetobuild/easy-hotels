import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import paymentRoute from "./routes/paymentRoute";

import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

dotenv.config();
const app = express();
    
const originURL = process.env.ORIGIN_URL;
const localHostURL = process.env.LOCAL_HOST_URL;
var corsOptions = {
  origin: [localHostURL, originURL],
  optionsSuccessStatus: 200, // For legacy browser support
};

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
// app.use(cors());
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan("tiny"));
// app.use((req, res, next) => {
//   const uu = req.get("host") + req.originalUrl;
//   console.log("request :", uu);
//   next();
// });

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/payment", paymentRoute);

// HANDLE ERRORS
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connect();
  console.log(`Connected to backend at port: ${PORT}`);
});
