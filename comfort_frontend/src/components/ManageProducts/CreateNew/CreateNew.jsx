import React, { useState } from "react";
import "./CreateNew.css";
import { useProducts } from "../../../context/ProductProvider";

export default function CreateNew() {
  const [redColor, setRedColor] = useState(false);
  const [greenColor, setGreenColor] = useState(false);
  const [blueColor, setBlueColor] = useState(false);
  const [blackColor, setBlackColor] = useState(false);
  const [yellowColor, setYellowColor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setProducts } = useProducts();
  const [newProduct, setNewProduct] = useState({
    shipping: false,
    colors: [],
    shippingCost: 0,

    counter: 1,
    availible: true,
  });

  const createProduct = async (product) => {
    const formData = new FormData();
    formData.append("shipping", product.shipping);
    formData.append("colors", product.colors);
    formData.append("shippingCost", product.shippingCost);
    formData.append("counter", product.counter);
    formData.append("available", product.availible);
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("brand", product.brand);
    formData.append("text", product.text);
    formData.append("img", product.img);
    const response = await fetch(
      "http://localhost:8005/products/create-product",
      {
        method: "POST",
        body: formData,
      }
    );
    const newProduct = await response.json();
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setIsLoading(false);
  };

  const createNew = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      await createProduct(newProduct);
    } catch (error) {
      console.log(error);
    }
  };

  const chosenColor = (e) => {
    switch (e) {
      case "red":
        setRedColor(!redColor);
        if (!redColor) {
          setNewProduct((prevState) => ({
            ...prevState,
            colors: [...prevState.colors, "red"],
          }));
        } else {
          const chooseColor = newProduct.colors.filter(
            (color) => color !== "red"
          );
          setNewProduct((prevState) => ({
            ...prevState,
            colors: chooseColor,
          }));
        }
        break;
      case "green":
        setGreenColor(!greenColor);
        if (!greenColor) {
          setNewProduct((prevState) => ({
            ...prevState,
            colors: [...prevState.colors, "green"],
          }));
        } else {
          const chooseColor = newProduct.colors.filter(
            (color) => color !== "green"
          );
          setNewProduct((prevState) => ({
            ...prevState,
            colors: chooseColor,
          }));
        }
        break;
      case "blue":
        setBlueColor(!blueColor);
        if (!blueColor) {
          setNewProduct((prevState) => ({
            ...prevState,
            colors: [...prevState.colors, "blue"],
          }));
        } else {
          const chooseColor = newProduct.colors.filter(
            (color) => color !== "blue"
          );
          setNewProduct((prevState) => ({
            ...prevState,
            colors: chooseColor,
          }));
        }
        break;
      case "black":
        setBlackColor(!blackColor);
        if (!blackColor) {
          setNewProduct((prevState) => ({
            ...prevState,
            colors: [...prevState.colors, "black"],
          }));
        } else {
          const chooseColor = newProduct.colors.filter(
            (color) => color !== "black"
          );
          setNewProduct((prevState) => ({
            ...prevState,
            colors: chooseColor,
          }));
        }
        break;
      case "yellow":
        setYellowColor(!yellowColor);
        if (!yellowColor) {
          setNewProduct((prevState) => ({
            ...prevState,
            colors: [...prevState.colors, "yellow"],
          }));
        } else {
          const chooseColor = newProduct.colors.filter(
            (color) => color !== "yellow"
          );
          setNewProduct((prevState) => ({
            ...prevState,
            colors: chooseColor,
          }));
        }
        break;
    }
  };

  return (
    <div className="createNew" onSubmit={createNew}>
      <form className="create-form">
        <h2 style={{ textAlign: "center" }}>Create new product section</h2>
        <div className="name-price">
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => {
              setNewProduct({ ...newProduct, name: e.target.value });
            }}
          />

          <input
            type="number"
            step="any"
            placeholder="Price"
            min="0"
            onChange={(e) => {
              setNewProduct({ ...newProduct, price: e.target.value });
            }}
          />
        </div>
        <div className="category-brand">
          <select
            onClick={(e) => {
              setNewProduct({ ...newProduct, category: e.target.value });
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

          <select
            onClick={(e) => {
              setNewProduct((prevProduct) => ({
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
        </div>
        <textarea
          placeholder="Describe product"
          style={{ width: "400px", borderRadius: "8px" }}
          onChange={(e) => {
            setNewProduct({ ...newProduct, text: e.target.value });
          }}
        ></textarea>
        <div className="colors-section">
          <h4 style={{ textAlign: "center" }}>Choose colors</h4>
          <div className="colors">
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
        </div>
        <div className="shipping">
          <input
            type="checkBox"
            onChange={() => {
              setNewProduct({ ...newProduct, shipping: !newProduct.shipping });
            }}
          />
          Shipping
          {newProduct.shipping ? (
            <div className="shipping-cost">
              <input
                type="number"
                step="any"
                placeholder="Shipping cost"
                min="0"
                onChange={(e) => {
                  setNewProduct({
                    ...newProduct,
                    shippingCost: e.target.value,
                  });
                }}
              />
            </div>
          ) : null}
        </div>
        <input
          type="file"
          onChange={(e) => {
            setNewProduct({ ...newProduct, img: e.target.files[0] });
          }}
        />
        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "50px",
            alignSelf: "center",
            marginTop: "30px",
            backgroundColor: isLoading ? "gray" : "blue",
            color: "white",
            width: "70px",
            height: "30px",
            border: "none",
            borderRadius: "10px",
          }}
        >
          {isLoading ? "Loading" : "Send"}
        </button>
      </form>
    </div>
  );
}
