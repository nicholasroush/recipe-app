import { Link } from "react-router-dom";
import "./pageNotFound.scss";
import img from "../../Assets/pagenotfound-img.png";

export const PageNotFound = (): JSX.Element => {
	return (
		<div className='notFound-page'>
			<div className='notFound-content'>
				<div className='notFound-text'>
					<p>Page Not Found</p>
					<Link to='/'>Home</Link>
				</div>
				<img src={img} alt='Page not found pig' />
			</div>
		</div>
	);
};
