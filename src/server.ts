/* eslint-disable no-console */

import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";
import { envVars } from "./app/config/env";
import mongoose from "mongoose";
import { Server } from "http";
import app from "./app";

let server: Server;

// Starting The Server
const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);
    console.log("DB is connected!!!");

    server = app.listen(envVars.PORT, () => {
      console.log(`Server is listening on port ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

// Run The Server & Super Admin
(async () => {
  await startServer();
  await seedSuperAdmin();
})();

// Unhandled Rejection Error
process.on("unhandledRejection", (err) => {
  console.log(
    "Unhandled Rejection Error Detected. Server Shutting Down!!!",
    err,
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
    err,
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
