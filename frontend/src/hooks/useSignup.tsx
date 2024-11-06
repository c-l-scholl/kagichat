import { useState } from "react";
import useAuthContext from "@/hooks/useAuthContext";

const useSignup = () => {
	const [error, setError] = useState(null);
	const [isSignupLoading, setisSignupLoading] = useState<boolean>(false);
	const { dispatch } = useAuthContext();

	const signup = async (merchantName: string, merchantPassword: string) => {
		setisSignupLoading(true);
		setError(null);

		const response = await fetch("/api/merchants/signup", {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({ merchantName, merchantPassword })
		})

		const jsonRes = await response.json();

		if (!response.ok) {
			setisSignupLoading(false);
			setError(jsonRes.error);
		}

		if (response.ok) {

			// save current merchant (user)
			localStorage.setItem("merchant", JSON.stringify(jsonRes));

			// update auth context
			// TODO: FIXXX
			dispatch({ type: 'LOGIN', payload: jsonRes });

			setisSignupLoading(false);
		}
	}

	return { signup, isSignupLoading, error };

}

export default useSignup;