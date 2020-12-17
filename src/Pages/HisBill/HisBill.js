import "./HisBill.css";

import React, { useState, useEffect } from "react";
import { appConfig } from "../../configs/app.config";
import Axios from "axios";
import { FormattedNumber } from "react-intl";

const HisBill = ({ match: { params }, ...otherProps }) => {
  const [bills, setBills] = useState([]);
  useEffect(() => {
    Axios.get(`${appConfig.apiUrl}/bill/${params.id}`).then((res) => {
      setBills(res.data.data);
    });
  }, []);
  console.log(bills);
  return (
    <div className="his-bill">
      {bills.length ? (
        <>
          <p>Đơn đã đặt</p>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Sản phẩm</th>
                <th>Tổng số lượng</th>
                <th>Tổng tiền</th>
                <th>Địa chỉ nhận hàng</th>
                <th>Ngày đặt hàng</th>
                <th>Trạng thái đơn hàng</th>
              </tr>
            </thead>
            <tbody>
              {bills
                .sort((e1, e2) => new Date(e2.date) - new Date(e1.date))
                .map((ele, index) => {
                  const sumCount = ele.products
                    .map((ele) => +ele.count)
                    .reduce((pre, cur) => pre + cur, 0);

                  return (
                    <tr key={ele._id}>
                      <td>{index + 1}</td>
                      <td>
                        <ol>
                          {ele.products.map((ele) => {
                            return <li key={ele.productId}>{ele.name}</li>;
                          })}
                        </ol>
                      </td>
                      <td>{sumCount}</td>
                      <td>
                        <span
                          className="text-danger"
                          style={{
                            fontSize: " 15px",
                            textAlign: "left",
                          }}
                        >
                          <FormattedNumber value={ele.totalPrice} /> đ
                        </span>
                      </td>
                      <td>{ele.address}</td>
                      <td>{new Date(ele.date).toLocaleString()}</td>
                      <td>{ele.status ? "Đã duyệt" : "Chưa duyệt"}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </>
      ) : (
        <p style={{ textAlign: "center", fontSize: "30px", fontWeight: "500" }}>
          Bạn chưa đặt đơn hàng nào.
        </p>
      )}
    </div>
  );
};

export default HisBill;
