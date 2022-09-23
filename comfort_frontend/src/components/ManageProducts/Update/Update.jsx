import React, { useEffect, useState } from "react";
import { useProducts } from "../../../context/ProductProvider";

import UpdatePopover from "../../../MuiBlocks/UpdatePopover";
import "./Update.css";
export default function Update() {
  const { products } = useProducts();

  const [updateSearch, setUpdateSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  const searchProduct = () => {
    if (!updateSearch) {
      return products;
    }
    return products.filter((product) =>
      product.name.toLowerCase().includes(updateSearch.toLowerCase())
    );
  };

  useEffect(() => {
    const searchedProduct = searchProduct();
    setFilteredProducts(searchedProduct);
  }, [updateSearch, products]);

  return (
    <div className="update-products">
      <h2 style={{ textAlign: "center" }}>Update Section</h2>
      <div className="search-to-update">
        <input type="text" onChange={(e) => setUpdateSearch(e.target.value)} />
      </div>
      <div className="product-list">
        <p>Click on a Picture to change</p>
        {filteredProducts.map((product) => (
          <div
            className="productToUpdate"
            key={product._id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid grey",
              width: "400px",
              borderRadius: "10px",
              marginBottom: "30px",
            }}
          >
            <img
              src={product.img}
              alt="product pic"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "10px",
              }}
            />
            {product.name}
            <UpdatePopover product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
