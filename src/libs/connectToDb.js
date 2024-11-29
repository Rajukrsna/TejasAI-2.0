import Mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    console.log(process.env.MONGO_URI)
    await Mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb Connected");
  } catch (error) {
    console.log("Error connecting to mongodb", error);
  }
};
