import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterCategory: "",
};

const filterCategory = createSlice({
  name: "filterCategory",
  initialState,
  reducers: {
    setAll: (state) => {
      state.filterCategory = "";
    },
    setLivingRoom: (state) => {
      state.filterCategory = "living room";
    },
    setKitchen: (state) => {
      state.filterCategory = "kitchen";
    },
    setOffice: (state) => {
      state.filterCategory = "office";
    },
    setBedroom: (state) => {
      state.filterCategory = "bedroom";
    },
    setDining: (state) => {
      state.filterCategory = "dining";
    },
    setKids: (state) => {
      state.filterCategory = "kids";
    },
    clearCategory: (state) => {
      state.filterCategory = "";
    },
  },
});

export default filterCategory.reducer;
export const {
  setAll,
  setLivingRoom,
  setKitchen,
  setOffice,
  setBedroom,
  setDining,
  setKids,
  clearCategory,
} = filterCategory.actions;
