import React from "react";
import "./ProductCounter.css";

export default function ProductCounter({ productCount, setUpdatedCart }) {
  function increment() {
    setUpdatedCart(productCount + 1);
  }

  function decrement() {
    if (productCount === 1) {
      return;
    }
    setUpdatedCart(productCount - 1);
  }

  return (
    <div className="productCount">
      <button onClick={decrement} className="minus-button">
        -
      </button>
      <h1 className="display-quantity">{productCount}</h1>
      <button onClick={increment} className="plus-button">
        +
      </button>
    </div>
  );
}
