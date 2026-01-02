import mongoose from "mongoose";
import { Server } from "http";
import app from "./app.js";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/tour-management-server");
    console.log("DB is connected!!!");

    server = app.listen(5000, () => {
      console.log("Server is listening on port 5000");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

// Unhandled Rejection Error
process.on("unhandledRejection", (err) => {
  console.log(
    "Unhandled Rejection Error Detected. Server Shutting Down!!!",
    err
  );

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

// Uncaught Exception Error
process.on("uncaughtException", (err) => {
  console.log(
    "Uncaught Exception Error Detected. Server Shutting Down!!!",
    err
  );

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

// Signal Terminate Error
process.on("SIGTERM", () => {
  console.log("Signal Terminate Error Detected. Server Shutting Down!!!");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});
