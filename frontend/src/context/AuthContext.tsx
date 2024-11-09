import { createContext, ReactNode, useEffect, useReducer } from "react";
import { AuthState, AuthAction, AuthActionKind } from "@/utils/types";

interface IAuthContext {
	state: AuthState;
	dispatch: React.Dispatch<AuthAction>;
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

	useEffect(() => {
		const storedMerchant: string = localStorage.getItem("merchant") ?? "";
		if (!storedMerchant) {
			return
		}
		const authUser = JSON.parse(storedMerchant);
		if (authUser) {
			dispatch({ type: AuthActionKind.LOGIN, payload: authUser })
		}
	}, []);

	console.log("AuthContext state: ", state);

	return (
		<AuthContext.Provider value={ {state, dispatch} }>
			{ children }
		</AuthContext.Provider>
	);

}



export { AuthContext, AuthContextProvider };

