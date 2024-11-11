import express, { NextFunction, Request, Response } from "express";
import BadRequestError from "../middleware/errorTypes/BadRequestError.js";
import { v4 as uuidV4 } from "uuid";
import Merchant from "../models/merchant.model.js";
import { MerchantType } from "../utils/types.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const createToken = (_id: string) => {
	const tokenSecret: string = process.env.SECRET || "";
	if (!tokenSecret) {
		throw new BadRequestError({
			code: 500,
			message: "JWT secret is invalid",
		});
	}
	return jwt.sign({ _id }, tokenSecret, { expiresIn: "3d" });
};

const getMerchants = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		if (req.query.limit && typeof req.query.limit == "string") {
			const queryLimit: number = parseInt(req.query.limit);

			if (
				isNaN(queryLimit) ||
				queryLimit <= 0 ||
				queryLimit > Number.MAX_SAFE_INTEGER
			) {
				throw new BadRequestError({
					code: 400,
					message: `Please enter a positive number for the limit`,
				});
			}
			const merchantsLimit = await Merchant.find({}).limit(queryLimit);
			res.status(200).json(merchantsLimit);
			return;
		}
		const merchants = await Merchant.find({});
		res.status(200).json(merchants);
	} catch (err) {
		console.error("Error querying data:", err);
		next(err);
	}
};

/**
 * Get a specific merchant
 *
 * @route GET api/merchants/:id
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @throws {BadRequestError} If the merchant with the specified ID is not found
 */
const getMerchantByID = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const _id: string = req.params.id;
		if (!mongoose.Types.ObjectId.isValid(_id)) {
			throw new BadRequestError({
				code: 400,
				message: `Invalid Product Id of ${_id}`,
			});
		}
		const foundMerchant = await Merchant.findById(_id);
		res.status(200).json(foundMerchant);
	} catch (err) {
		console.error("Error querying data:", err);
		next(err);
	}
};

/**
 * Create merchant details for signup.
 *
 * @route POST api/merchants
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @throws {BadRequestError} If the merchant with the specified ID is not found
 */
const signUpNewMerchant = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userInput = req.body;

		if (!userInput.merchantName || !userInput.merchantPassword) {
			throw new BadRequestError({
				code: 400,
				message: `Please provide all necessary fields`,
			});
		}
		const signupMerchant = await Merchant.signup(
			userInput.merchantName,
			userInput.merchantPassword
		);

		const token: string = createToken(signupMerchant.uid);

		// const newMerchant: MerchantType = {
		// 	merchantName: signupMerchant.merchantName,
		// 	hashedPwd: signupMerchant.hashedPwd,
		// 	uid: signupMerchant.uid,
		// 	publicKey: signupMerchant.publicKey, // TODO: generate public key
		// };

		// TODO: GENERATE PRIVATE KEY

		const newMongoMerchant = new Merchant(signupMerchant);

		await newMongoMerchant.save();
		res.status(201).json({
			message: `User with id '${newMongoMerchant.uid}' was created successfully`,
			token,
		});
	} catch (err) {
		console.error("Error querying data:", err);
		next(err);
	}
};

const loginMerchant = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userInput = req.body;
	try {
		if (!userInput.merchantName || !userInput.merchantPassword) {
			throw new BadRequestError({
				code: 400,
				message: `Please provide all necessary fields`,
			});
		}
		const merchantToLogin = await Merchant.login(
			userInput.merchantName,
			userInput.merchantPassword
		);
		const token: string = createToken(merchantToLogin.uid);
		res.status(200).json({
			message: `User with id '${merchantToLogin.uid}' was logged in successfully`,
			token,
		});
	} catch (err) {
		console.error("Error querying data:", err);
		next(err);
	}
};

/**
 * Update merchant details.
 *
 * @route PUT api/merchants/:id
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @throws {BadRequestError} If the merchant with the specified ID is not found
 */
const updateMerchant = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const _id = req.params.id;
	const userInput = req.body;
	if (!mongoose.Types.ObjectId.isValid(_id)) {
		throw new BadRequestError({
			code: 400,
			message: `Invalid Product Id of ${_id}`,
		});
	}
	try {
		await Merchant.findByIdAndUpdate(_id, userInput, { new: true });
		res
			.status(200)
			.json({ message: `User with id '${_id}' was updated successfully` });
	} catch (err) {
		console.error("Error querying data:", err);
		next(err);
	}
};

/**
 * Delete a merchant.
 *
 * @route DELETE api/merchants/:id
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @throws {BadRequestError} If the merchant with the specified ID is not found
 */
const deleteMerchant = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const _id = req.params.id;
	if (!mongoose.Types.ObjectId.isValid(_id)) {
		throw new BadRequestError({
			code: 400,
			message: `Invalid Product Id of ${_id}`,
		});
	}
	try {
		await Merchant.findByIdAndDelete(_id);
		res
			.status(200)
			.json({ message: `User with id of '${_id}' was deleted successfully` });
	} catch (err) {
		console.error("Error querying data:", err);
		next(err);
	}
};

export {
	getMerchants,
	getMerchantByID,
	signUpNewMerchant,
	updateMerchant,
	deleteMerchant,
	loginMerchant,
};
