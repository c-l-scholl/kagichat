import elliptic from "elliptic";
import CryptoJS from "crypto-js";
import { useState } from "react";

const useEncryption = () => {
	const EC = elliptic.ec;
	const ec = new EC("p256");

	const [myPublicKey, setMyPublicKey] = useState<string>("");
	const [myPrivateKey, setMyPrivateKey] = useState<string>("");

	const gatherMyKeys = async (uid: string) => {
		const privateKey = localStorage.getItem("privateKey") ?? "";
		if (!privateKey) {
			console.log("No private key found in local storage");
		}
		setMyPrivateKey(privateKey);

		const res = await fetch(`/api/merchants/${uid}`);
		const data = (await res.json());
		console.log(data);
		setMyPublicKey(data);
	};

	const getRecipientPublicKey = async (recipientUid: string): Promise<string> => {
		const res = await fetch(`/api/merchant/${recipientUid}`);
		const recipientPublicKey = await res.json();
		return recipientPublicKey;
	};

	const deriveSharedSecret = (recipientPublicKey: string) => {
		const recipientKey = ec.keyFromPublic(recipientPublicKey, "hex");
		const senderKey = ec.keyFromPrivate(myPrivateKey);
		const sharedSecret = senderKey
			.derive(recipientKey.getPublic())
			.toString(16);
		return sharedSecret; // This is used as the AES key
	};

	const encryptMessage = (msg: string, secret: string): string => {
		return CryptoJS.AES.encrypt(msg, secret).toString();
	};

	const decryptMessage = (encryptedMsg: string, secret: string): string => {
		const msgAsBytes = CryptoJS.AES.decrypt(encryptedMsg, secret);
		return msgAsBytes.toString(CryptoJS.enc.Utf8);
	};

	const createMsgHash = (message: string): elliptic.BNInput => {
		return ec.hash().update(message).digest();
	}

	const getSignature = (msgHash: elliptic.BNInput): number[] => {
		const keyPair = ec.keyFromPrivate(myPrivateKey);
		return keyPair.sign(msgHash).toDER();
	}


	return {
		myPublicKey,
		myPrivateKey,
		getRecipientPublicKey,
		gatherMyKeys,
		deriveSharedSecret,
		encryptMessage,
		decryptMessage,
		createMsgHash,
		getSignature
	};
};

export default useEncryption;
