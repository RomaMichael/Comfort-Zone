import { filter } from "@chakra-ui/react";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterPrice: null,
};

const filterPrice = createSlice({
  name: "filterPrice",
  initialState,
  reducers: {
    setPrice: (state, action) => {
      state.filterPrice = action.payload;
    },
    clearPrice: (state) => {
      state.filterPrice = null;
    },
  },
});

export default filterPrice.reducer;
export const { setPrice, clearPrice } = filterPrice.actions;
