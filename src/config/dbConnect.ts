import mongoose from "mongoose";

const dbConnect = async () => {
  const dbUri = process.env.MONGODB_URI;

  if (!dbUri) {
    console.error("Error: MongoDB URI is missing.");
    process.exit(1);
  }

  try {
    await mongoose.connect(dbUri)

    mongoose.connection.on("connected", () => {
      console.log("Database connected successfully.");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Error connecting to database:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Database disconnected.");
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};

export default dbConnect;
