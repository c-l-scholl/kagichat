import { Input, Button } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import useLogin from "@/hooks/useLogin";


const Login = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const { login, isLoginLoading, error } = useLogin();

	const logUserIn = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await login(username, password);
	}

	return (
		<div className="sign-in-form">
			<form onSubmit={logUserIn}>
				<h3>Login</h3>

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
				<Button type="submit" variant={"solid"} disabled={isLoginLoading}>
					Log In
				</Button>
				{error && <div className="sign-up-error">{error}</div>}
			</form>
		</div>
	);
};

export default Login;
