import React, { useEffect, useState } from "react";
import "./ProductCounter.css";

export default function ProductCounter({ productCount, setProductCount }) {
  function increment() {
    setProductCount(productCount + 1);
  }

  function decrement() {
    setProductCount(productCount - 1);
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
