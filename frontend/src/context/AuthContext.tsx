import { createContext, ReactNode, useReducer } from "react";

type AuthUser = {
	uid: string;
	username: string;
}

type AuthState = {
	isAuthenticated: boolean;
	authUser: AuthUser | null;
}

interface IAuthContext {
	state: AuthState;
	dispatch: React.Dispatch<AuthAction>;
}

enum AuthActionKind {
	LOGIN = "LOGIN",
	LOGOUT = "LOGOUT"
}

interface AuthAction {
	type: AuthActionKind;
	payload: AuthUser;
}

const initialState: AuthState = {
	isAuthenticated: false,
	authUser: null
}


const authReducer: React.Reducer<AuthState, AuthAction> = (state, action) => {
	switch (action.type) {
		case AuthActionKind.LOGIN:
			return { 
				isAuthenticated: true,
				authUser: action.payload 
			}
		case AuthActionKind.LOGOUT:
			return { 
				isAuthenticated: false,
				authUser: null 
			}
		default:
			return state;
	}
}

interface AuthProviderProps {
	children: ReactNode;
}

const AuthContext = createContext<IAuthContext>({
	state: initialState,
	dispatch: () => {}
});

const AuthContextProvider = ({ children }: AuthProviderProps) => {
	const [state, dispatch] = useReducer(authReducer, initialState);

	console.log("AuthContext state: ", state);

	return (
		<AuthContext.Provider value={ {state, dispatch} }>
			{ children }
		</AuthContext.Provider>
	);

}



export { AuthContext, AuthContextProvider };

