import mongoose from "mongoose";
const mongoUrl = process.env.MONGO_URL;
export const connectDb = async () => {
  try {
    if (mongoUrl) {
      await mongoose.connect(mongoUrl as string);
      console.log("Db connected successfully ✅");
    } else {
      console.error("Db connection failed ❗️");
      process.exitCode = 1;
    }
  } catch (error) {
    console.error(`Something went wrong while connecting database Error: ${error} `);
  }
};
