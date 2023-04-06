import { useParams } from "react-router-dom";
import "./findRecipe.scss";
import "../../Components/Card/card.scss";
import { IngredientTags } from "../../Components/Card/Card";
import { useFetch } from "../../Utilities/Hooks/useFetch";
import { useEffect, useState } from "react";
import { Button } from "../../Components/Button/Button";
import { Filter } from "../../Components/Filter/Filter";
import { Modal } from "../../Components/Modal/Modal";
import { Spinner } from "../../Components/Spinner/Spinner";
import { Toast } from "../../Components/Toast/Toast";
import { addFavorite } from "../../Utilities/Store/Slices/favoriteRecipesSlice";
import { useAppDispatch } from "../../Utilities/Hooks/useDispatch";
import toTop from "../../Assets/arrow-circle-up-solid.svg";
import star from "../../Assets/star-solid.svg";
import { useAppSelector } from "../../Utilities/Hooks/useSelector";

const appId = process.env.REACT_APP_ID;
const appKey = process.env.REACT_APP_KEY;

export const FindRecipe = (): JSX.Element => {
	let { label } = useParams();
	const [url, setUrl] = useState<string | undefined>();
	const [openModal, setOpenModal] = useState(false);
	const [modalData, setModalData] = useState(null);
	const [cuisineFilter, setCuisineFilter] = useState("");
	const [filterTags, setFilterTags] = useState<string[]>([]);
	const [calFilter, setCalFilter] = useState<number | null>(null);
	const [ingredientTags, setIngredientTags] = useState<IngredientTags[]>([]);
	const [scrollTo, setScrollTo] = useState(false);
	const dispatch = useAppDispatch();
	const [toast, setToast] = useState(false);
	const { data, loading, error } = useFetch(url);
	const nextPage = data.flat().at(-1)?._links.next.href;

	const favs = useAppSelector((state) => state.storeFavorites.data);

	const handleAddFav = (label: string, recipe: any) => {
		if (
			favs
				.map((val: any) => {
					return val.favoriteData.label;
				})
				.includes(label)
		) {
			return alert("Recipe already added to favorites");
		} else {
			dispatch(addFavorite(recipe));
			setToast(true);
			setTimeout(() => {
				setToast(false);
			}, 5000);
		}
	};

	useEffect(() => {
		setUrl(
			`https://api.edamam.com/api/recipes/v2?type=public&q=${label}&app_id=${appId}&app_key=${appKey}`
		);
	}, [label]);

	const toggleScroll = () => {
		const scrolled =
			document.body.scrollTop || document.documentElement.scrollTop;
		if (scrolled > 900) {
			setScrollTo(true);
		} else {
			setScrollTo(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	window.addEventListener("scroll", toggleScroll);

	useEffect(() => {
		if (openModal) {
			document.body.style.overflow = "hidden";
		}

		if (!openModal) {
			document.body.style.overflow = "unset";
		}
	}, [openModal]);

	return (
		<div>
			<div className='find-content'>
				{data?.length === 0 ? (
					<div className='nothing-found'>
						<h1>No food or dish found...</h1>
					</div>
				) : (
					<>
						<div className='card-container'>
							<button
								onClick={scrollToTop}
								className={scrollTo ? "to-top-button" : "to-top-hidden"}
							>
								<img src={toTop} alt='up arrow' />
								To Top
							</button>
							<Toast toast={toast} />
							<Filter
								cuisineFilter={cuisineFilter}
								setCuisineFilter={setCuisineFilter}
								filterTags={filterTags}
								setFilterTags={setFilterTags}
								calFilter={calFilter}
								setCalFilter={setCalFilter}
								ingredientTags={ingredientTags}
								setIngredientTags={setIngredientTags}
							/>
							{loading && (
								<div className='loading'>
									<Spinner />
								</div>
							)}
							{error && (
								<div className='error'>
									<h1>Sorry, there was an error - {error}</h1>
								</div>
							)}
							<div className='card'>
								{data &&
									data.map((val) => {
										return (
											<>
												{val.hits
													.filter(({ recipe }: any) => {
														if (recipe.label.toLowerCase().includes(label)) {
															return recipe;
														}

														return null;
													})
													.filter(({ recipe }: any) => {
														if (
															ingredientTags
																.map((val) => val.label)
																.every((ingredientTag) =>
																	recipe.ingredientLines
																		.join("")
																		.toLowerCase()
																		.includes(ingredientTag)
																)
														) {
															return recipe;
														}

														return null;
													})
													.filter(({ recipe }: any) => {
														if (
															Object.values(recipe.cuisineType)
																.join("")
																.includes(cuisineFilter.toLowerCase())
														) {
															return recipe;
														}

														return null;
													})
													.filter(({ recipe }: any) => {
														if (
															filterTags.every((filterTag) =>
																recipe.healthLabels
																	.join("")
																	.toLowerCase()
																	.includes(filterTag)
															)
														) {
															return recipe;
														}

														return null;
													})
													.filter(({ recipe }: any) => {
														if (calFilter === null) {
															return recipe;
														} else if (
															Math.floor(recipe.calories / recipe.yield) <=
															calFilter!
														) {
															return recipe;
														}

														return null;
													})
													.map(({ recipe }: any) => {
														return (
															<div className='inner-card' key={recipe.uri}>
																<div className='header'>
																	<h2>{recipe.label}</h2>
																</div>
																<div className='content'>
																	<div className='recipe-img-container'>
																		<img
																			src={recipe.image}
																			alt={recipe.label}
																		/>
																	</div>
																	<div className='details'>
																		<p>
																			<span>Meal Type:</span> {recipe.mealType}
																		</p>
																		<p>
																			<span>Dish Type:</span> {recipe.dishType}
																		</p>
																		<p>
																			<span>Cuisine Type:</span>{" "}
																			{recipe.cuisineType}
																		</p>
																		<p>
																			<span>Serving Size:</span> {recipe.yield}
																		</p>
																		<p>
																			<span>Calories Per Serving:</span>{" "}
																			{Math.floor(
																				recipe.calories / recipe.yield
																			)}
																		</p>
																		<p>
																			<span>Total Calories:</span>{" "}
																			{Math.floor(recipe.calories)}
																		</p>
																		<Button
																			onClick={() => {
																				setModalData(recipe);
																				setOpenModal(!openModal);
																			}}
																			bgColor='#FA0922'
																		>
																			MORE...
																		</Button>
																	</div>
																</div>
																<div className='add-fav'>
																	<img src={star} alt='star' />
																	<p
																		onClick={() => {
																			handleAddFav(recipe.label, recipe);
																		}}
																	>
																		Add To Favorites
																	</p>
																</div>
															</div>
														);
													})}
											</>
										);
									})}
							</div>
							{data && (
								<button onClick={() => setUrl(nextPage)}>Load More</button>
							)}
						</div>
						{openModal && (
							<Modal
								setOpenModal={setOpenModal}
								open={openModal}
								modalData={modalData}
							/>
						)}
					</>
				)}
			</div>
		</div>
	);
};
