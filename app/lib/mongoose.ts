import mongoose from "mongoose";

const MONGO_URI = process.env.NEXT_PUBLIC_MONGO_URI as string;
const ERR_MSG = "Failed to connect to MongoDb";

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    await mongoose.connect(MONGO_URI);
  } catch (error) {
    throw new Error(
      `MongoDB connection failed: ${(error as any)?.message || ERR_MSG}`
    );
  }
};

export default connectDB;
