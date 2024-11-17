import elliptic from "elliptic";
import CryptoJS from "crypto-js";
import { useState } from "react";
import useEncryption from "./useEncryptionContext";
import { MerchantType } from "@/utils/types";

const useKeys = () => {
	const { ec } = useEncryption();

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
		// console.log(data);
		setMyPublicKey(data);
	};

	const getRecipientPublicKey = async (recipientUid: string): Promise<string> => {
		const res = await fetch(`/api/merchants/${recipientUid}`);
		const merchant = await res.json() as MerchantType;
		return merchant.publicKey;
	};

	const deriveSharedSecret = async (recipientUid: string) => {
		const res = await fetch(`/api/merchants/${recipientUid}`);
		const merchant = await res.json() as MerchantType;
		// return merchant.publicKey;
		const recipientKey = ec.keyFromPublic(merchant.publicKey, "hex");
		if (!recipientKey) {
			console.log("No recipient key found while trying DH");
		}
		const myKeyPair = ec.keyFromPrivate(myPrivateKey);
		if (!myKeyPair) {
			console.log("No sender key found while trying DH");
		}
		
		const sharedSecret = myKeyPair
			.derive(recipientKey.getPublic())
			.toString(16);
		if (!sharedSecret) {
			console.log("unable to derive shared secret")
		}
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

export default useKeys;
