import mongoose from "mongoose";
import logger from "../logger.js";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ToDoAppTypescript", {
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    // console.log("MongoDB connected");
    logger.info("MongoDB connected");
  } catch (error) {
    // console.error(error);
    logger.error("Failed to connect to MongoDB", error);
    throw error;
  }
};

export default connectDB;
