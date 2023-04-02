import "./favorites.scss";
import { Button } from "../../Components/Button/Button";
import { Modal } from "../../Components/Modal/Modal";
import { useAppSelector } from "../../Utilities/Hooks/useSelector";
import { useState } from "react";
import { useAppDispatch } from "../../Utilities/Hooks/useDispatch";
import { removeFavorite } from "../../Utilities/Store/Slices/favoriteRecipesSlice";
import trash from "../../Assets/trash-solid.svg";

export const Favorites = (): JSX.Element => {
	const [openModal, setOpenModal] = useState(false);
	const [modalData, setModalData] = useState(null);
	const favorites = useAppSelector((state) => state.storeFavorites.data);
	const dispatch = useAppDispatch();

	return (
		<>
			{favorites!.length === 0 ? (
				<div className='no-favorites'>
					<h1>No Favorites Yet</h1>
				</div>
			) : (
				<div className='favs-card'>
					{favorites &&
						favorites.map((val: any) => {
							return (
								<div className='favs-inner-card' key={val.favoriteData.uri}>
									<div className='favs-header'>
										<h2>{val.favoriteData.label}</h2>
									</div>
									<div className='favs-content'>
										<div>
											<img
												src={val.favoriteData.image}
												alt={val.favoriteData.label}
											/>
										</div>
										<div className='favs-details'>
											<p>
												<span>Meal Type:</span> {val.favoriteData.mealType}
											</p>
											<p>
												<span>Dish Type:</span> {val.favoriteData.dishType}
											</p>
											<p>
												<span>Cuisine Type:</span>{" "}
												{val.favoriteData.cuisineType}
											</p>
											<p>
												<span>Serving Size:</span> {val.favoriteData.yield}
											</p>
											<p>
												<span>Calories Per Serving:</span>{" "}
												{Math.floor(
													val.favoriteData.calories / val.favoriteData.yield
												)}
											</p>
											<p>
												<span>Total Calories:</span>{" "}
												{Math.floor(val.favoriteData.calories)}
											</p>
											<Button
												onClick={() => {
													setModalData(val.favoriteData);
													setOpenModal(!openModal);
												}}
												bgColor='#FA0922'
											>
												MORE...
											</Button>
										</div>
									</div>
									<div className='remove-fav'>
										<img src={trash} alt='star' />
										<p onClick={() => dispatch(removeFavorite(val.id))}>
											Remove Favorite
										</p>
									</div>
								</div>
							);
						})}
				</div>
			)}
			{openModal && (
				<Modal
					setOpenModal={setOpenModal}
					open={openModal}
					modalData={modalData}
				/>
			)}
		</>
	);
};
