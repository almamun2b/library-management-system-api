import dotenv from "dotenv";

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 5000;
const MONGODB_URL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/lms-app";

export { MONGODB_URL, NODE_ENV, PORT };
