import express from "express";
import {
	deleteMerchant,
	getMerchantByID,
	getMerchants,
	updateMerchant,
	createMerchant
} from "../controller/merchant.controller.js";

const router = express.Router();
/**
 * Get merchant details.
 */
router.get("/", getMerchants);

/**
 * Get a specific merchant
 */
router.get("/:id", getMerchantByID);

/**
 * Create merchant details for signup.
 */
router.post("/signup", createMerchant);

/**
 * Login Merchant
 */
router.post("/login", )

/**
 * Update merchant details.
 */
router.put("/:id", updateMerchant);

/**
 * Delete a merchant.
 */
router.delete("/:id", deleteMerchant);

export default router;
