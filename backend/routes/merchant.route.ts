import express from "express";
import {
	deleteMerchant,
	getMerchantByID,
	getMerchants,
	updateMerchant,
} from "../controller/merchant.controller.js";

const router = express.Router();

/**
 * Get merchant details.
 *
 * @route GET api/merchants/
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @throws {BadRequestError} If the limit is not a number
 */
router.get("/", getMerchants);

/**
 * Get a specific merchant
 *
 * @route GET api/merchants/:id
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @throws {BadRequestError} If the merchant with the specified ID is not found
 */
router.get("/:id", getMerchantByID);

/**
 * Create merchant details.
 *
 * @route POST api/merchants
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @throws {BadRequestError} If the merchant with the specified ID is not found
 */
router.post("/", updateMerchant);

/**
 * Update merchant details.
 *
 * @route PUT api/merchants/:id
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @throws {BadRequestError} If the merchant with the specified ID is not found
 */
router.put("/:id", updateMerchant);

/**
 * Delete a merchant.
 *
 * @route DELETE api/merchants/:id
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @throws {BadRequestError} If the merchant with the specified ID is not found
 */
router.delete("/:id", deleteMerchant);

export default router;
