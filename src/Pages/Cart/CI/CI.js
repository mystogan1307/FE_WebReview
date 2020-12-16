import "./CI.css";

import React, { useEffect, useState } from "react";
import Axios from "axios";
import { appConfig } from "../../../configs/app.config";
import { FormattedNumber } from "react-intl";

const CI = ({ product, deleteProduct, updateCart }) => {
  const [p, setP] = useState(null);
  const [count, setCount] = useState(product.count);

  useEffect(() => {
    Axios.get(`http://localhost:3001/product/${product.productId}`).then(
      (res) => {
        console.log(res);
        setP(res.data);
      }
    );
  }, []);

  const onChangeCount = (event) => {
    if (!event.target.value) {
      setCount(1);
      updateCart(product.productId, 1);
    } else {
      setCount(event.target.value);
      updateCart(product.productId, event.target.value);
    }
  };

  return (
    <div className="ci">
      <div className="ci__left">
        <img
          alt="img"
          src={`${appConfig.apiProductImage}/${p ? p.product.image : ""}`}
        />
        <p>{p ? p.product.name : "Product"}</p>
      </div>

      <div className="ci__right">
        <div className="ci__right__left">
          <p
            className="text-danger"
            style={{
              fontSize: " 14px",
              textAlign: "right",
            }}
          >
            <FormattedNumber value={p ? p.product.price : 0} /> đ
          </p>

          <input
            type="number"
            value={count}
            onChange={onChangeCount}
            min={1}
            max={10}
            onKeyPress={(e) => e.preventDefault()}
          />
        </div>
        <div className="ci__right__right">
          <button onClick={() => deleteProduct(product.productId)}>
            <i className="fa fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CI;
