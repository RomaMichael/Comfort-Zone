import React, { useEffect } from "react";
import { useState } from "react";
import { useProducts } from "../../../context/ProductProvider";
import DelPopover from "../../../MuiBlocks/DelPopover";
import "./Delete.css";

export default function Delete() {
  const { products, setProducts } = useProducts();
  const [filterSearch, setFilterSearch] = useState("");

  const [filteredProducts, setFilteredProducts] = useState(products);

  const getFilteredProducts = () => {
    if (!filterSearch) {
      return products;
    }

    return products.filter((product) =>
      product.name.toLowerCase().includes(filterSearch.toLowerCase())
    );
  };

  const deleteProduct = async (productId) => {
    const response = await fetch(
      `http://localhost:8005/products/delete-product/${productId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.status === 200) {
      setProducts((prevProducts) => {
        const remainingProducts = [];
        for (const product of prevProducts) {
          if (product._id !== productId) {
            remainingProducts.push(product);
          }
        }
        return remainingProducts;
      });
    }
  };

  useEffect(() => {
    const searchedProduct = getFilteredProducts();
    setFilteredProducts(searchedProduct);
  }, [filterSearch, products]);

  return (
    <div className="delete-products">
      <h2 style={{ textAlign: "center" }}>Delete Section</h2>
      <div className="search-delete">
        <input
          type="text"
          placeholder="Insert product name"
          onChange={(e) => setFilterSearch(e.target.value)}
        />
      </div>
      {filteredProducts.map((product) => (
        <div className="product-delete" key={product._id}>
          <div className="product-props">
            <img src={product.img} alt={product.name} className="img-delete" />
            {product.name}
            <DelPopover
              name={product.name}
              deleteProduct={() => deleteProduct(product._id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
