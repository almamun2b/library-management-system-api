import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { MONGODB_URL, PORT } from "./config";

let server: Server;

async function main() {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("MongoDB Database connected");

    server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server error:", error);
  }
}

main();
