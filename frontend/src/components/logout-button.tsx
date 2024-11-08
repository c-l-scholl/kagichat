import useLogout from "@/hooks/useLogout";
import { Button } from "@chakra-ui/react";
import "@/components/styles/logout-button.styles.css"

const LogoutButton = () => {
	const { logout } = useLogout();

	const handleLogout = () => {
		logout();
	}
	return (

		<Button className="logout-button" onClick={() => handleLogout()} variant={"outline"}>
			Logout
		</Button>
	)
}

export default LogoutButton;