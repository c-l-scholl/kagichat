import { Provider as ChakraProvider } from "@/components/ui/provider";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/root/root';
import ErrorPage from './error-page';
import MessengersPage from './routes/messengers/messengers-page';
import AboutPage from './routes/about/about-page';
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext";
import MainLayout from "./layouts/main-layout/main-layout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<MainLayout />}
    >
      <Route path="/" element={<Root/>} errorElement={<ErrorPage />} />
      <Route path="/messengers" element={<MessengersPage/>} errorElement={<ErrorPage />} />
      <Route path="/about" element={<AboutPage/>} errorElement={<ErrorPage />} />
    </Route>
  )
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </AuthContextProvider>
  </StrictMode>,
)
