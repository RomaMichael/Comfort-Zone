import React from "react";
import "../Filters/Filters.css";
import { AiOutlineCheck } from "react-icons/ai";
import { useDispatch } from "react-redux/es/exports";
import {
  allColors,
  setRed,
  setGreen,
  setBlue,
  setBlack,
  setYellow,
} from "../../../Redux/filterColorSlice";
import {
  setAll,
  setLivingRoom,
  setKitchen,
  setOffice,
  setBedroom,
  setDining,
  setKids,
} from "../../../Redux/filterCategorySlice";
import { setSearch } from "../../../Redux/filterSearchSlice";
import { setBrand } from "../../../Redux/filterBrandSlice";
import { setShipping } from "../../../Redux/filterShippingSlice";
import { setPrice } from "../../../Redux/filterPriceSlice";

export default function Filters({
  filterPrice,
  clearFilters,
  colorRed,
  colorGreen,
  colorBlue,
  colorBlack,
  colorYellow,
}) {
  const dispatch = useDispatch();

  return (
    <div className="filters-component">
      <div className="filters-section">
        <div className="search-input">
          <input
            type="text"
            onChange={(e) => dispatch(setSearch(e.target.value))}
            placeholder="Search"
            className="input-search"
          />
        </div>

        <div className="buttons">
          <h5 className="buttons-title">Category</h5>
          <button onClick={() => dispatch(setAll())}>All</button>
          <button onClick={() => dispatch(setOffice())}>Ofiice</button>
          <button onClick={() => dispatch(setLivingRoom())}>Living Room</button>
          <button onClick={() => dispatch(setKitchen())}>Kitchen</button>
          <button onClick={() => dispatch(setBedroom())}>Bedroom</button>
          <button onClick={() => dispatch(setDining())}>Dining</button>
          <button onClick={() => dispatch(setKids())}>Kids</button>
        </div>
        <div className="company">
          <h5 className="company-title">Company</h5>
          <select onChange={(e) => dispatch(setBrand(e.target.value))}>
            <option value="">All</option>
            <option value="Marcos">Marcos</option>
            <option value="Liddy">Liddy</option>
            <option value="Ikea">Ikea</option>
            <option value="Caressa">Caressa</option>
          </select>
        </div>
        <div className="colors-buttons">
          <h5 className="colors-buttons-title">Colors</h5>
          <div className="buttons-colors">
            <button
              onClick={() => dispatch(allColors())}
              className="all-button"
            >
              All
            </button>
            <button onClick={() => dispatch(setRed())} className="red-button">
              {colorRed ? <AiOutlineCheck className="v-red" /> : null}
            </button>
            <button
              onClick={() => dispatch(setGreen())}
              className="green-button"
            >
              {colorGreen ? <AiOutlineCheck className="v-green" /> : null}
            </button>
            <button onClick={() => dispatch(setBlue())} className="blue-button">
              {colorBlue ? <AiOutlineCheck className="v-blue" /> : null}
            </button>
            <button
              onClick={() => dispatch(setBlack())}
              className="black-button"
            >
              {colorBlack ? <AiOutlineCheck className="v-black" /> : null}
            </button>
            <button
              onClick={() => dispatch(setYellow())}
              className="yellow-button"
            >
              {colorYellow ? <AiOutlineCheck className="v-yellow" /> : null}
            </button>
          </div>
        </div>
        <div className="price">
          <p className="price-display">${filterPrice}</p>
          <input
            type="range"
            onChange={(e) => dispatch(setPrice(e.target.value))}
            min="0"
            max="3100"
            className="price-input"
          />
        </div>
        <div className="free-shipping">
          <p>Free Shpping</p>
          <input type="checkbox" onClick={() => dispatch(setShipping())} />
        </div>
        <div className="clear-filters">
          <button
            onClick={() => clearFilters()}
            className="clear-filters-button"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}
