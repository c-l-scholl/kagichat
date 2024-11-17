import { useState } from "react";
import useAuthContext from "@/hooks/useAuthContext";
import { AuthActionKind } from "@/utils/types";
// import useEncryption from "./useEncryptionContext";
import useDerive from "./useDerive";

const useSignup = () => {
	const [signupError, setSignupError] = useState(null);
	const [isSignupLoading, setisSignupLoading] = useState<boolean>(false);
	const { dispatch } = useAuthContext();
	// const { ec } = useEncryption();
	const deriveTools = useDerive();
 
	const signup = async (merchantName: string, merchantPassword: string) => {
		setisSignupLoading(true);
		setSignupError(null);

		const { publicKey, privateKey } = await deriveTools.genKeyPairFromPlain(merchantPassword);

		// console.log(publicKey);

		const response = await fetch("/api/merchants/signup", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({ merchantName, hashedPwd, publicKey }),
		});

		const jsonRes = await response.json();

		if (!response.ok) {
			setisSignupLoading(false);
			setSignupError(jsonRes.error);
		}

		if (response.ok) {
			// save current merchant (user)
			localStorage.setItem("merchant", JSON.stringify(jsonRes));

			// need to encrypt this later or make it part of the json token
			localStorage.setItem("privateKey", privateKey);

			// update auth context
			dispatch({ type: AuthActionKind.LOGIN, payload: jsonRes });

			setisSignupLoading(false);
		}
	};

	return { signup, isSignupLoading, error: signupError };
};

export default useSignup;
