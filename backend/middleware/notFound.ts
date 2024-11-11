import { Request, Response, NextFunction } from "express";
import BadRequestError from "./errorTypes/BadRequestError.js";

const notFound = ((req: Request, res: Response, next: NextFunction) => {
	throw new BadRequestError({ code: 404, message: "Not Found" });
	next();
});

export default notFound;