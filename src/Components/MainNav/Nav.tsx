import "./nav.scss";
import star from "../../Assets/star-solid.svg";
import { NavLink } from "react-router-dom";

export const Nav = (): JSX.Element => {
	return (
		<div className='nav-container'>
			<div className='favs-link'>
				<NavLink to='/favorites'>
					<img src={star} alt='Star' />
					<h4>Favorite Dishes</h4>
				</NavLink>
			</div>
		</div>
	);
};
