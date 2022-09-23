import React from "react";
import "../MainProducts/MainProducts.css";
import { MdTableRows } from "react-icons/md";
import { CgMenuGridR } from "react-icons/cg";
import EachProduct from "../../EachProduct/EachProduct";

export default function MainPRoducts({
  displayToRows,
  displayToCubes,
  setDataStorage,
  productDisplay,
  infoClass,
  infoStyle,
  data,
}) {
  function sorting(e) {
    setDataStorage(e);
  }

  return (
    <div className="main-product-component">
      <div className="products-main">
        <div className="cards-section">
          <div className="cards-title">
            <div className="buttons-section">
              <div className="organize-buttons">
                <button className="cubes-organize" onClick={displayToCubes}>
                  <CgMenuGridR />
                </button>
                <button className="rows-organize" onClick={displayToRows}>
                  <MdTableRows />
                </button>
              </div>
              <p className="products-count">{data.length} Products found</p>
            </div>
            <div className="right-cards-section">
              <div className="sorts">
                <p>Sort by </p>
                <select onChange={(e) => sorting(e.target.value)}>
                  <option value="fromLowToHigh">Price (Lowest)</option>
                  <option value="fromHighToLow">Price (Highest)</option>
                  <option value="fromAToZ">Name (A - Z)</option>
                  <option value="fromZToA">Name (Z - A)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="the-cards" style={productDisplay}>
            {data.map((card, i) => (
              <EachProduct
                key={i}
                id={card.id}
                img={card.img}
                name={card.name}
                price={card.price}
                linkToProduct={card._id}
                infoStyle={infoStyle}
                infoClass={infoClass}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
