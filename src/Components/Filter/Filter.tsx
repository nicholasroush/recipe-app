import "./filter.scss";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import arrow from "../../Assets/chevron-down-solid.svg";
import close from "../../Assets/close.svg";
import { IngredientTags } from "../Card/Card";

interface IProps {
	cuisineFilter: string;
	setCuisineFilter: Dispatch<SetStateAction<string>>;
	filterTags: string[];
	setFilterTags: Dispatch<SetStateAction<string[]>>;
	calFilter: number | null;
	setCalFilter: Dispatch<SetStateAction<number | null>>;
	ingredientTags: IngredientTags[];
	setIngredientTags: Dispatch<SetStateAction<IngredientTags[]>>;
}

export const Filter = ({
	cuisineFilter,
	setCuisineFilter,
	filterTags,
	setFilterTags,
	calFilter,
	setCalFilter,
	ingredientTags,
	setIngredientTags,
}: IProps): JSX.Element => {
	const [cuisineInput, setCuisineInput] = useState("");
	const [ingredientInput, setIngredientInput] = useState("");
	const [checksOpen, setChecksOpen] = useState<boolean>(false);
	const [ingredientOpen, setIngredientOpen] = useState<boolean>(false);
	const [cuisineOpen, setCuisineOpen] = useState<boolean>(false);
	const [filterOpen, setFilterOpen] = useState<boolean>(false);

	const handlesetCuisineInput = (
		e: ChangeEvent<HTMLInputElement>,
		setInput: string
	) => {
		e.preventDefault();

		setCuisineInput(setInput);
	};

	const handlesetIngredientInput = (
		e: ChangeEvent<HTMLInputElement>,
		setInput: string
	) => {
		e.preventDefault();

		setIngredientInput(setInput);
	};

	const handleCusineFilter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			setCuisineFilter(cuisineInput);
			setCuisineInput("");
		}
	};

	const removeCuisineFilter = () => {
		setCuisineFilter("");
	};

	const handleIngredientFilter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			if (ingredientInput) {
				setIngredientTags([
					...ingredientTags,
					{
						id: ingredientTags.length + 1,
						label: ingredientInput,
					},
				]);
			}
			setIngredientInput("");
		}
	};

	const removeIngredientFilter = (id: number) => {
		setIngredientTags(ingredientTags.filter((el) => el.id !== id));
	};

	const handleCheckFilters = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			setFilterTags([...filterTags, e.target.value]);
		} else {
			setFilterTags(
				filterTags.filter((filterTag) => filterTag !== e.target.value)
			);
		}
	};

	const handleCheckFilterCals = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			setCalFilter(parseInt(e.target.value));
		} else {
			setCalFilter(null);
		}
	};

	const handleCheckAnimate = () => {
		setChecksOpen(!checksOpen);
	};

	const handleIngredientAnimate = () => {
		setIngredientOpen(!ingredientOpen);
	};

	const handleCuisineAnimate = () => {
		setCuisineOpen(!cuisineOpen);
	};

	return (
		<div className='filter-content'>
			<h2 onClick={() => setFilterOpen(!filterOpen)}>
				Filter By{" "}
				<img
					src={arrow}
					alt='arrow'
					className={filterOpen ? "img-rotate" : ""}
				/>
			</h2>
			<div className={filterOpen ? "filter-fields" : "filters-closed"}>
				<div className='ingredient-input'>
					<p onClick={handleIngredientAnimate}>
						Ingredient
						<img
							src={arrow}
							alt='arrow'
							className={ingredientOpen ? "img-rotate" : ""}
						/>
					</p>
					<input
						type='text'
						value={ingredientInput}
						onChange={(ev) => handlesetIngredientInput(ev, ev.target.value)}
						onKeyDown={handleIngredientFilter}
						placeholder='Example: Chicken'
						className={ingredientOpen ? "ingredient-open" : "ingredient-closed"}
						enterKeyHint='done'
					/>
				</div>
				<div className='checkbox-content'>
					<p onClick={handleCheckAnimate}>
						Nutrition{" "}
						<img
							src={arrow}
							alt='arrow'
							className={checksOpen ? "img-rotate" : ""}
						/>
					</p>
					<div
						className={
							checksOpen
								? "filter-checks filter-checks-open"
								: "filter-checks filter-checks-close"
						}
					>
						<label htmlFor='cal'>Under 500 Calories</label>
						<input
							type='checkbox'
							value='500'
							id='cal'
							onChange={handleCheckFilterCals}
						/>
						<label htmlFor='vegan'>Vegan</label>
						<input
							type='checkbox'
							value='vegan'
							id='vegan'
							onChange={handleCheckFilters}
						/>
						<label htmlFor='vegetarian'>Vegetarian</label>
						<input
							type='checkbox'
							value='vegetarian'
							id='vegetarian'
							onChange={handleCheckFilters}
						/>
						<label htmlFor='low-sugar'>Low Sugar</label>
						<input
							type='checkbox'
							value='low-sugar'
							id='low-sugar'
							onChange={handleCheckFilters}
						/>
						<label htmlFor='gluten-free'>Gluten-Free</label>
						<input
							type='checkbox'
							value='gluten-free'
							id='gluten-free'
							onChange={handleCheckFilters}
						/>
						<label htmlFor='tree-nut-free'>Tree-Nut-Free</label>
						<input
							type='checkbox'
							value='tree-nut-free'
							id='tree-nut-free'
							onChange={handleCheckFilters}
						/>
						<label htmlFor='peanut-free'>Peanut-Free</label>
						<input
							type='checkbox'
							value='peanut-free'
							id='peanut-free'
							onChange={handleCheckFilters}
						/>
					</div>
				</div>
				<div className='cuisine-input'>
					<p onClick={handleCuisineAnimate}>
						Cuisine Type
						<img
							src={arrow}
							alt='arrow'
							className={cuisineOpen ? "img-rotate" : ""}
						/>
					</p>
					<input
						type='text'
						value={cuisineInput}
						onChange={(ev) => handlesetCuisineInput(ev, ev.target.value)}
						onKeyDown={handleCusineFilter}
						placeholder='Example: Indian'
						className={cuisineOpen ? "cuisine-open" : "cuisine-closed"}
						enterKeyHint='done'
					/>
				</div>
			</div>
			<div
				className={filterOpen ? "active-filters with-margin" : "active-filters"}
			>
				<h4>Active Filters</h4>
				<div className='filters'>
					{calFilter && <p>{calFilter} Cal</p>}
					{filterTags &&
						filterTags.map((val) => {
							return <p key={val.length + 1}>{val}</p>;
						})}
					{ingredientTags &&
						ingredientTags.map((val) => {
							return (
								<p
									key={val.id++}
									onClick={() => removeIngredientFilter(val.id)}
									className='tag'
								>
									{val.label}
									<img src={close} alt='X' />
								</p>
							);
						})}
					{cuisineFilter && (
						<p className='tag' onClick={removeCuisineFilter}>
							{cuisineFilter}
							<img src={close} alt='X' />
						</p>
					)}
				</div>
			</div>
		</div>
	);
};
