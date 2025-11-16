import mongoose from "mongoose";

export default async function connectDB() {
  try {
    const MONGO_URI = process.env.MONGO_URI;

    await mongoose.connect(MONGO_URI, {
      dbName: "ecommerce",
    });
    console.log("Base de datos conectada...");
  } catch (error) {
    console.log("Error:", error.message);
  }
}
