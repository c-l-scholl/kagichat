type AuthUser = {
	uid: string;
	username: string;
}

type AuthState = {
	isAuthenticated: boolean;
	authUser: AuthUser | null;
}

enum AuthActionKind {
	LOGIN = "LOGIN",
	LOGOUT = "LOGOUT"
}

interface AuthAction {
	type: AuthActionKind;
	payload: AuthUser | null;
}

export type { AuthUser, AuthState, AuthAction };

export { AuthActionKind };