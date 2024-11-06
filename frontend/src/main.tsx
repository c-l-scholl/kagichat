import { Provider as ChakraProvider } from "@/components/ui/provider";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/root/root';
import ErrorPage from './error-page';
import MessengersPage from './routes/messengers/messengers-page';
import AboutPage from './routes/about/about-page';
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext";

const router = createBrowserRouter([
  { 
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />
  },
  {
    path: "/messengers",
    element: <MessengersPage />
  },
  {
    path: "/about",
    element: <AboutPage />
  },

])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </AuthContextProvider>
  </StrictMode>,
)
