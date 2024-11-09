import express from "express";
import {
	deleteMerchant,
	getMerchantByID,
	getMerchants,
	updateMerchant,
	signUpNewMerchant,
	loginMerchant
} from "../controller/merchant.controller.js";

const router = express.Router();

// will only use in messages
// router.use(requireAuth);

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
router.post("/signup", signUpNewMerchant);

/**
 * Login Merchant
 */
router.post("/login", loginMerchant)

/**
 * Update merchant details.
 */
router.put("/:id", updateMerchant);

/**
 * Delete a merchant.
 */
router.delete("/:id", deleteMerchant);

export default router;
