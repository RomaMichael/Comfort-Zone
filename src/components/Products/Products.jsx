import React, { useContext, useEffect, useState } from "react";
import "../Products/Products.css";
import { Link } from "react-router-dom";
import Filters from "./Filters/Filters";
import MainProducts from "./MainProducts/MainProducts";

export default function Products() {
  const rows = {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  };

  const cubes = {
    display: "flex",
    justifyContent: "flex-start",
    gap: "20px",
    flexWrap: "wrap",
  };

  const hideInfo = {
    display: "none",
  };
  const showInfo = {
    display: "block",
  };

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

  // STATES
  const [productDisplay, setProductDisplay] = useState(cubes);
  const [infoStyle, setInfoStyle] = useState(hideInfo);
  const [infoClass, setInfoClass] = useState("hide-info");

  const [data, setData] = useState([]);

  const [products, setProducts] = useState(data);
  const [filterCategory, setFilterCategory] = useState();
  const [filterColor, setFilterColor] = useState();
  const [filterSearch, setFilterSearch] = useState();
  const [filterPrice, setFilterPrice] = useState();
  const [filterBrand, setFilterBrand] = useState();
  const [storageBackUp, setStorageBackUp] = useState(products);
  const [price, setPrice] = useState();

  //STATES OF COLORS
  const [colorRed, setColorRed] = useState(false);
  const [colorGreen, setColorGreen] = useState(false);
  const [colorBlue, setColorBlue] = useState(false);
  const [colorBlack, setColorBlack] = useState(false);
  const [colorYellow, setColorYellow] = useState(false);

  const [shippingState, setShippingState] = useState(true);

  //

  //DISPLAY CHANGE

  useEffect(() => {
    localStorage.setItem("filtered data", JSON.stringify(products));
  }, [products]);

  function displayToRows() {
    setProductDisplay(rows);
    setInfoClass("show-info");
    setInfoStyle(showInfo);
  }

  function displayToCubes() {
    setProductDisplay(cubes);
    setInfoClass("hide-info");
    setInfoStyle(hideInfo);
  }
  //

  //FILTERS

  // FILTER BY PRODUCT NAME

  // FILTERS

  function filter() {
    let filtered = data;

    if (filterCategory) {
      filtered = filtered.filter(
        (product) => product.category === filterCategory
      );
    }

    if (filterSearch) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(filterSearch)
      );
    }

    if (filterColor) {
      filtered = filtered.filter((product) =>
        product.colors.includes(filterColor)
      );
    }

    if (filterBrand) {
      filtered = filtered.filter((product) => product.brand == filterBrand);
      if (filterBrand == "All") {
        filtered = data;
      }
    }

    if (filterPrice) {
      filtered = filtered.filter(
        (product) => product.price < Number(filterPrice)
      );
    }

    return filtered;
  }

  // FILTER BY COLORS

  function allColors() {
    setColorRed(false);
    setColorGreen(false);
    setColorBlue(false);
    setColorBlack(false);
    setColorYellow(false);
    setProducts(data);
  }

  function filterColorGreen() {
    setColorGreen(!colorGreen);
    setColorRed(false);
    setColorBlue(false);
    setColorBlack(false);
    setColorYellow(false);

    let filteredColorGreen = data.filter((elem) => elem.colors == "green");
    setProducts(filteredColorGreen);
  }

  function filterColorBlue() {
    setColorBlue(!colorBlue);
    setColorRed(false);
    setColorGreen(false);
    setColorBlack(false);
    setColorYellow(false);

    let filteredColorBlue = storageBackUp.filter((elem) =>
      elem.colors.includes("blue")
    );
    setProducts(filteredColorBlue);
  }

  function filterColorBlack() {
    setColorBlack(!colorBlack);
    setColorRed(false);
    setColorGreen(false);
    setColorBlue(false);
    setColorYellow(false);

    let filteredColorBlack = storageBackUp.filter((elem) =>
      elem.colors.includes("black")
    );
    setProducts(filteredColorBlack);
  }

  function filterColorYellow() {
    setColorYellow(!colorYellow);
    setColorRed(false);
    setColorGreen(false);
    setColorBlue(false);
    setColorBlack(false);

    let filteredColorYellow = storageBackUp.filter((elem) =>
      elem.colors.includes("yellow")
    );
    setProducts(filteredColorYellow);
  }

  //FILTER BY SHIPPING STATUS

  function filterShipping() {
    setShippingState(!shippingState);
    if (shippingState) {
      let freeShipping = storageBackUp.filter(
        (elem) => elem.shipping == "free"
      );
      setProducts(freeShipping);
    } else {
      setProducts(data);
    }
  }

  function clearFilters() {
    setFilterCategory("");
    setFilterColor("");
    setFilterSearch("");
    setFilterPrice("");
    setFilterBrand("All");
  }

  // SORT THE ARRAY
  function sorting(e) {
    let sertedArray = [...products];
    switch (e) {
      case "fromLowToHigh":
        sertedArray = sertedArray.sort(function (a, b) {
          return a.price - b.price;
        });
        break;
      case "fromHighToLow":
        sertedArray = sertedArray.sort(function (a, b) {
          return b.price - a.price;
        });
        break;
      case "fromAToZ":
        sertedArray = sertedArray.sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          }
        });
        break;
      case "fromZToA":
        sertedArray = sertedArray.sort(function (a, b) {
          if (a.name > b.name) {
            return -1;
          }
        });
        break;
    }
    setProducts(sertedArray);
  }

  return (
    <div className="products">
      <div className="products-title">
        <h3>
          <span>
            <Link to="/Home">Home</Link>
          </span>{" "}
          <span> / Products</span>
        </h3>
      </div>
      <div className="products-components">
        <Filters
          setFilterCategory={setFilterCategory}
          price={price}
          colorRed={colorRed}
          colorGreen={colorGreen}
          colorBlue={colorBlue}
          colorBlack={colorBlack}
          colorYellow={colorYellow}
          filterShipping={filterShipping}
          filterCompanies={filterBrand}
          setFilterBrand={setFilterBrand}
          filterColor={filterColor}
          setFilterSearch={setFilterSearch}
          setFilterPrice={setFilterPrice}
          filterPrice={filterPrice}
          clearFilters={clearFilters}
          setFilterColor={setFilterColor}
        />

        <MainProducts
          displayToCubes={displayToCubes}
          displayToRows={displayToRows}
          setDataStorage={sorting}
          productDisplay={productDisplay}
          infoStyle={infoStyle}
          infoClass={infoClass}
          data={filter()}
        />
      </div>
    </div>
  );
}
