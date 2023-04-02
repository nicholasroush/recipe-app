import { createSlice } from "@reduxjs/toolkit";

interface DataInterface {
	id: number;
	favoriteData: Object;
}

interface InitialState {
	data: DataInterface[];
}

const initialState: InitialState = {
	data: [],
};

let id = initialState.data.length + 1;

const favoriteRecipeSlice = createSlice({
	name: "favorite",
	initialState,
	reducers: {
		addFavorite: (state, action) => {
			const favorite = {
				id: id++,
				favoriteData: action.payload,
			};
			state.data?.push(favorite);
		},
		removeFavorite: (state, action) => {
			state.data = state.data.filter(
				(favorite) => favorite.id !== action.payload
			);
		},
	},
});

export const { addFavorite, removeFavorite } = favoriteRecipeSlice.actions;
export default favoriteRecipeSlice.reducer;
