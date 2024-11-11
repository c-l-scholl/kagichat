import mongoose, { Document, Model, Schema } from "mongoose";

// Define the document interface
interface IMessage extends Document {
  createdAt: Date;
  updatedAt: Date;
  senderId: string;
	receiverId: string,
	conversationId: string,
  encryptedText: string;
  //recipPublicKey: string;
	signature: Buffer;
}


// interface IMerchantModel extends Model<IMerchant> {
//   signup(merchantName: string, merchantPassword: string): Promise<IMerchant>;
//   login(merchantName: string, merchantPassword: string): Promise<IMerchant>;
// }

const messageSchema = new Schema<IMessage>({
	senderId: {
		type: String,
		required: true,
		unique: true,
	}, 
	receiverId: {
		type: String,
		required: true,
		unique: true,
	}, 
	conversationId: {
		type: String,
		required: true,
		unique: true,
	}, 
	encryptedText: {
		type: String,
		required: true,
		unique: true,
	},
	// recipPublicKey: {
	// 	type: String,
	// 	required: true,
	// 	unique: true,
	// },
	signature: {
		type: Buffer,
		required: true,
		unique: true
	},
}, {
	timestamps: true
});

const Message = mongoose.model("Message", messageSchema);

export default Message;