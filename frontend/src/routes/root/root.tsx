import "./root.styles.css";
import { useState } from "react";
import Signup from "@/components/signup";
import Login from "@/components/login";
import { Button } from "@chakra-ui/react";
import LogoutButton from "@/components/logout-button";

const Root = () => {
	const [hasAccount, setHasAccount] = useState<boolean>(false);

	const handleToggleLoginType = () => {
		setHasAccount(!hasAccount);
	};

	return (
		<div className="App">
			<header className="App-header">
				<h1>Sign-In</h1>
				<LogoutButton />
			</header>
			<section>
				
				<div className="sign-in-form">
					<h2>Please sign up with a username and password</h2>
					{hasAccount ? <Login /> : <Signup />}
				</div>
				<div className="info-container">
					<p>
						{hasAccount
							? "If you don't have an account yet, click the button below to sign up"
							: "If you already have account, click the button below to log in"}
					</p>
					<Button variant={"surface"} onClick={() => handleToggleLoginType()}>{`Click Here to ${
						hasAccount ? "Sign Up" : "Log In"
					}`}</Button>
				</div>
			</section>
		</div>
	);
};

export default Root;
