type MerchantType = {
	uid: string;
	merchantName: string;
	publicKey: string;
	hashedPwd: string;
};

type MessageType = {
	conversationId: string;
	senderId: string;
	receiverId: string;
	signature: Buffer;
	encryptedText: string;
	createdAt: Date;
}



export { MerchantType, MessageType };