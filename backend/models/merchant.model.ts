import mongoose from "mongoose";

const merchantSchema = new mongoose.Schema({
	merchantName: {
		type: String,
		required: true,
	}, 
	uid: {
		type: Number,
		required: true,
	},
	publicKey: {
		type: String,
		required: true,
	},
	hashedPwd: {
		type: String,
		required: true,
	},
}, {
	timestamps: true
});

const merchant = mongoose.model("Merchant", merchantSchema);

export default merchant;