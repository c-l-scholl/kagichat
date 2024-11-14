import mongoose, { Document, Model, Schema } from "mongoose";
import BadRequestError from "../middleware/errorTypes/BadRequestError.js";
import * as argon2 from "argon2";
import { v4 as uuidV4 } from "uuid";

// Define the document interface
interface IMerchant extends Document {
	createdAt: Date;
	updatedAt: Date;
	merchantName: string;
	uid: string;
	publicKey: string;
	hashedPwd: string;
}

interface IMerchantModel extends Model<IMerchant> {
	signup(merchantName: string, merchantPassword: string, publicKey: string): Promise<IMerchant>;
	login(merchantName: string, merchantPassword: string): Promise<IMerchant>;
}

const merchantSchema = new Schema<IMerchant>(
	{
		merchantName: {
			type: String,
			required: true,
			unique: true,
		},
		uid: {
			type: String,
			required: true,
			unique: true,
		},
		publicKey: {
			type: String,
			required: true,
			unique: true,
		},
		hashedPwd: {
			type: String,
			required: true,
			unique: true,
		},
	},
	{
		timestamps: true,
	}
);

merchantSchema.statics.signup = async function (
	merchantName: string,
	merchantPassword: string,
	publicKey: string,
) {
	const existingUser = await this.findOne({ merchantName });
	console.log("this is my public key", publicKey);

	// validation
	if (!merchantName.trim() || !merchantPassword.trim() || !publicKey.trim()) {
		throw new BadRequestError({
			code: 400,
			message: "All fields must be filled",
		});
	}

	// normally would add validator checks for email and strong password

	// if (!validator.isStrongPassword(merchantPassword))

	if (existingUser) {
		throw new BadRequestError({
			code: 400,
			message: "Username already exists",
		});
	}

	// this returns 5 separate pieces separated by $
	// 1. type of argon used
	// 2. version
	// 3. parameters
	// 4. salt
	// 5. hashed password
	
	const pwdHash = await argon2.hash(merchantPassword);
	const newMerchant = await this.create({
		merchantName,
		hashedPwd: pwdHash,
		uid: uuidV4(),
		publicKey: publicKey,
	});

	return newMerchant;
};

merchantSchema.statics.login = async function (
	merchantName: string,
	merchantPassword: string,
) {
	// login needs to re-derive the private key

	if (!merchantName.trim() || !merchantPassword.trim()) {
		throw new BadRequestError({
			code: 400,
			message: "All fields must be filled",
		});
	}

	const merchant = await this.findOne({ merchantName });

	if (!merchant) {
		throw new BadRequestError({
			code: 400,
			message: "Incorrect username",
		});
	}

	const match = await argon2.verify(merchant.hashedPwd, merchantPassword);
	if (!match) {
		throw new BadRequestError({
			code: 400,
			message: "Incorrect Password",
		});
	}

	return merchant;
};

const Merchant = mongoose.model<IMerchant, IMerchantModel>(
	"Merchant",
	merchantSchema
);

export default Merchant;
