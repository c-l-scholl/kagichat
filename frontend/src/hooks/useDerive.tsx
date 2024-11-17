import useEncryption from "./useEncryptionContext";
// import argon2 from "argon2-browser";

const useDerive = () => {
	const { ec } = useEncryption();

	const genKeyPairFromPlain = async (hashedPwd: string) => {
		// const hashedPwd = await argon2.hash(password);
		const keyPair = ec.keyFromPrivate(hashedPwd);
		const publicKey = keyPair.getPublic("hex");
		const privateKey = keyPair.getPrivate("hex");

		return { publicKey, privateKey };
	}

	return { genKeyPairFromPlain };
};

export default useDerive;
