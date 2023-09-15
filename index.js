import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import userRouter from "./routes/userRoute.js";
import opinionPollRouter from "./routes/opinionPollRouter.js";

dotenv.config();
const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

app.use(express.json());

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    error: error,
    status: error.status || 500,
  });
});

app.use("/user", userRouter);
app.use("/opinion-poll", opinionPollRouter);

const start = async () => {
  try {
    const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/?retryWrites=true&w=majority`;

    await mongoose
      .connect(URI)
      .then(() => {
        console.log("Database Connected 😎");
      })
      .catch((err) => {
        console.log(err);
      });

    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
