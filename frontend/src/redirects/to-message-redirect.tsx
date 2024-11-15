import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuthContext";
import Root from "@/routes/root/root";

const ToMessagesRedirect = () => {
	const { state } = useAuth();
	if (state.authUser) {
		return <Navigate to="/messengers" replace />
	}
	return <Root />;
}

export default ToMessagesRedirect;