import { useParams, Link } from "react-router-dom";
import "../ProductPage/ProductPage.css";
import { useState } from "react";
import ProductCounter from "../ProductCounter/ProductCounter";
import RatingStars from "../../MuiBlocks/RatingStars";
import { useProducts } from "../../context/ProductProvider";
import { useAuthContext } from "../../context/AuthProvider";

export function ProductPage() {
  const { products } = useProducts();
  const { userAuth, setUserAuth, updateCart } = useAuthContext();
  const params = useParams();
  const currentProduct = products.find((product) => product._id === params.id);

  const [productCount, setProductCount] = useState(
    currentProduct ? currentProduct.counter : null
  );
  const [mainPic, setMainPic] = useState(
    currentProduct ? currentProduct.img : null
  );

  const [rating, setRating] = useState(1);

  if (!currentProduct) {
    return null;
  }

  const discount = (15 * currentProduct.price) / 100;

  const addToCart = () => {
    let newCart;
    let prevState = userAuth.cartState;
    const productIndex = prevState.findIndex(
      (cartProduct) => cartProduct._id === currentProduct._id
    );

    if (productIndex !== -1) {
      newCart = prevState;
      newCart[productIndex].counter += productCount;
    } else {
      currentProduct.counter = productCount;
      newCart = [...prevState, currentProduct];
    }

    setUserAuth((prevUserAuth) => ({ ...prevUserAuth, cartState: newCart }));
    updateCart(newCart);
    return newCart;
  };

  const setPic = (e) => {
    setMainPic(e);
  };

  return (
    <div className="productPage">
      <div className="product-page">
        {!products.length ? (
          <p>Loading.......</p>
        ) : (
          <div>
            <div className="title">
              <h3>
                <span>
                  <Link to="/Home"> Home /</Link>
                </span>
                <span>
                  {" "}
                  <Link to="/Products">Products /</Link>{" "}
                </span>{" "}
                <span>{currentProduct.name}</span>
              </h3>
            </div>
            <div className="each-product">
              <div className="product-container">
                <div className="return-to-products">
                  <Link to="/Products">
                    <button className="return-button">BACK TO PRODUCTS</button>
                  </Link>
                </div>
                <div className="main-section">
                  <div className="pictures">
                    <div className="big-display">
                      <img
                        onClick={() => setPic(currentProduct.img)}
                        src={mainPic}
                        alt=""
                      />
                    </div>
                    <div className="small-display">
                      <img
                        onClick={() => setPic(currentProduct.img)}
                        src={currentProduct.img}
                        alt=""
                      />
                      <img
                        onClick={() =>
                          setPic(
                            "https://dl.airtable.com/.attachments/f4720cc51a45ccc204f7476d51cb1b0e/eeb5fe4e/z-extra-1.jpeg?ts=1656041661&userId=usrQMwWEPx18KgLcP&cs=2326100c443167c2"
                          )
                        }
                        src="https://dl.airtable.com/.attachments/f4720cc51a45ccc204f7476d51cb1b0e/eeb5fe4e/z-extra-1.jpeg?ts=1656041661&userId=usrQMwWEPx18KgLcP&cs=2326100c443167c2"
                        alt=""
                      />
                      <img
                        onClick={() =>
                          setPic(
                            "https://dl.airtable.com/.attachments/a73777f8a2cbf4820ccaa6aa4349db01/c541de4b/z-extra-2.jpeg?ts=1656041661&userId=usrQMwWEPx18KgLcP&cs=117667a5e44d524a"
                          )
                        }
                        src="https://dl.airtable.com/.attachments/a73777f8a2cbf4820ccaa6aa4349db01/c541de4b/z-extra-2.jpeg?ts=1656041661&userId=usrQMwWEPx18KgLcP&cs=117667a5e44d524a"
                        alt=""
                      />
                      <img
                        onClick={() =>
                          setPic(
                            "https://dl.airtable.com/.attachments/7a50daf83875879b373d91ebb9bb6012/c1695f7e/z-extra-3.jpeg?ts=1656041661&userId=usrQMwWEPx18KgLcP&cs=facf3d7540608649"
                          )
                        }
                        src="https://dl.airtable.com/.attachments/7a50daf83875879b373d91ebb9bb6012/c1695f7e/z-extra-3.jpeg?ts=1656041661&userId=usrQMwWEPx18KgLcP&cs=facf3d7540608649"
                        alt=""
                      />
                      <img
                        onClick={() =>
                          setPic(
                            "https://dl.airtable.com/.attachments/5592998dcaee77b12c50bda63dd94d06/6ad61540/z-extra-4.jpeg?ts=1656041661&userId=usrQMwWEPx18KgLcP&cs=64d0b2984d814b12"
                          )
                        }
                        src="https://dl.airtable.com/.attachments/5592998dcaee77b12c50bda63dd94d06/6ad61540/z-extra-4.jpeg?ts=1656041661&userId=usrQMwWEPx18KgLcP&cs=64d0b2984d814b12"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="information">
                    <div className="product-name">
                      <h2>{currentProduct.name}</h2>
                    </div>
                    <RatingStars rating={rating} setRating={setRating} />
                    <div className="product-price">
                      {userAuth.role === "premium-user" ? (
                        <h5>
                          <del style={{ color: "black" }}>
                            {currentProduct.price}$
                          </del>{" "}
                          {(currentProduct.price - discount).toFixed(2)}$
                        </h5>
                      ) : (
                        <h5>{currentProduct.price}$</h5>
                      )}
                    </div>
                    <div className="product-description">
                      <p>{currentProduct.text}</p>
                    </div>
                    <div className="available-and-Brand">
                      <div className="available">
                        <p>
                          <strong>Available:</strong>
                        </p>
                        {currentProduct.available ? (
                          <p>In stock</p>
                        ) : (
                          <p>Out of stock</p>
                        )}
                      </div>
                      <div className="Brand">
                        <p>
                          <strong>Brand:</strong>
                        </p>
                        <p>{currentProduct.brand}</p>
                      </div>
                    </div>
                    <hr />
                    {currentProduct.available ? (
                      <div>
                        <div className="colors">
                          <p>
                            <strong>Colors:</strong>
                          </p>
                          <div className="colors-availible">
                            {currentProduct.colors.map((color, i) => (
                              <div
                                style={{
                                  backgroundColor: color,
                                  width: "25px",
                                  height: "25px",
                                  borderRadius: "100px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                                key={i}
                              ></div>
                            ))}
                          </div>
                        </div>
                        <div className="make-order">
                          <ProductCounter
                            setUpdatedCart={setProductCount}
                            productCount={productCount}
                          />{" "}
                          {userAuth.isLoggedIn ? (
                            <Link to="/Cart">
                              <button
                                onClick={addToCart}
                                className="order-button"
                              >
                                ADD TO CART
                              </button>
                            </Link>
                          ) : (
                            <Link to="/Login">
                              <button
                                onClick={addToCart}
                                className="login-buton"
                              >
                                LOGIN
                              </button>
                            </Link>
                          )}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
