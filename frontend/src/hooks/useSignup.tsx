import { useState } from "react";
import useAuthContext from "@/hooks/useAuthContext";
import { AuthActionKind } from "@/utils/types";
import useEncryption from "./useEncryptionContext";
import useCookie from "./useCookie";
// import CryptoJS from "crypto-js";

const useSignup = () => {
	const [signupError, setSignupError] = useState(null);
	const [isSignupLoading, setisSignupLoading] = useState<boolean>(false);
	const { dispatch } = useAuthContext();
	const { ec } = useEncryption();
	const { setCookie, getCookie } = useCookie();
 
	const signup = async (merchantName: string, merchantPassword: string) => {
		setisSignupLoading(true);
		setSignupError(null);

		const keyPair = ec.genKeyPair();
		const publicKey = keyPair.getPublic("hex");
		const privateKey = keyPair.getPrivate("hex");

		const response = await fetch("/api/merchants/signup", {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify({ merchantName, merchantPassword, publicKey }),
		});

		const jsonRes = await response.json();

		if (!response.ok) {
			setisSignupLoading(false);
			setSignupError(jsonRes.error);
		}

		if (response.ok) {
			// save current merchant (user)
			localStorage.setItem("merchant", JSON.stringify(jsonRes));

			// need to encrypt this later 
			// const encPrivateKey = CryptoJS.AES.encrypt(privateKey, )
			setCookie(jsonRes.uid, privateKey, 100);
			console.log(getCookie(jsonRes.uid));
			
			// update auth context
			dispatch({ type: AuthActionKind.LOGIN, payload: jsonRes });

			setisSignupLoading(false);
		}
	};

	return { signup, isSignupLoading, error: signupError };
};

export default useSignup;
