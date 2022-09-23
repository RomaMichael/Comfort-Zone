import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shippingState: false,
};

const filterShipping = createSlice({
  name: "filterShipping",
  initialState,
  reducers: {
    setShipping: (state) => {
      state.shippingState = !state.shippingState;
    },
    clearShipping: (state) => {
      state.shippingState = false;
    },
  },
});

export default filterShipping.reducer;
export const { setShipping, clearShipping } = filterShipping.actions;
