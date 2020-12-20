import "./BillSetting.scss";

import React, { useState, useEffect } from "react";
import Axios from "axios";
import { appConfig } from "../../configs/app.config";
import { FormattedNumber } from "react-intl";
import {
  Col, Row, Form, Table,

} from 'reactstrap';
// import Pagination from "react-js-pagination";
// require("bootstrap");
import ReactPaginate from 'react-paginate';
const BillSetting = () => {
  const [bills, setBills] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  useEffect(() => {
    onFetchBill(page);
  }, []);

  var indexPagination=0
  var limit=5
  var limit_bill=5



  const onFetchBill = (page) => {
    Axios.get(`${appConfig.apiUrl}/bill/?page=${page}`).then((res) => {
      console.log(res.data);
      setBills(res.data.data);
      setTotalPage(res.data.totalPage);
    });
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
  const handlePageClick =(data) => {
    let selected = data.selected;
    setPage(selected+1)
    onFetchBill(selected+1)
  }
  return (
    <div className="bill-setting">
      <Row>
        <Col>
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Email</th>
                <th>SĐT</th>
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
                // .sort((e1, e2) => new Date(e2.date) - new Date(e1.date))
                .map((ele, index) => {
                  return (
                    <tr key={ele._id}>
                      <td>{index + 1}</td>
                      {/* <td>{(page-1)*5+index + 1}</td> */}
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
        </Col>
      </Row>
      
      <Row>
        <Col className="d-flex">
        <div className="react-paginate ml-auto">
          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={totalPage}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
        />
      </div>
        </Col>
      </Row>
      
    </div>
  );
};

export default BillSetting;
