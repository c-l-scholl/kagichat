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
		const data = (await res.json()) as MerchantType;
		// console.log(data);
		setMyPublicKey(data.publicKey);
		return { privateKey: privateKey, publicKey: data.publicKey };
	};

	const getRecipientPublicKey = async (recipientUid: string): Promise<string> => {
		const res = await fetch(`/api/merchants/${recipientUid}`);
		const merchant = await res.json() as MerchantType;
		return merchant.publicKey;
	};

	const deriveSharedSecret = async (myUid: string, recipientUid: string) => {
		try {	
			const { privateKey } = await gatherMyKeys(myUid);

			const res = await fetch(`/api/merchants/${recipientUid}`);
			const merchant = await res.json() as MerchantType;
			
			if (!merchant || !merchant.publicKey) {
				throw new Error("Recipient public key not found");
			}
			const recipientKey = ec.keyFromPublic(merchant.publicKey, "hex");
			if (!recipientKey.validate()) {
				throw new Error("No recipient key found while trying DH");
			}
			const myKeyPair = ec.keyFromPrivate(privateKey);
			if (!myKeyPair) {
				throw new Error("No sender key found while trying DH");
			}

			if (!privateKey) {
				throw new Error("cannot find my private key");
			}

			const derivableRecipPublicKey = recipientKey.getPublic();
			if (!derivableRecipPublicKey) {
				throw new Error("cannot derive recipient public key");
			}
			
			const sharedSecret = myKeyPair
				.derive(derivableRecipPublicKey)
				.toString(16);
			if (!sharedSecret) {
				throw new Error("unable to derive shared secret")
			}
			return sharedSecret; // This is used as the AES key
		} catch (err) {
			console.error("error deriving shared secret", err);
			throw err;
		}
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
