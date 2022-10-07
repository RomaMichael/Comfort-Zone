import React, { useEffect, useState } from "react";
import "../Products/Products.css";
import { Link } from "react-router-dom";
import Filters from "./Filters/Filters";
import MainProducts from "./MainProducts/MainProducts";
import { useProducts } from "../../context/ProductProvider";
import { useSelector } from "react-redux/es/exports";
import { clearBrand } from "../../Redux/filterBrandSlice";
import { clearPrice } from "../../Redux/filterPriceSlice";
import { clearShipping } from "../../Redux/filterShippingSlice";
import { clearSearch } from "../../Redux/filterSearchSlice";
import { useDispatch } from "react-redux/es/exports";
import { clearCategory } from "../../Redux/filterCategorySlice";
import { clearColors } from "../../Redux/filterColorSlice";
import { useAuthContext } from "../../context/AuthProvider";

export default function Products() {
  const dispatch = useDispatch();
  const { userAuth } = useAuthContext();

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

  const filterColor = useSelector((state) => state.filterColors.filterColor);
  const filterCategory = useSelector(
    (state) => state.filterCategory.filterCategory
  );
  const filterSearch = useSelector((state) => state.filterSearch.filterSearch);
  const filterBrand = useSelector((state) => state.filterBrand.filterBrand);
  const shippingState = useSelector(
    (state) => state.filterShipping.shippingState
  );
  const filterPrice = useSelector((state) => state.filterPrice.filterPrice);

  const { products, setProducts } = useProducts();

  // STATES OF DISPLAY STYLE
  const [productDisplay, setProductDisplay] = useState(cubes);
  const [infoStyle, setInfoStyle] = useState(hideInfo);
  const [infoClass, setInfoClass] = useState("hide-info");

  const [price, setPrice] = useState();

  //COLORS

  const colorRed = useSelector((state) => state.filterColors.colorRed);
  const colorGreen = useSelector((state) => state.filterColors.colorGreen);
  const colorBlue = useSelector((state) => state.filterColors.colorBlue);
  const colorYellow = useSelector((state) => state.filterColors.colorYellow);
  const colorBlack = useSelector((state) => state.filterColors.colorBlack);

  useEffect(() => {
    localStorage.setItem("filtered data", JSON.stringify(products));
  }, [products, userAuth.cartState]);

  //DISPLAY CHANGE
  const displayToRows = () => {
    setProductDisplay(rows);
    setInfoClass("show-info");
    setInfoStyle(showInfo);
  };

  const displayToCubes = () => {
    setProductDisplay(cubes);
    setInfoClass("hide-info");
    setInfoStyle(hideInfo);
  };

  //FILTER

  const filter = () => {
    let filtered = [...products];

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
      if (filterBrand === "All") {
      }
    }

    if (filterPrice) {
      filtered = filtered.filter(
        (product) => product.price < Number(filterPrice)
      );
    }
    if (shippingState) {
      filtered = filtered.filter((product) => product.shipping == false);
    }

    return filtered;
  };

  function clearFilters() {
    dispatch(clearCategory());
    dispatch(clearSearch());
    dispatch(clearPrice());
    dispatch(clearBrand());
    dispatch(clearShipping());
    dispatch(clearColors());
  }

  // SORT THE ARRAY
  function sorting(e) {
    let sortedArray = [...products];
    switch (e) {
      case "fromLowToHigh":
        sortedArray = sortedArray.sort(function (a, b) {
          return a.price - b.price;
        });
        break;
      case "fromHighToLow":
        sortedArray = sortedArray.sort(function (a, b) {
          return b.price - a.price;
        });
        break;
      case "fromAToZ":
        sortedArray = sortedArray.sort(function (a, b) {
          if (a.name < b.name) {
            return -1;
          }
        });
        break;
      case "fromZToA":
        sortedArray = sortedArray.sort(function (a, b) {
          if (a.name > b.name) {
            return -1;
          }
        });
        break;
    }
    setProducts(sortedArray);
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
          price={price}
          filterCompanies={filterBrand}
          filterColor={filterColor}
          filterPrice={filterPrice}
          clearFilters={clearFilters}
          colorRed={colorRed}
          colorGreen={colorGreen}
          colorBlue={colorBlue}
          colorYellow={colorYellow}
          colorBlack={colorBlack}
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
