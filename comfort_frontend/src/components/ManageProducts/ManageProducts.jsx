import React, { useState } from "react";
import { useProducts } from "../../context/ProductProvider";
import CreateNew from "./CreateNew/CreateNew";
import Delete from "./Delete/Delete";
import "./ManageProducts.css";
import Update from "./Update/Update";

export default function ManageProducts() {
  const [createState, setCreateState] = useState(false);
  const [deleteState, setDeleteState] = useState(false);
  const [updateState, setUpdateState] = useState(false);
  const { products } = useProducts();

  const delPage = () => {
    setDeleteState(!deleteState);
    setCreateState(false);
    setUpdateState(false);
  };
  const createPage = () => {
    setCreateState(!createState);
    setDeleteState(false);
    setUpdateState(false);
  };

  const updatePage = () => {
    setUpdateState(true);
    setCreateState(false);
    setDeleteState(false);
  };

  return (
    <div className="manage-products">
      <div className="manage-container">
        <div className="manage-title">
          <p>Products in the shop: {products.length}</p>
          <button onClick={() => createPage()}>Create New Products</button>
          <button onClick={() => delPage()}>Delete Products</button>
          <button onClick={() => updatePage()}>Update Products</button>
        </div>

        {createState ? <CreateNew /> : null}
        {deleteState ? <Delete /> : null}
        {updateState ? <Update /> : null}
      </div>
    </div>
  );
}
