import mongoose from "mongoose";

export default async function connectDB() {
  try {
    const MONGO_URI = process.env.MONGO_URI;

    await mongoose.connect(MONGO_URI, {
      dbName: "ecommerce",
    });
    console.log("BASE DE DATOS CONECTADA EXITOSAMENTE".green.bold.bgWhite);
  } catch (error) {
    console.log("[DB CONNECT]".error, `Error: ${error.message}`);
  }
}
