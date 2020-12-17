import "./BillSetting.css";

import React, { useState, useEffect } from "react";
import Axios from "axios";
import { appConfig } from "../../configs/app.config";
import { FormattedNumber } from "react-intl";

const BillSetting = () => {
  const [bills, setBills] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  useEffect(() => {
    onFetchBill(page);
  }, []);

  const onFetchBill = (page) => {
    Axios.get(`${appConfig.apiUrl}/bill/?page=${page}`).then((res) => {
      console.log(res.data);
      setBills(res.data.data);
      setTotalPage(res.data.totalPage);
    });
  };

  const preButtonClick = () => {
    if (page !== 1) {
      setPage(page - 1);
      onFetchBill(page - 1);
    }
  };
  const nextButtonClick = () => {
    if (totalPage !== page) {
      setPage(page + 1);
      onFetchBill(page + 1);
    }
  };

  const changeStatus = (billId) => {
    Axios.put(`${appConfig.apiUrl}/bill/update/${billId}`);
    setBills(
      bills.map((ele) => {
        if (ele._id === billId) return { ...ele, status: true };
        return ele;
      })
    );
  };
  return (
    <div className="bill-setting">
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>email</th>
            <th>SDT</th>
            <th>Địa chỉ</th>
            <th>Sản phẩm</th>
            <th>Số lượng</th>
            <th>Tổng giá tiền</th>
            <th>Ngày</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {bills
            .sort((e1, e2) => new Date(e2.date) - new Date(e1.date))
            .map((ele, index) => {
              return (
                <tr key={ele._id}>
                  <td>{index + 1}</td>
                  <td>{ele.email}</td>
                  <td>{ele.phone}</td>
                  <td>{ele.address}</td>
                  <td>
                    <ol>
                      {ele.products.map((ele, index) => {
                        return <li key={index}>{ele.name}</li>;
                      })}
                    </ol>
                  </td>
                  <td>
                    <ol>
                      {ele.products.map((ele, index) => {
                        return <li key={index}>{ele.count}</li>;
                      })}
                    </ol>
                  </td>
                  <td>
                    <span
                      className="text-danger"
                      style={{
                        fontSize: " 15px",
                        textAlign: "left",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <FormattedNumber value={ele.totalPrice} /> đ
                    </span>
                  </td>
                  <td>{new Date(ele.date).toLocaleString()}</td>
                  <td>
                    <button
                      className={ele.status ? "disable" : ""}
                      onClick={() => changeStatus(ele._id)}
                    >
                      {ele.status ? "Đã duyệt" : "Duyệt"}
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="bill-setting__footer">
        <button onClick={preButtonClick}>&#10094;</button>
        <p>{page}</p>
        <button onClick={nextButtonClick}> &#10095; </button>
      </div>
    </div>
  );
};

export default BillSetting;
