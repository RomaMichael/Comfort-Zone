import { useParams, Link } from "react-router-dom";
import "../ProductPage/ProductPage.css";
import { useEffect, useState } from "react";
import ProductCounter from "../ProductCounter/ProductCounter";
import { AiOutlineCheck } from "react-icons/ai";
import RatingStars from "../../MuiBlocks/RatingStars";

export function ProductPage({ setCart }) {
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:8005/data");
      const dataApi = await res.json();
      setData(dataApi);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [data, setData] = useState([]);

  const params = useParams();
  console.log(data);
  let product = data.find((product) => product.link == params.id);
  const [productCount, setProductCount] = useState(product.counter);
  const [mainPic, setMainPic] = useState(product.img);
  const [colorState, setColorState] = useState(false);

  const [rating, setRating] = useState(1);

  // useEffect(() => {
  //   localStorage.setItem("rating", JSON.stringify(rating));
  // }, [rating]);
  //JSON.parse(localStorage.getItem("rating")) ||

  if (!product) {
    return null;
  }
  //MAKE AN ORDER

  function addToCart() {
    setCart((prevCart) => {
      // check if product already exist on cart
      const productIndex = prevCart.findIndex(
        (cartProduct) => cartProduct.id === product.id
      );
      // found product in the current count
      if (productIndex !== -1) {
        const newCart = prevCart;
        newCart[productIndex].counter += productCount;
        // return new state based on existing

        // add new count to the existing amount inside the cart
        return newCart;
      } else {
        product.counter = productCount;
        return [...prevCart, product];
      }
    });
  }

  // SET MAIN PICTURE

  function setPic(e) {
    setMainPic(e);
  }

  return (
    <div className="productPage">
      <div className="title">
        <h3>
          <span>
            <Link to="/Home"> Home /</Link>
          </span>
          <span>
            {" "}
            <Link to="/Products">Products /</Link>{" "}
          </span>{" "}
          <span>{product.name}</span>
        </h3>
      </div>
      <div className="each-product">
        <div className="return-to-products">
          <Link to="/Products">
            <button className="return-button">BACK TO PRODUCTS</button>
          </Link>
        </div>
        <div className="main-section">
          <div className="pictures">
            <div className="big-display">
              <img onClick={() => setPic(product.img)} src={mainPic} alt="" />
            </div>
            <div className="small-display">
              <img
                onClick={() => setPic(product.img)}
                src={product.img}
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
              <h2>{product.name}</h2>
            </div>
            <RatingStars rating={rating} setRating={setRating} />
            <div className="product-price">
              <h5>${product.price}</h5>
            </div>
            <div className="product-description">
              <p>{product.text}</p>
            </div>
            <div className="available-and-Brand">
              <div className="available">
                <p>
                  <strong>Available:</strong>
                </p>
                <p>{product.available}</p>
              </div>
              <div className="Brand">
                <p>
                  <strong>Brand:</strong>
                </p>
                <p>{product.brand}</p>
              </div>
            </div>
            <hr />
            {product.available == "In Stock" ? (
              <div>
                <div className="colors">
                  <p>
                    <strong>Colors:</strong>
                  </p>
                  <div className="colors-availible">
                    {product.colors.map((color, i) => (
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
                      >
                        {colorState ? (
                          <AiOutlineCheck style={{ color: "white" }} />
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="make-order">
                  <ProductCounter
                    setProductCount={setProductCount}
                    productCount={productCount}
                  />
                  <Link to="/Cart">
                    {" "}
                    <button onClick={addToCart} className="order-button">
                      ADD TO CART
                    </button>
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
