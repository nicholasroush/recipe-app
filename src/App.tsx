import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.scss";
import { Nav } from "./Components/MainNav/Nav";
import { Search } from "./Components/Search/Search";
import { Home } from "./Pages/Home/Home";
import { FindRecipe } from "./Pages/FindRecipe/FindRecipe";
import { useEffect, useState } from "react";
import { Favorites } from "./Pages/Favs/Favorites";
import { Featured } from "./Pages/Home/Featured/Featured";
import { Breakfast } from "./Pages/Home/Breakfast/Breakfast";
import { Lunch } from "./Pages/Home/Lunch/Lunch";
import { Dinner } from "./Pages/Home/Dinner/Dinner";
import { PageNotFound } from "./Pages/NotFound/PageNotFound";
import { useAppDispatch } from "./Utilities/Hooks/useDispatch";
import { useAppSelector } from "./Utilities/Hooks/useSelector";
import { fetchFeatured } from "./Utilities/Store/Slices/featuredRecipeSlice";
import { RootState } from "./Utilities/Store/Store";

function App() {
	const [searchInput, setSearchInput] = useState("");
	const nav = useNavigate();
	const dispatch = useAppDispatch();
	const featureData = useAppSelector(
		(state: RootState) => state.storeFeatured.data
	);

	const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			if (searchInput !== "") {
				nav(`/search/${searchInput.toLowerCase()}`);
				setSearchInput("");
			} else {
				alert("Please enter a food or dish.");
			}
		}
	};

	useEffect(() => {
		dispatch(fetchFeatured());
	}, [dispatch]);

	return (
		<div className='App'>
			<Nav />
			<Search
				searchInput={searchInput}
				setSearchInput={setSearchInput}
				handleSearch={handleSearch}
			/>
			<Routes>
				<Route path='recipe-app/' element={<Home />}>
					<Route index element={<Navigate to='featured' />} />
					<Route path='featured' element={<Featured data={featureData} />} />
					<Route path='breakfast' element={<Breakfast />} />
					<Route path='lunch' element={<Lunch />} />
					<Route path='dinner' element={<Dinner />} />
				</Route>
				<Route path='search/:label' element={<FindRecipe />} />
				<Route path='favorites' element={<Favorites />} />
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</div>
	);
}

export default App;
