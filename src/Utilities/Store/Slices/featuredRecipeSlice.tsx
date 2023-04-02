import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const appId = process.env.REACT_APP_ID;
const appKey = process.env.REACT_APP_KEY;

export interface FeaturedInterface {
	hits: Object[];
}

interface InitialState {
	loading: boolean;
	data: FeaturedInterface | null;
	error: string;
}

const initialState: InitialState = {
	loading: false,
	data: {
		hits: [],
	},
	error: "",
};

export const fetchFeatured = createAsyncThunk(
	"featured/fetchFeatured",
	async () => {
		const response = await axios.get(
			`https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}&mealType=Breakfast&mealType=Lunch&mealType=Dinner&mealType=Snack&mealType=Teatime&random=true`
		);
		return response.data;
	}
);

const featuredRecipeSlice = createSlice({
	name: "featured",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchFeatured.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(
			fetchFeatured.fulfilled,
			(state, action: PayloadAction<FeaturedInterface>) => {
				state.loading = false;
				state.data = action.payload;
				state.error = "";
			}
		);
		builder.addCase(fetchFeatured.rejected, (state, action) => {
			state.loading = false;
			state.data = null;
			state.error = action.error.message || "Something went wrong...";
		});
	},
});

export default featuredRecipeSlice.reducer;
