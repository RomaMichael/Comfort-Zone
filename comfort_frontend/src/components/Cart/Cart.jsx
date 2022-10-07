import React, { useEffect, useState } from "react";
import "../Cart/Cart.css";
import { Link } from "react-router-dom";
import OrderRow from "./OrderRow/OrderRow";
import { useAuthContext } from "../../context/AuthProvider";
import OrderConfirm from "../../MuiBlocks/OrderConfirm";

export default function Cart() {
  const [subTotal, setSubTotal] = useState(0);
  const [shippingPayment, setShippingPayment] = useState(0);
  const { userAuth, updateCart, setUserAuth, confirm } = useAuthContext();
  const { cartState } = userAuth;

  const confirmation = () => {
    setUserAuth((prev) => ({
      ...prev,
      orders: { cartState },

      cartState: [],
    }));

    confirm(userAuth);
  };

  useEffect(() => {
    let totalShipping = 0;
    userAuth.cartState.map((elem) => {
      totalShipping += Number(elem.shippingCost);
    });
    setShippingPayment(totalShipping);

    let eachRowTotal = 0;
    userAuth.cartState.map((elem) => {
      eachRowTotal += elem.counter * elem.price;
    });
    setSubTotal(eachRowTotal);
  }, [userAuth.cartState]);

  useEffect(() => {
    let length = 0;
    userAuth.cartState.map((elem) => {
      length = elem.counter;
    });
  }, [userAuth]);

  const clearCart = () => {
    setUserAuth({ ...userAuth, cartState: [] });
    updateCart([]);
  };

  return (
    <div className="cartPage">
      <div className="orders-section">
        {userAuth.cartState.length ? (
          <div className="orders-section">
            <div className="orders-title">
              <ul>
                <li>Item</li>
                <li>Price</li>
                <li>Quantity</li>
                <li>Subtotal</li>
              </ul>
              <hr />
            </div>
            <div className="order-row">
              {userAuth.cartState.map((product, i) => (
                <OrderRow key={i} product={product} />
              ))}
            </div>
            <div className="cart-buttons">
              <Link to="/Products">
                <button>Continue shopping</button>
              </Link>
              <button onClick={clearCart}>Clear shopping cart</button>
            </div>
            <div className="payment-container">
              <div className="payment">
                <div className="subtotal-payment">
                  <div className="without-shipping">
                    <p>
                      <strong>Subtotal:</strong>
                    </p>
                    <p>${subTotal.toFixed(2)}</p>
                  </div>
                  <div className="shipping-cost">
                    <p>
                      <strong>Shipping:</strong>
                    </p>
                    <p>${shippingPayment}</p>
                  </div>
                  <hr />
                  <div className="total-payment">
                    <h4>TOTAL:</h4>
                    <h4>${(shippingPayment + subTotal).toFixed(2)}</h4>
                  </div>
                </div>
              </div>
              {userAuth.isLoggedIn ? (
                <OrderConfirm
                  confirmation={confirmation}
                  clearCart={clearCart}
                />
              ) : (
                <Link to="/Login">
                  <button className="login-button">LOGIN</button>
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="empty-cart">
            <h1>Your cart is empty</h1>
            <Link to="/Products">
              <button>FILL IT</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
