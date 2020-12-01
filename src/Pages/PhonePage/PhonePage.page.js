import React, { Component } from 'react';
import {
    Button, Col, Row, Input,
    InputGroup, InputGroupAddon,
    Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
    Pagination, PaginationItem, PaginationLink
} from 'reactstrap';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedNumber } from "react-intl";

import { appConfig } from "../../configs/app.config";
import { getProducts } from "../../actions/phone.action";
import { getLabelList } from "../../actions/label.action";

class PhonePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpenDropdownLabel: false,
            isOpenDropdownSort: false,
            params: {
                skip: 0
            },
            label: ["iPhone", "Samsung", "OPPO", "Xiaomi", "Realme", "Vivo", "Nokia", "VSmart",
                "Huawei", "HONOR", "Masstel", "Itel", "BlackBerry", "mobell", "coolpad"],
            indexPagination: 0,
            limit_products: 8
        }
    }

    componentDidMount() {
        this.props.getProducts();
        this.props.getLabel();
    }

    toggleDropdownSort = () => {
        this.setState({
            isOpenDropdownSort: !this.state.isOpenDropdownSort
        })
    }

    toggleDropdownLabel = () => {
        this.setState({
            isOpenDropdownLabel: !this.state.isOpenDropdownLabel
        })
    }

    onClickSelectSort = (sort) => {
        const { params } = this.state;
        params.sort = sort;
        this.setState({
            params
        }, () => {
            this.props.getProducts(this.state.params);
        })
    }

    onClickSelectLabel = (labelId, labelName) => {
        const { params } = this.state;
        params.label = labelId;
        params.labelName = labelName;
        params.skip = 0;
        this.setState({
            params,
            indexPagination: 0
        }, () => {
            this.props.getProducts(this.state.params);
        })
    }

    onSearchChange = (e) => {
        const { params } = this.state;
        params.name = e.target.value;
        this.setState({
            params
        }, () => {
            // this.props.getProducts(this.state.params)
        })
    }

    onClickSearch = () => {
        const { params } = this.state;
        this.props.getProducts(params);
    }

    onClickPagination = (number, index) => {
        const { params, indexPagination, limit_products } = this.state;
        const { phoneTotal } = this.props.data;
        let newIndexPagination = indexPagination;
        params.skip = limit_products * (number - 1);

        if (index === "-" && indexPagination > 0) {
            newIndexPagination = indexPagination - 1;
        }
        else if (index === "+" && params.skip + limit_products < phoneTotal) {
            newIndexPagination = indexPagination + 1;
        }
        this.setState({
            params,
            indexPagination: newIndexPagination
        }, () => {
            this.props.getProducts(this.state.params);
        })
    }

    render() {
        const { isOpenDropdownLabel, params, isOpenDropdownSort, indexPagination, limit_products } = this.state;
        const { data, label } = this.props;
        const { phoneList, phoneTotal } = data;
        const currentList = phoneList ? phoneList.length : 0;
        return (
            <div>
                <Row className="mt-2 mb-4 pb-2 border-bottom">

                    <Col className="mb-3 mb-xl-0 d-flex align-items-center">
                        <div className="ml-auto d-flex">
                            <Dropdown isOpen={isOpenDropdownSort} toggle={this.toggleDropdownSort}>
                                <DropdownToggle caret>
                                    {params.sort > 0 ? "Cũ nhất" : "Mới nhất"}
                                </DropdownToggle>
                                <DropdownMenu className="">
                                    <DropdownItem onClick={e => this.onClickSelectSort(-1)}>Mới nhất</DropdownItem>
                                    <DropdownItem onClick={e => this.onClickSelectSort(1)}>Cũ nhất</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>

                            {/* <Dropdown isOpen={isOpenDropdownLabel} toggle={this.toggleDropdownLabel}>
                                <DropdownToggle caret>
                                    {params.label ? params.label : "Tất cả"}
                                </DropdownToggle>
                                <DropdownMenu className="">
                                    <DropdownItem onClick={e => this.onClickSelectLabel()}>Tất cả</DropdownItem>
                                    {label.map((val, idx) =>
                                        <DropdownItem onClick={e => this.onClickSelectLabel(val)} key={idx}>{val}</DropdownItem>)}
                                </DropdownMenu>
                            </Dropdown>
                             */}
                            <Dropdown isOpen={isOpenDropdownLabel} toggle={this.toggleDropdownLabel}>
                                <DropdownToggle caret>
                                    {params.labelName ? params.labelName : "Tất cả"}
                                </DropdownToggle>
                                <DropdownMenu className="">
                                    <DropdownItem onClick={e => this.onClickSelectLabel()}>Tất cả</DropdownItem>
                                    {label && label.map((val, idx) =>
                                        <DropdownItem onClick={e => this.onClickSelectLabel(val._id, val.name)} key={idx}>{val.name}</DropdownItem>)}
                                </DropdownMenu>
                            </Dropdown>
                            <InputGroup>
                                <Input onChange={this.onSearchChange} className="input-search" type="text" id="input1-group2" name="search" placeholder="Nhập tên điện thoại" />
                                <InputGroupAddon addonType="prepend">
                                    <Button onClick={this.onClickSearch} type="button" color="primary"><i className="fa fa-search"></i> Search</Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </div>
                    </Col>
                </Row>

                <Row>
                    {phoneList && phoneList.map((val, idx) =>
                        <Col key={idx} className="mb-4 phone_item" xs="12" sm="6" lg="3">
                            <NavLink to={`/dien-thoai/${val._id}`}>
                                <img className="image-hover" alt="" height="250" width="auto" src={`${appConfig.apiProductImage}/${val.image ? val.image : 'default-phone.png'}`} ></img>
                                <h6 className="pt-2">{val.name.length > 30 ? val.name.slice(0, 28) + "..." : val.name}</h6>
                            </NavLink>
                            <span className="text-danger"><FormattedNumber value={val.price} /> đ</span>
                            <p>{val.commentAmount} bình luận</p>
                        </Col>
                    )}
                </Row>

                <Row>
                    {phoneTotal > currentList &&
                        <Col className="d-flex">
                            <div className="ml-auto">
                                <Pagination >
                                    <PaginationItem>
                                        <PaginationLink previous tag="button" />
                                    </PaginationItem>
                                    <PaginationItem active={params.skip === 0}>
                                        <PaginationLink onClick={e => this.onClickPagination(indexPagination + 1, "-")} tag="button">
                                            {indexPagination + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                    {
                                        phoneTotal > limit_products &&
                                        <PaginationItem active={(params.skip > 0 && params.skip + limit_products < phoneTotal) || (params.skip > 0 && phoneTotal <= limit_products * 2)}>
                                            <PaginationLink onClick={e => this.onClickPagination(indexPagination + 2)} tag="button">
                                                {indexPagination + 2}
                                            </PaginationLink>
                                        </PaginationItem>
                                    }
                                    {
                                        phoneTotal > limit_products * 2 &&
                                        <PaginationItem active={params.skip + limit_products >= phoneTotal}>
                                            <PaginationLink onClick={e => this.onClickPagination(indexPagination + 3, "+")} tag="button">
                                                {indexPagination + 3}
                                            </PaginationLink>
                                        </PaginationItem>
                                    }
                                    <PaginationItem>
                                        <PaginationLink next tag="button" />
                                    </PaginationItem>
                                </Pagination>
                            </div>
                        </Col>
                    }
                </Row>

            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        data: state.phoneList,
        label: state.labelList.labelList
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getProducts: (params) => {
            dispatch(getProducts(params))
        },
        getLabel: () => {
            dispatch(getLabelList())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhonePage);