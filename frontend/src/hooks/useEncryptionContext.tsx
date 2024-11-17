import { useContext } from "react";
import { EncryptionContext } from "@/context/EncryptionContext";

const useEncryption = () => {
	const context = useContext(EncryptionContext);

	if (!context) {
		throw Error("useEncryption must be used in inside an AuthContextProvider");
	}

	return context;
}

export default useEncryption;