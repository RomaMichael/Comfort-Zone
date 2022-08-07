import React from "react";
import "../Filters/Filters.css";
import { AiOutlineCheck } from "react-icons/ai";

export default function Filters({
  setFilterCategory,
  setFilterColor,
  setFilterSearch,
  setFilterPrice,
  filterPrice,
  clearFilters,
  setFilterBrand,
  colorRed,
  colorGreen,
  colorBlue,
  colorBlack,
  colorYellow,

  filterShipping,
}) {
  return (
    <div className="filters-component">
      <div className="filters-section">
        <div className="search-input">
          <input
            type="text"
            onChange={(e) => setFilterSearch(e.target.value)}
            placeholder="Search"
            className="input-search"
          />
        </div>

        <div className="buttons">
          <h5 className="buttons-title">Category</h5>
          <button onClick={() => setFilterCategory()}>All</button>
          <button onClick={() => setFilterCategory("office")}>Ofiice</button>
          <button onClick={() => setFilterCategory("living room")}>
            Living Room
          </button>
          <button onClick={() => setFilterCategory("kitchen")}>Kitchen</button>
          <button onClick={() => setFilterCategory("bedroom")}>Bedroom</button>
          <button onClick={() => setFilterCategory("dining")}>Dining</button>
          <button onClick={() => setFilterCategory("kids")}>Kids</button>
        </div>
        <div className="company">
          <h5 className="company-title">Company</h5>
          <select onChange={(e) => setFilterBrand(e.target.value)}>
            <option value="All">All</option>
            <option value="Marcos">Marcos</option>
            <option value="Liddy">Liddy</option>
            <option value="Ikea">Ikea</option>
            <option value="Caressa">Caressa</option>
          </select>
        </div>
        <div className="colors-buttons">
          <h5 className="colors-buttons-title"></h5>
          <div className="buttons-colors">
            <button onClick={() => setFilterColor()} className="all-button">
              All
            </button>
            <button
              onClick={() => setFilterColor("red")}
              className="red-button"
            >
              {colorRed ? <AiOutlineCheck className="v-red" /> : null}
            </button>
            <button
              onClick={() => setFilterColor("green")}
              className="green-button"
            >
              {colorGreen ? <AiOutlineCheck className="v-green" /> : null}
            </button>
            <button
              onClick={() => setFilterColor("blue")}
              className="blue-button"
            >
              {colorBlue ? <AiOutlineCheck className="v-blue" /> : null}
            </button>
            <button
              onClick={() => setFilterColor("black")}
              className="black-button"
            >
              {colorBlack ? <AiOutlineCheck className="v-black" /> : null}
            </button>
            <button
              onClick={() => setFilterColor("yellow")}
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
            onChange={(e) => setFilterPrice(e.target.value)}
            min="0"
            max="3100"
            className="price-input"
          />
        </div>
        <div className="free-shipping">
          <p>Free Shpping</p>
          <input type="checkbox" onClick={filterShipping} />
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
