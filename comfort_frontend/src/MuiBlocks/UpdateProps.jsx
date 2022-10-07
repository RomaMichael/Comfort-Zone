import React, {  useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import { FcExpand } from "react-icons/fc";
import { useProducts } from "../context/ProductProvider";

export default function UpdateProps({ product }) {
  const { setProducts } = useProducts();
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const [redColor, setRedColor] = useState(false);
  const [greenColor, setGreenColor] = useState(false);
  const [blueColor, setBlueColor] = useState(false);
  const [blackColor, setBlackColor] = useState(false);
  const [yellowColor, setYellowColor] = useState(false);

  const shippingUpdate = (e) => {
    if (e === 0) {
      setUpdatedProduct((prevProduct) => ({
        ...prevProduct,
        shipping: false,
      }));
    }
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      shipping: true,
      shippingCost: e,
    }));
  };

  const sendToUpdate = async () => {
    console.log(updatedProduct);
    try {
      const response = await fetch(
        `http://localhost:8005/products/update-product/${updatedProduct._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProduct),
        }
      );
      if (response.status === 200) {
        setProducts((products) => {
          const index = products.findIndex((p) => p._id === updatedProduct._id);

          const updatedProducts = [...products];
          updatedProducts[index] = updatedProduct;
          return updatedProducts;
        });
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const chosenColor = (e) => {
    switch (e) {
      case "red":
        setRedColor(!redColor);
        if (!redColor) {
          setUpdatedProduct((prevState) => ({
            ...prevState,
            colors: [...prevState.colors, "red"],
          }));
        } else {
          const chooseColor = updatedProduct.colors.filter(
            (color) => color !== "red"
          );
          setUpdatedProduct((prevState) => ({
            ...prevState,
            colors: chooseColor,
          }));
        }
        break;
      case "green":
        setGreenColor(!greenColor);
        if (!greenColor) {
          setUpdatedProduct((prevState) => ({
            ...prevState,
            colors: [...prevState.colors, "green"],
          }));
        } else {
          const chooseColor = updatedProduct.colors.filter(
            (color) => color !== "green"
          );
          setUpdatedProduct((prevState) => ({
            ...prevState,
            colors: chooseColor,
          }));
        }
        break;
      case "blue":
        setBlueColor(!blueColor);
        if (!blueColor) {
          setUpdatedProduct((prevState) => ({
            ...prevState,
            colors: [...prevState.colors, "blue"],
          }));
        } else {
          const chooseColor = updatedProduct.colors.filter(
            (color) => color !== "blue"
          );
          setUpdatedProduct((prevState) => ({
            ...prevState,
            colors: chooseColor,
          }));
        }
        break;
      case "black":
        setBlackColor(!blackColor);
        if (!blackColor) {
          setUpdatedProduct((prevState) => ({
            ...prevState,
            colors: [...prevState.colors, "black"],
          }));
        } else {
          const chooseColor = updatedProduct.colors.filter(
            (color) => color !== "black"
          );
          setUpdatedProduct((prevState) => ({
            ...prevState,
            colors: chooseColor,
          }));
        }
        break;
      case "yellow":
        setYellowColor(!yellowColor);
        if (!yellowColor) {
          setUpdatedProduct((prevState) => ({
            ...prevState,
            colors: [...prevState.colors, "yellow"],
          }));
        } else {
          const chooseColor = updatedProduct.colors.filter(
            (color) => color !== "yellow"
          );
          setUpdatedProduct((prevState) => ({
            ...prevState,
            colors: chooseColor,
          }));
        }
        break;
    }
  };

  return (
    <div style={{ width: "500px" }}>
      <div
        className="button-update"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <button
          style={{
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "10px",
            height: "30px",
          }}
          onClick={sendToUpdate}
        >
          Send Updates
        </button>
      </div>

      <Accordion className="name-to-update" display>
        <AccordionSummary
          expandIcon={<FcExpand />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={{ display: "flex", alignItems: "center" }}>
            Name:{" "}
            <span style={{ color: "blue", fontWeight: "700" }}>
              <p>{product.name}</p>
            </span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <p>New Name: </p>
            <input
              type="text"
              onChange={(e) =>
                setUpdatedProduct((prevProduct) => ({
                  ...prevProduct,
                  name: e.target.value,
                }))
              }
            />
          </label>
        </AccordionDetails>
      </Accordion>
      <Accordion className="price-to-update" style={{ width: "500px" }}>
        <AccordionSummary
          expandIcon={<FcExpand />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={{ display: "flex", alignItems: "center" }}>
            Price:{" "}
            <span style={{ color: "blue", fontWeight: "700" }}>
              <p>{product.price}</p>
            </span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <p>New Price: </p>
            <input
              type="number"
              onChange={(e) =>
                setUpdatedProduct((prevProduct) => ({
                  ...prevProduct,
                  price: e.target.value,
                }))
              }
            />
          </label>
        </AccordionDetails>
      </Accordion>
      <Accordion className="text-to-update" style={{ width: "500px" }}>
        <AccordionSummary
          expandIcon={<FcExpand />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Text:</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <textarea
            name=""
            id=""
            cols="50"
            rows="5"
            onChange={(e) =>
              setUpdatedProduct((prevProduct) => ({
                ...prevProduct,
                text: e.target.value,
              }))
            }
          ></textarea>
        </AccordionDetails>
      </Accordion>
      <Accordion className="name-to-update" style={{ width: "500px" }}>
        <AccordionSummary
          expandIcon={<FcExpand />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={{ display: "flex", alignItems: "center" }}>
            Category:{" "}
            <span style={{ color: "blue", fontWeight: "700" }}>
              <p>{product.category}</p>
            </span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <select
            onClick={(e) => {
              setUpdatedProduct((prevProduct) => ({
                ...prevProduct,
                category: e.target.value,
              }));
            }}
          >
            <option value="Category">Category</option>
            <option value="Office">Office</option>
            <option value="Living Room">Living Room</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Bedroom">Bedroom</option>
            <option value="Dining">Dining</option>
            <option value="Kids">Kids</option>
          </select>
        </AccordionDetails>
      </Accordion>
      <Accordion className="name-to-update" style={{ width: "500px" }}>
        <AccordionSummary
          expandIcon={<FcExpand />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={{ display: "flex", alignItems: "center" }}>
            Brand:{" "}
            <span style={{ color: "blue", fontWeight: "700" }}>
              <p>{product.brand}</p>
            </span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <select
            onClick={(e) => {
              setUpdatedProduct((prevProduct) => ({
                ...prevProduct,
                brand: e.target.value,
              }));
            }}
          >
            <option value="Brand">Brand</option>
            <option value="Marcos">Marcos</option>
            <option value="Liddy">Liddy</option>
            <option value="Ikea">Ikea</option>
            <option value="Caressa">Caressa</option>
          </select>
        </AccordionDetails>
      </Accordion>
      <Accordion className="name-to-update" style={{ width: "500px" }}>
        <AccordionSummary
          expandIcon={<FcExpand />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={{ display: "flex", alignItems: "center" }}>
            <p> Shipping: </p>

            <div>
              {" "}
              {product.shipping ? (
                <div>
                  {" "}
                  <p> {product.shippingCost}</p>
                </div>
              ) : (
                <div>
                  <p style={{ color: "blue", fontWeight: "700" }}>
                    {" "}
                    Free shipping
                  </p>
                </div>
              )}
            </div>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              className="set-shipping-price"
              style={{ display: "flex", alignItems: "center" }}
            >
              <p>Set shipping price</p>
              <input
                type="number"
                style={{ width: "80px" }}
                onChange={(e) => shippingUpdate(e.target.value)}
              />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion className="colors-to-update" style={{ width: "500px" }}>
        <AccordionSummary
          expandIcon={<FcExpand />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography style={{ display: "flex", alignItems: "center" }}>
            Colors:
            <span style={{ color: "blue", fontWeight: "700" }}>
              <div
                className="colors-of-product"
                style={{ display: "flex", gap: "10px" }}
              >
                <div>
                  {" "}
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
                      key={i}
                    ></div>
                  ))}
                </div>
              </div>
            </span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <h4>Choose colors</h4>
          <div className="colors" style={{ display: "flex", gap: "10px" }}>
            <label htmlFor="">
              <input
                type="checkBox"
                value="red"
                onChange={(e) => chosenColor(e.target.value)}
              />
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "10px",
                  backgroundColor: "red",
                }}
              ></div>
            </label>
            <label htmlFor="">
              <input
                type="checkBox"
                value="green"
                onChange={(e) => chosenColor(e.target.value)}
              />
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "10px",
                  backgroundColor: "green",
                }}
              ></div>
            </label>
            <label htmlFor="">
              <input
                type="checkBox"
                value="blue"
                onChange={(e) => chosenColor(e.target.value)}
              />
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "10px",
                  backgroundColor: "blue",
                }}
              ></div>
            </label>
            <label htmlFor="">
              <input
                type="checkBox"
                value="black"
                onChange={(e) => chosenColor(e.target.value)}
              />
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "10px",
                  backgroundColor: "black",
                }}
              ></div>
            </label>
            <label htmlFor="">
              <input
                type="checkBox"
                value="yellow"
                onChange={(e) => chosenColor(e.target.value)}
              />
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "10px",
                  backgroundColor: "yellow",
                }}
              ></div>
            </label>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
