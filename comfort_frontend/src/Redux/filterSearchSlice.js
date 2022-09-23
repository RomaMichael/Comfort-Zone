import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterSearch: "",
};

const filterSearch = createSlice({
  name: "filterSearch",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.filterSearch = action.payload;
    },
    clearSearch: (state) => {
      state.filterSearch = "";
    },
  },
});

export default filterSearch.reducer;
export const { setSearch, clearSearch } = filterSearch.actions;
