import { createContext } from "react";
import { ec as EC } from "elliptic";

interface IEncryptionContext {
	ec: EC;
}

const EncryptionContext = createContext<IEncryptionContext | null>(null);

interface EncryptionContextProviderProps {
	children: React.ReactNode
}

const EncryptionContextProvider = ({ children }: EncryptionContextProviderProps) => {
	
	const ec = new EC("curve25519");
	return (
		<EncryptionContext.Provider value={{ ec }}>
			{children}
		</EncryptionContext.Provider>
	)
}

export { EncryptionContext, EncryptionContextProvider };