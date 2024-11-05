import { Request, Response, NextFunction } from "express";
import { CustomError } from "./errorTypes/CustomError";

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
	if (err.status) {
		res.status(err.status).json({ msg: err.message });
	} else {
		res.status(500).json({ msg: `No user was not found`})
	}
}


export default errorHandler;