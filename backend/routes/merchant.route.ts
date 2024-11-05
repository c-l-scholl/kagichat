import express, { NextFunction, Request, Response } from "express";
import BadRequestError from "../middleware/errorTypes/BadRequestError.ts";
import { v4 as uuidV4 } from "uuid";
import Merchant from "../models/merchant.model.ts"


const router = express.Router();


type MerchantType = {
	uid: string;
	merchantName: string;
	publicKey: string;
	hashedPwd: string;
};


/**
 * Get merchant details.
 * 
 * @route GET api/merchants/
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @throws {BadRequestError} If the limit is not a number
 */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {

	try {
		if (req.query.limit && typeof req.query.limit == "string") {
			const queryLimit: number = parseInt(req.query.limit);

			if (isNaN(queryLimit) || queryLimit <= 0 || queryLimit > Number.MAX_SAFE_INTEGER) {
				throw new BadRequestError({
					code: 400,
					message: `Please enter a positive number for the limit`,
				});
			}
			const merchantsLimit = await Merchant.find({}).limit(queryLimit);
			return res.status(200).json(merchantsLimit);
		}
		const merchants = await Merchant.find({});
		res.status(200).json(merchants);
	} catch (err) {
		console.error("Error querying data:", err);
		next(err);
	}
});

/**
 * Get a specific merchant 
 * 
 * @route GET api/merchants/:id
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @throws {BadRequestError} If the merchant with the specified ID is not found
 */
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const uid: string = req.params.id;
		
		const foundMerchant = await Merchant.findById(uid);
		res.status(200).json(foundMerchant);
	} catch (err) {
		console.error("Error querying data:", err);
		next(err);
	}
});

/**
 * Create merchant details.
 * 
 * @route POST api/merchants
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @throws {BadRequestError} If the merchant with the specified ID is not found
 */
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
	const userInput = req.body;
	
	if (!userInput.merchantName || !userInput.merchantPassword) {
		throw new BadRequestError({
			code: 400,
			message: `Please provide all necessary fields`
		});
	}

	const newMerchant: MerchantType = {
		merchantName: userInput.merchantName,
		hashedPwd: userInput.merchantPassword, // TODO: HASH THE PASSWORD
		uid: uuidV4(),
		publicKey: "wow", // TODO: generate public key
	}

	// TODO: GENERATE PRIVATE KEY

	const newMongoMerchant = new Merchant(newMerchant);

	try {
		await newMongoMerchant.save();
		res.status(201).json({ message: `User with id '${newMongoMerchant.uid}' was created successfully` });
	} catch (err) {
		console.error("Error querying data:", err);
		next(err);
	}
});

/**
 * Update merchant details.
 * 
 * @route PUT api/merchants/:id
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @throws {BadRequestError} If the merchant with the specified ID is not found
 */
router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
	const uid = req.params.id;
	const userInput = req.body;
	try {
		await Merchant.findByIdAndUpdate(uid, userInput, {new: true});
		res.status(200).json({ message: `User with id '${uid}' was updated successfully` });
	} catch (err) {
		console.error("Error querying data:", err);
		next(err);
	}
});

/**
 * Delete a merchant.
 * 
 * @route DELETE api/merchants/:id
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @throws {BadRequestError} If the merchant with the specified ID is not found
 */
router.delete("/:id",	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const uid = req.params.id;
			await Merchant.findByIdAndDelete(uid);
			res.status(200).json({ message: `User with id of '${uid}' was deleted successfully` });
		} catch (err) {
			console.error("Error querying data:", err);
			next(err);
		}
	}
);

export default router;
