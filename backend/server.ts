import express from "express";
import merchants from "./routes/merchant.route.js"; 
import messages from "./routes/message.route.js"
import dotenv from "dotenv";
import connectDB from "./config/db.js"
import notFound from "./middleware/notFound.js";
import logger from "./middleware/logger.js";

// Recommended by Mason Hu on Medium
// Link: https://medium.com/@xiaominghu19922/proper-error-handling-in-express-server-with-typescript-8cd4ffb67188
import "express-async-errors";
import errorHandler from "./middleware/errorHandler.js"

dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();


// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // for postman

// Logging middleware
app.use(logger);

// Routing
app.use("/api/merchants", merchants);
app.use("/api/messages", messages);

// Catch-all Not Found
app.use(notFound);

// Error Handling 
app.use(errorHandler);

app.listen(PORT, () => {
	connectDB();
	console.log(`Server is running on port ${PORT}`);
});


// 