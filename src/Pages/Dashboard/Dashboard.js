import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Bar } from "react-chartjs-2";


import {
    Row,
    Col,
    Card,
    CardTitle,
    CardText,
    Table,
    Button,
    Form,
    FormGroup,
    Input,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Pagination,
    PaginationItem,
    PaginationLink,
  } from "reactstrap"
  import { NavLink } from "react-router-dom";

  import "./Dashboard.scss";

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [totalUser, setTotalUser] = useState(0);
    const [totalBill, setTotalBill] = useState(0);
    const [totalProduct, setTotalProduct] = useState(0);

    useEffect(() => {
        Axios.get(`http://localhost:3001/bill/statistica`).then((res) => {
         // console.log(1111111,res);
          setData(res.data.data)
         // console.log(2222222,data);
          //setTotalUser(3);
          //console.log(333333,totalUser);
          setTotalUser(res.data.totalUser)
          setTotalBill(res.data.totalBill)
          setTotalProduct(res.data.totalProduct)
        });
    } , []);



    return(
        <div className="dash-board">
            <div className="info">
                <Row>
                    <Col>
                        <Card body className="text-center">
                            <CardTitle tag="h5">Số lượng người dùng</CardTitle>
                            <CardText>{totalUser}</CardText>
                            <NavLink to={`/nguoi-dung`}>
                                <Button>Chi tiết</Button>
                            </NavLink>
                        </Card>
                        
                        
                    </Col>
                    <Col>
                        <Card body className="text-center">
                            <CardTitle tag="h5">Số lượng loại điện thoại</CardTitle>
                            <CardText>{totalProduct}</CardText>
                            <NavLink to={`/quanlydienthoai`}>
                                <Button>Chi tiết</Button>
                            </NavLink>
                        </Card>
                    </Col>
                    <Col>
                        <Card body className="text-center">
                            <CardTitle tag="h5">Số lượng đơn đặt hàng</CardTitle>
                            <CardText>{totalBill}</CardText>
                            <NavLink to={`/don-hang`}>
                                <Button>Chi tiết</Button>
                            </NavLink>
                        </Card>
                    </Col>
                </Row>
            </div>
            <div className="chart">
                <Row>
                    <Col>
                        <Bar
                            data={{
                            labels: [
                                "Tháng 1",
                                "Tháng 2",
                                "Tháng 3",
                                "Tháng 4",
                                "Tháng 5",
                                "Tháng 6",
                                "Tháng 7",
                                "Tháng 8",
                                "Tháng 9",
                                "Tháng 10",
                                "Tháng 11",
                                "Tháng 12",
                            ],
                            datasets: [
                                {
                                label: "Số lượng đơn: ",
                                backgroundColor: [
                                    "rebeccapurple",
                                    "rebeccapurple",
                                    "rebeccapurple",
                                    "rebeccapurple",
                                    "rebeccapurple",
                                    "rebeccapurple",
                                    "rebeccapurple",
                                    "rebeccapurple",
                                    "rebeccapurple",
                                    "rebeccapurple",
                                    "rebeccapurple",
                                    "rebeccapurple",
                                ],
                                data: data
                                }
                            ]
                            }}
                            options={{
                            legend: { display: false },
                            title: {
                                display: true,
                                text: "Thống kê số đơn đặt hàng trong năm",
                                fontSize:20,
                                fontColor:'rebeccapurple'
                            }
                            }}
                        />
                    </Col>
                </Row>
            
            </div>
        </div>
 
    );


};
export default Dashboard;
