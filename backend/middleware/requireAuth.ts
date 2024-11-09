import { Request, Response, NextFunction, response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import BadRequestError from "./errorTypes/BadRequestError";
import dotenv from "dotenv";
import Merchant from "../models/merchant.model"


const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

	// dotenv.config();

	const { authorization } = req.headers;
	
	if (!authorization) {
		res.status(401).json({ error: "Authorization token required" });
		return;
	}

	const token: string = authorization.split(" ")[1];

	try {
		const storedSecret = process.env.SECRET ?? "";
		const decoded = jwt.verify(token, storedSecret) as JwtPayload;

		const merchantId = decoded.id;
		if (!merchantId) {
			throw new BadRequestError({ 
				code: 400,
				message: "Invalid authorization token"
			})
		}



		req.merchant = await Merchant.findOne({ _id: merchantId });
		if (!req.merchant) {
			res.status(404).json({ error: "merchant not found" });
			return;
		}
		next();
	} catch (err) {
		console.error(err);
		res.status(401).json({ error: "Request is not authorized" });
	}

}

export default requireAuth;