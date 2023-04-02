import { configureStore } from "@reduxjs/toolkit";
import featuredReducer from "./Slices/featuredRecipeSlice";
import favoritesReducer from "./Slices/favoriteRecipesSlice";

const store = configureStore({
	reducer: {
		storeFeatured: featuredReducer,
		storeFavorites: favoritesReducer,
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
