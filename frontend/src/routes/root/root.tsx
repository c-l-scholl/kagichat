import "./root.styles.css";
import { useState } from "react";
import { Input, Button } from "@chakra-ui/react";

const Root = () => {
	const [username, setUsername] = useState<string>();
	const [password, setPassword] = useState<string>();

	const signIn = () => {
		
	};

	return (
		<div className="App">
			<header className="App-header">
				<h1>Sign-In</h1>
			</header>

			<section>
				<div className="info-container">
					<h2>Please enter your username and password</h2>
					<p>
						If you have already created an account, please enter your account
						information. Otherwise, please enter a valid username and password
						to create your account.
					</p>
				</div>
				<div className="sign-in-form">
					<form onSubmit={signIn}>
						<Input
							variant={"subtle"}
							placeholder="Enter your username"
							value={username}
							onChange={(event) => setUsername(event.target.value)}
						/>
						<Input
							variant={"subtle"}
							placeholder="Enter your password"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
						/>
						<Button type="submit" variant={"solid"}>
							Sign-In
						</Button>
					</form>
				</div>
			</section>
		</div>
	);
};

export default Root;
