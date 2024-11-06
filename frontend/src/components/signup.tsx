import { Input, Button } from "@chakra-ui/react";
import { FormEvent, useState } from "react";



const Signup = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const signUserUp = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

	}

	return (
		<div className="sign-in-form">
			<form onSubmit={signUserUp}>
				<h3>Sign Up</h3>

				<Input
					variant={"subtle"}
					placeholder="Enter your username"
					value={username}
					onChange={(event) => setUsername(event.target.value)}
				/>
				<Input
					variant={"subtle"}
					type="password"
					placeholder="Enter your password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
				/>
				<Button type="submit" variant={"solid"}>
					Sign Up
				</Button>
			</form>
		</div>
	);
};

export default Signup;
