import { Provider as ChakraProvider } from "@/components/ui/provider";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { EncryptionContextProvider } from "./context/EncryptionContext";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <EncryptionContextProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </EncryptionContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
