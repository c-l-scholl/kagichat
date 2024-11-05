import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorPage = () => {
	const err = useRouteError();
	console.error(err);

	return (
		<div id="error-page">
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>
					{isRouteErrorResponse(err)
						? err.data?.message || err.statusText
						: "Unknown Error Message"}
				</i>
			</p>
		</div>
	);
};

export default ErrorPage;
