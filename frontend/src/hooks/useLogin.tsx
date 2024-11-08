import { useState } from "react";
import useAuthContext from "@/hooks/useAuthContext";
import { AuthActionKind } from "@/utils/types";

const useLogin = () => {
	const [loginError, setLoginError] = useState(null);
	const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);
	const { dispatch } = useAuthContext();

	const login = async (merchantName: string, merchantPassword: string) => {
		setIsLoginLoading(true);
		setLoginError(null);

		const response = await fetch("/api/merchants/login", {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({ merchantName, merchantPassword })
		})

		const jsonRes = await response.json();

		if (!response.ok) {
			setIsLoginLoading(false);
			setLoginError(jsonRes.error);
		}

		if (response.ok) {

			// save current merchant (user)
			localStorage.setItem("merchant", JSON.stringify(jsonRes));

			// update auth context
			dispatch({ type: AuthActionKind.LOGIN, payload: jsonRes });

			setIsLoginLoading(false);
		}
	}

	return { login, isLoginLoading, error: loginError };

}

export default useLogin;