type MerchantType = {
	uid: string;
	merchantName: string;
	publicKey: string;
	hashedPwd: string;
};

type MessageType = {
	conversationId: string;
	senderUid: string;
	receiverUid: string;
	signature: Buffer;
	encryptedText: string;
	createdAt: Date;
}



export { MerchantType, MessageType };