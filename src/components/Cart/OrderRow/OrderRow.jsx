import React, { useEffect, useState } from "react";
import "../OrderRow/OrderRow.css";
import ProductCounter from "../../../pages/ProductCounter/ProductCounter";
import { AiFillDelete } from "react-icons/ai";

export default function OrderRow({ product, setCart, cart }) {
  const [productCount, setProductCount] = useState(product.counter);

  function updateCountAndCart(newQuantity) {
    setProductCount(newQuantity);
    setCart((prevCart) => {
      const index = prevCart.findIndex(
        (cartItem) => cartItem.id === product.id
      );
      const newCart = [...prevCart];
      newCart[index].counter = newQuantity;
      return newCart;
    });
  }

  function deleteOrder() {
    let deleted = cart.filter((elem) => elem.name !== product.name);

    setCart([...deleted]);
  }

  return (
    <div className="orderRow">
      <div className="img-and-name">
        <img src={product.img} alt="" />
        <div className="name-and-color">
          <p>
            <strong>{product.name}</strong>
          </p>
          {/* <p>Color: </p> */}
          <div className="price-mobile">
            <p>${product.price}</p>
          </div>
        </div>
      </div>
      <div className="price">
        <p>${product.price}</p>
      </div>
      <div className="quantity">
        <ProductCounter
          productCount={productCount}
          setProductCount={updateCountAndCart}
        />
      </div>
      <div className="subtotal-row">
        ${(product.price * productCount).toFixed(2)}
      </div>
      <div className="del-button">
        <button onClick={() => deleteOrder()}>
          <AiFillDelete />
        </button>
      </div>
    </div>
  );
}
