import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './routes/root.tsx';
import ErrorPage from './error-page.tsx';
import MessengersPage from './routes/messengers-page.tsx';
import AboutPage from './routes/about-page.tsx';

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
    <RouterProvider router={router} />
  </StrictMode>,
)
