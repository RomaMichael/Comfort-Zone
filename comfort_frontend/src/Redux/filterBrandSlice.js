import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterBrand: "",
};

const filterBrand = createSlice({
  name: "filterBrand",
  initialState,
  reducers: {
    setBrand: (state, action) => {
      state.filterBrand = action.payload;
    },
    clearBrand: (state) => {
      state.filterBrand = "";
    },
  },
});

export default filterBrand.reducer;
export const { setBrand, clearBrand } = filterBrand.actions;
