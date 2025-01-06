import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: [], 
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const movie = action.payload;
      if (!state.favorites.some((fav) => fav.id === movie.id)) {
        state.favorites.push(movie);
      }
    },
    removeFavorite: (state, action) => {
      const movieId = action.payload;
      state.favorites = state.favorites.filter((fav) => fav.id !== movieId);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
