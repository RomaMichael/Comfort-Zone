import React, { useEffect, useState } from "react";
import "../Cart/Cart.css";
import { Link } from "react-router-dom";
import OrderRow from "./OrderRow/OrderRow";

export default function Cart({ cart, setCart, setCartCount, cartCount }) {
  const [subTotal, setSubTotal] = useState(0);
  const [shippingPayment, setShippingPayment] = useState(0);
  const [orderState, setOrderState] = useState(false);

  useEffect(() => {
    if (cart.length < 1) {
      setOrderState(false);
    } else if (cart.length >= 1) {
      setOrderState(true);
    }

    let totalShipping = 0;
    cart.map((elem) => {
      totalShipping += Number(elem.shippingCost);
    });
    setShippingPayment(totalShipping);

    let eachRowTotal = 0;
    cart.map((elem) => {
      eachRowTotal += elem.counter * elem.price;
    });
    setSubTotal(eachRowTotal);
  }, [cart]);

  function clearCart() {
    setCart([]);
    setOrderState(false);
  }

  return (
    <div className="cartPage">
      <div className="orders-section">
        {orderState ? (
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
              {cart.map((product, i) => (
                <OrderRow
                  key={i}
                  product={product}
                  setCart={setCart}
                  cart={cart}
                  setCartCount={setCartCount}
                  cartCount={cartCount}
                  setOrderState={setOrderState}
                />
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
              <button className="login-button">LOGIN</button>
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
