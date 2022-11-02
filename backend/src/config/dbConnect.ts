import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const dbConnect = () => {
  return mongoose.connect(process.env.MONGODB_URI as string);
};

export default dbConnect;
