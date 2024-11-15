import useAuth from "@/hooks/useAuthContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
	children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const { state } = useAuth();

	if (!state.authUser) {
		return <Navigate to="/" replace />
	}

	return (
		<>{children}</>
	)
}

export default ProtectedRoute;