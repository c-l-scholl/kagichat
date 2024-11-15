import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import ErrorPage from "./error-page";
import MessengersPage from "./routes/messengers/messengers-page";
import AboutPage from "./routes/about/about-page";
import "./index.css";
import MainLayout from "./layouts/main-layout/main-layout";
import ChatPage from "@/routes/chat/chat";
import ToMessagesRedirect from "./redirects/to-message-redirect";
import ProtectedRoute from "./components/protected-route";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<MainLayout />}>
			<Route
				path="/"
				element={<ToMessagesRedirect />}
				errorElement={<ErrorPage />}
			/>

			<Route
				path="/messengers"
				element={
					<ProtectedRoute>
						<MessengersPage />
					</ProtectedRoute>
				}
				errorElement={<ErrorPage />}
			/>

			<Route
				path="/:conversationId"
				element={
					<ProtectedRoute>
						<ChatPage />
					</ProtectedRoute>
				}
				errorElement={<ErrorPage />}
			/>
			<Route
				path="/about"
				element={<AboutPage />}
				errorElement={<ErrorPage />}
			/>
		</Route>
	)
);
const App = () => {
	return <RouterProvider router={router}></RouterProvider>;
};

export default App;
