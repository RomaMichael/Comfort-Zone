import React, { useState, useEffect } from "react";
import "../OrderRow/OrderRow.css";
import ProductCounter from "../../../pages/ProductCounter/ProductCounter";
import { AiFillDelete } from "react-icons/ai";
import { useAuthContext } from "../../../context/AuthProvider";

export default function OrderRow({ product }) {
  const [productCount, setProductCount] = useState(product.counter);

  const { updateCart, userAuth, setUserAuth } = useAuthContext();

  const updateCountAndCart = (newQuantity) => {
    setProductCount(newQuantity);
    setUserAuth((prevState) => {
      const index = prevState.cartState.findIndex(
        (cartItem) => cartItem.id === product.id
      );
      const newCart = [...prevState.cartState];
      newCart[index].counter = newQuantity;
      updateCart(newCart);

      return {
        ...prevState,
        cartState: newCart,
      };
    });
  };

  const deleteOrder = () => {
    const remainingCart = userAuth.cartState.filter(
      (deletedProduct) => deletedProduct._id !== product._id
    );

    setUserAuth({ ...userAuth, cartState: remainingCart });
    updateCart(remainingCart);
  };

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
          setUpdatedCart={updateCountAndCart}
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
