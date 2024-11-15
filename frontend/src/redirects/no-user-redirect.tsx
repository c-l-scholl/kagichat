import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuthContext";

const NoUserRedirect = (comp: JSX.Element) => {
	const { state } = useAuth();
	if (!state.authUser) {
		return <Navigate to="/" replace />
	}
	return comp;
}

export default NoUserRedirect;