import { configureStore } from "@reduxjs/toolkit";
import filterColorSlice from "./filterColorSlice";
import filterCategory from "./filterCategorySlice";
import filterSearch from "./filterSearchSlice";
import filterBrand from "./filterBrandSlice";
import filterShipping from "./filterShippingSlice";
import filterPrice from "./filterPriceSlice";
import chosenColors from "./createNewSlice";

export const store = configureStore({
  reducer: {
    filterColors: filterColorSlice,
    filterCategory: filterCategory,
    filterSearch: filterSearch,
    filterBrand: filterBrand,
    filterShipping: filterShipping,
    filterPrice: filterPrice,
    chosenColors: chosenColors,
  },
});
