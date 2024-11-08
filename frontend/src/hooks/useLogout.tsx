import useAuth from "@/hooks/useAuthContext";
import { AuthActionKind } from "@/utils/types";
const useLogout = () => {
	const { dispatch } = useAuth();

	const logout = () => {
		// remove token from storage
		localStorage.removeItem("merchant");

		// remove from context
		dispatch({ type: AuthActionKind.LOGOUT, payload: null });
	}

	return { logout };
}

export default useLogout;