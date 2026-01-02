import mongoose from "mongoose";
import app from "./app.js";

const startServer = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/tour-management-server");
    console.log("DB is connected!!!");

    app.listen(5000, () => {
      console.log("Server is listening on port 5000");
    });
  } catch (error) {
    console.log(error);
  }
};


startServer();
