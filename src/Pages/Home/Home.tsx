import "./home.scss";
import { HomeNav } from "../../Components/HomeNav/HomeNav";
import { Outlet } from "react-router-dom";

export const Home = (): JSX.Element => {
	return (
		<div className='home'>
			<HomeNav />
			<Outlet />
		</div>
	);
};
