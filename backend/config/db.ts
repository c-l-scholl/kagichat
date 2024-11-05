import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const connectDB = async () => {

	try {
		const mongoURI = process.env.MONGO_URI || "";
		const conn = await mongoose.connect(mongoURI);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (err) {
		console.error(err);

		// code 1 means failure
		process.exit(1);
	}
}

export default connectDB;