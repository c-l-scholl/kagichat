import mongoose from "mongoose";

const merchantSchema = new mongoose.Schema({
	merchantName: {
		type: String,
		required: true,
	}, 
	uid: {
		type: String,
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

const Merchant = mongoose.model("Merchant", merchantSchema);

export default Merchant;