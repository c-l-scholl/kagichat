import { Outlet } from "react-router-dom";
import "./main-layout.styles.css"
const MainLayout = () => {

	return (
		<div className="App">
			<Outlet />
		</div>
	)
}

export default MainLayout;