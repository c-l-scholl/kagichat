import { Request, Response, NextFunction } from "express";
import { CustomError } from "./errorTypes/CustomError.js";

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
	if (err.status) {
		res.status(err.status).json({ message: err.message });
	} else {
		res.status(500).json({ message: `No user was not found`})
	}
}


export default errorHandler;