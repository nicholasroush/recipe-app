import { NavLink } from "react-router-dom";
import "./homeNav.scss";

export const HomeNav = (): JSX.Element => {
	return (
		<div className='home-nav'>
			<NavLink to='featured' className='nav'>
				Featured
			</NavLink>
			<NavLink to='breakfast' className='nav'>
				Breakfast
			</NavLink>
			<NavLink to='lunch' className='nav'>
				Lunch
			</NavLink>
			<NavLink to='dinner' className='nav'>
				Dinner
			</NavLink>
		</div>
	);
};
