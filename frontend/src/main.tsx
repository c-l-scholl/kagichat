import { Provider as ChakraProvider } from "@/components/ui/provider";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./App";
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
// } from "react-router-dom";
// import Root from './routes/root/root';
// import ErrorPage from './error-page';
// import MessengersPage from './routes/messengers/messengers-page';
// import AboutPage from './routes/about/about-page';
// import "./index.css";
import { AuthContextProvider } from "./context/AuthContext";
// import MainLayout from "./layouts/main-layout/main-layout";
// import ChatPage from "@/routes/chat/chat";
// import noUserRedirect from "./redirects/no-user-redirect";
// import ToMessagesRedirect from "./redirects/to-message-redirect";


// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route
//       element={<MainLayout />}
//     >
//       <Route path="/" element={<Root/>} errorElement={<ErrorPage />} loader={ToMessagesRedirect} />
//       <Route path="/messengers" element={<MessengersPage/>} errorElement={<ErrorPage />} loader={noUserRedirect} />
//       <Route path="/about" element={<AboutPage/>} errorElement={<ErrorPage />} />
//       <Route path="/:conversationId" element={<ChatPage />} errorElement={<ErrorPage />} loader={noUserRedirect} />
//     </Route>
//   )
// )

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </AuthContextProvider>
  </StrictMode>,
)
