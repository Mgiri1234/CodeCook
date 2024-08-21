import mongoose from "mongoose";



const connectDB = async () => {
    const uri = process.env.MONGODB_URI;
    try {
        const connectionInstance = await mongoose.connect(`${uri}`);
        console.log(`Connected to the database at host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        process.exit(1); // Exit process with failure
    }
}


export default connectDB;