import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import BadRequestError from "./errorTypes/BadRequestError.js";
import dotenv from "dotenv";
import Merchant from "../models/merchant.model.js";
import "../types/express.d.js";

const requireAuth = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	// dotenv.config();

	const { authorization } = req.headers;
	console.log("Hello", authorization);

	if (!authorization) {
		res.status(401).json({ error: "Authorization token required" });
		return;
	}

	const token: string = authorization.split(" ")[1];

	try {
		const storedSecret = process.env.SECRET ?? "";
		const decoded = jwt.verify(token, storedSecret) as JwtPayload;

		const merchantId: string = decoded._id;
		if (!merchantId) {
			throw new BadRequestError({
				code: 400,
				message: "Invalid authorization token",
			});
		}
		req.merchant = await Merchant.findOne({ uid: merchantId });
		if (!req.merchant) {
			res.status(404).json({ error: "merchant not found" });
			return;
		}
		next();
	} catch (err) {
		console.error(err);
		res.status(401).json({ error: "Request is not authorized" });
	}
};

export default requireAuth;
