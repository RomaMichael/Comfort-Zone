import * as React from "react";
import Popover from "@mui/material/Popover";
import { useProducts } from "../context/ProductProvider";

export default function FeatureProducts({
  setFirstExample,
  setSecondExample,
  setThirdExample,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { products } = useProducts();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const setFirst = (e) => {
    setFirstExample(e);
  };
  const setSecond = (e) => {
    setSecondExample(e);
  };
  const setThird = (e) => {
    setThirdExample(e);
  };

  return (
    <div>
      <button
        style={{
          width: "150px",
          height: "40px",
          border: "none",
          color: "white",
          backgroundColor: "blue",
          borderRadius: "8px",
        }}
        onClick={handleClick}
      >
        Set products for example
      </button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div
          className="popover-feature-products"
          style={{ width: "300px", height: "200px" }}
        >
          <h3 style={{ textAlign: "center" }}>Set products</h3>
          <div
            className="products-choose"
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div
              className="first-example"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <p style={{ fontWeight: "700", width: "100px" }}>Set first</p>
              <select
                style={{ width: "170px", height: "30px" }}
                onClick={(e) => setFirst(e.target.value)}
              >
                {products.map((product, i) => (
                  <option key={i} value={i}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            <div
              className="second-example"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <p style={{ fontWeight: "700", width: "100px" }}>Set second</p>
              <select
                style={{ width: "170px", height: "30px" }}
                onClick={(e) => setSecond(e.target.value)}
              >
                {products.map((product, i) => (
                  <option key={i} value={i}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            <div
              className="third-example"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <p style={{ fontWeight: "700", width: "100px" }}>Set third</p>
              <select
                style={{ width: "170px", height: "30px" }}
                onClick={(e) => setThird(e.target.value)}
              >
                {products.map((product, i) => (
                  <option key={i} value={i}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </Popover>
    </div>
  );
}
