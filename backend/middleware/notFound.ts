import { Request, Response, NextFunction } from "express";
import BadRequestError from "./errorTypes/BadRequestError";

const notFound = ((req: Request, res: Response, next: NextFunction) => {
	throw new BadRequestError({ code: 404, message: "Not Found" });
});

export default notFound;