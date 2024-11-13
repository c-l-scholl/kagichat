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

type MerchantType = {
	merchantName: string;
	publicKey: string;
	uid: string;
	createdAt: string;
	// do not include password here
};

type MessageType = {
	_id: string;
	encryptedText: string;
	receiverUid: string;
	senderUid: string;
	signature: string;
	senderPublicKey: string;
	createdAt: string;
};

type DisplayMessageType = {
	_id: string;
	text: string;
	senderUid: string;
	createdAt: string;

}

export type { AuthUser, AuthState, AuthAction, MerchantType, MessageType, DisplayMessageType };

export { AuthActionKind };