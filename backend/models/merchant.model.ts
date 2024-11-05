import mongoose, { Document, Model, Schema } from "mongoose";
import BadRequestError from "../middleware/errorTypes/BadRequestError.js";
import * as argon2 from "argon2";
import { v4 as uuidV4} from "uuid";

// Define the document interface
interface IMerchant extends Document {
  createdAt: Date;
  updatedAt: Date;
  merchantName: string;
  uid: string;
  publicKey: string;
  hashedPwd: string;
}

// Define the model interface, including the static method `signup`
interface IMerchantModel extends Model<IMerchant> {
  signup(merchantName: string, merchantPassword: string): Promise<IMerchant>;
}

const merchantSchema = new Schema<IMerchant>({
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
		unique: true
	},
}, {
	timestamps: true
});

merchantSchema.statics.signup = async function(merchantName: string, merchantPassword: string) {
	const existingUser = await this.findOne({ merchantName });

	if (existingUser) {
		throw new BadRequestError({
			code: 400,
			message: "User already exists"
		})
	}
	
	// this returns 5 separate pieces separated by $
	// 1. type of argon used
	// 2. version
	// 3. parameters
	// 4. salt
	// 5. hashed password
	const pwdHash = await argon2.hash(merchantPassword);
	const newMerchant = await this.create({ merchantName, hashedPwd: pwdHash, uid: uuidV4(), publicKey: uuidV4() });

	return newMerchant;
}

const Merchant = mongoose.model<IMerchant, IMerchantModel>("Merchant", merchantSchema);

export default Merchant;