import { Input, Button } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import useSignup from "@/hooks/useSignup";

const Signup = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const { signup, isSignupLoading, error } = useSignup();

	const signUserUp = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await signup(username, password);
	};

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
				<Button type="submit" variant={"solid"} disabled={isSignupLoading}>
					Sign Up
				</Button>
				{error && <div className="signup-error">{error}</div>}
			</form>
		</div>
	);
};

export default Signup;
