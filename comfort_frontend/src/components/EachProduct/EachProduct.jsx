import React from "react";

import "../EachProduct/EachProduct.css";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useAuthContext } from "../../context/AuthProvider";

export default function EachProduct({
  img,
  name,
  price,
  linkToProduct,
  infoStyle,
  infoClass,
}) {
  const { userAuth } = useAuthContext();
  const discount = (15 * price) / 100;
  return (
    <div className={infoClass}>
      <div className="img-container">
        <div
          className="img-display"
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="onHover">
            {" "}
            <Link to={linkToProduct}>
              <div className="open-product">
                <AiOutlineSearch className="search-icon" />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="information-section">
        <div className="img-text">
          <p>{name}</p>
          {userAuth.role === "premium-user" ? (
            <p>
              <del style={{ color: "black" }}>{price}$</del>{" "}
              {(price - discount).toFixed(2)}
            </p>
          ) : (
            <p>{price}$</p>
          )}
        </div>
        <div className="expand-information" style={infoStyle}>
          <p className="expand-text">
            Cloud bread VHS hell of banjo bicycle rights jianbing umami
            mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher
            waistcoat, authentic ...
          </p>
          <Link to={linkToProduct}>
            <button className="expand-button">DETAILS</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
