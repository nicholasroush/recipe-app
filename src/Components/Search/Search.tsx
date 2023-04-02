import "./search.scss";
import search from "../../Assets/magnifying-glass.png";
import logo from "../../Assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

interface IProps {
	searchInput: string;
	setSearchInput: React.Dispatch<React.SetStateAction<string>>;
	handleSearch: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Search = ({
	searchInput,
	setSearchInput,
	handleSearch,
}: IProps): JSX.Element => {
	const [isDisabled, setIsDisabled] = useState(true);
	const navigate = useNavigate();

	const handleNavigate = () => {
		navigate(`/search/${searchInput}`);
	};

	return (
		<div className='search-main'>
			<div className='search-bg'></div>
			<div className='hero-container'>
				<div className='logo-container'>
					<Link to={"/"}>
						<img src={logo} alt='logo' />
					</Link>
				</div>
				<div className='search-bar'>
					<button
						onClick={() => {
							handleNavigate();
							setSearchInput("");
						}}
						disabled={isDisabled}
					>
						<div className='img-container'>
							<img src={search} alt='Search' />
						</div>
					</button>
					<input
						value={searchInput}
						onChange={(e) => {
							setIsDisabled(false);
							setSearchInput(e.target.value);
						}}
						onKeyDown={handleSearch}
						placeholder='Search Food or Dish'
					/>
				</div>
			</div>
		</div>
	);
};
