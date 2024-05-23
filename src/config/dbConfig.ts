import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI!);
        const connections = connectionInstance.connection;

        connections.on("connected", () => {
            console.log("MongoDB connected successfully", connections.host);
        });

        connections.on("error", (err) => {
            console.error("MongoDB connection error:", err);
            process.exit(1);
        });
    } catch (error) {
        console.error("Error while connecting to database:", error);
        process.exit(1);
    }
};


export default connectDb;
