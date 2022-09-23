import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterColor: "",
  colorRed: false,
  colorGreen: false,
  colorBlue: false,
  colorBlack: false,
  colorYellow: false,
};

const filters = createSlice({
  name: "filterColors",
  initialState,
  reducers: {
    allColors: (state) => {
      state.filterColor = "";
    },
    setRed: (state) => {
      state.colorRed = !state.colorRed;
      state.colorGreen = false;
      state.colorBlue = false;
      state.colorYellow = false;
      state.colorBlack = false;
      state.filterColor = "red";
      console.log(state.colorRed);
    },
    setGreen: (state) => {
      state.colorGreen = !state.colorGreen;
      state.colorRed = false;
      state.colorBlue = false;
      state.colorYellow = false;
      state.colorBlack = false;
      state.filterColor = "green";
    },
    setBlue: (state) => {
      state.colorBlue = !state.colorBlue;
      state.colorGreen = false;
      state.colorRed = false;
      state.colorYellow = false;
      state.colorBlack = false;
      state.filterColor = "blue";
    },
    setBlack: (state) => {
      state.colorBlack = !state.colorBlack;
      state.colorGreen = false;
      state.colorBlue = false;
      state.colorYellow = false;
      state.colorRed = false;
      state.filterColor = "black";
    },
    setYellow: (state) => {
      state.colorYellow = !state.colorYellow;
      state.colorGreen = false;
      state.colorBlue = false;
      state.colorRed = false;
      state.colorBlack = false;
      state.filterColor = "yellow";
    },
    clearColors: (state) => {
      state.filterColor = "";
    },
  },
});

export default filters.reducer;
export const {
  allColors,
  setRed,
  setGreen,
  setBlue,
  setBlack,
  setYellow,
  clearColors,
} = filters.actions;
