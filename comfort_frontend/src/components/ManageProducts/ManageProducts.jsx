import React, { useState } from "react";
import { useProducts } from "../../context/ProductProvider";
import CreateNew from "./CreateNew/CreateNew";
import Delete from "./Delete/Delete";
import "./ManageProducts.css";
import Information from "./Information/Information";
import Update from "./Update/Update";
import UsersManage from "./UsersManage/UsersManage";

export default function ManageProducts() {
  const [createState, setCreateState] = useState(false);
  const [deleteState, setDeleteState] = useState(false);
  const [updateState, setUpdateState] = useState(false);
  const [statisticsState, setStatisticsState] = useState(false);
  const [usersManageState, setUsersManageState] = useState(false);
  const { products } = useProducts();

  const delPage = () => {
    setDeleteState(!deleteState);
    setCreateState(false);
    setUpdateState(false);
    setStatisticsState(false);
    setUsersManageState(false);
  };
  const createPage = () => {
    setCreateState(!createState);
    setDeleteState(false);
    setUpdateState(false);
    setStatisticsState(false);
    setUsersManageState(false);
  };

  const updatePage = () => {
    setUpdateState(true);
    setCreateState(false);
    setDeleteState(false);
    setStatisticsState(false);
    setUsersManageState(false);
  };

  const StatisticsPage = () => {
    setUpdateState(false);
    setCreateState(false);
    setDeleteState(false);
    setStatisticsState(true);
    setUsersManageState(false);
  };

  const usersManage = () => {
    setUpdateState(false);
    setCreateState(false);
    setDeleteState(false);
    setStatisticsState(false);
    setUsersManageState(!usersManageState);
  };

  return (
    <div className="manage-products">
      <div className="manage-container">
        <div className="manage-title">
          <p>Products in the shop: {products.length}</p>
          <div className="admin-buttons">
            <div className="product-manage">
              <button onClick={() => createPage()}>Create New Products</button>
              <button onClick={() => delPage()}>Delete Products</button>
              <button onClick={() => updatePage()}>Update Products</button>
              <button onClick={() => usersManage()}>Users manage</button>
            </div>

            <div className="information">
              <button onClick={() => StatisticsPage()}>Information</button>
            </div>
          </div>
        </div>

        {createState ? <CreateNew /> : null}
        {deleteState ? <Delete /> : null}
        {updateState ? <Update /> : null}
        {usersManageState ? <UsersManage /> : null}
        {statisticsState ? <Information /> : null}
      </div>
    </div>
  );
}
