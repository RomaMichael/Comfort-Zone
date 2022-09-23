import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chosenRed: false,
  chosenGreen: false,
  chosenBlue: false,
  chosenBlack: false,
  chosenYellow: false,
};

const chosenColors = createSlice({
  name: "chosenColors",
  initialState,
  reducers: {
    chooseRed: (state) => {
      state.chosenRed = !state.chosenRed;
    },
    chooseGreen: (state) => {
      state.chosenGreen = !state.chosenGreen;
    },
    chooseBlue: (state) => {
      state.chosenBlue = !state.chosenBlue;
    },
    chooseBlack: (state) => {
      state.chosenBlack = !state.chosenBlack;
    },
    chooseyellow: (state) => {
      state.chosenYellow = !state.chosenYellow;
    },
  },
});

export default chosenColors.reducer;

export const { chooseRed, chooseGreen, chooseBlue, chooseBlack, chooseyellow } =
  chosenColors.actions;
