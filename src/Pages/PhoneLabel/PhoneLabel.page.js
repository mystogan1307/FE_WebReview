import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    Button, Col, Row, Form, Table,
    Label, Input, FormGroup,
    InputGroup, InputGroupAddon,
    Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
    Pagination, PaginationItem, PaginationLink
} from 'reactstrap';
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

import Modal from "../../components/modals/modal";
import ModalConfirm from "../../components/modals/modal.comfirm";
import { getLabelList } from "../../actions/label.action";
import LabelApi from "../../api/label.api";

class PhoneLabel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpenModal: false,
            isShowModalConfirm: false,
            isOpenDropdownSort: false,
            params: {
                skip: 0,
                limit: 5
            },
            labelItem: {
                name: ""
            },
            indexPagination: 0,
            limit_labels: 5
        }
    }

    toggleModal = (title, labelItem = {}) => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
            title,
            labelItem
        })
    }

    toggleDeleteModal = (labelItem = {}) => {
        this.setState({
            isShowModalConfirm: !this.state.isShowModalConfirm,
            labelItem
        })
    }

    toggleDropdownSort = () => {
        this.setState({
            isOpenDropdownSort: !this.state.isOpenDropdownSort
        })
    }

    onHandleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        const { labelItem } = this.state;
        labelItem[name] = value;
        this.setState({
            labelItem
        })
    }

    checkLabel = () => {
        const { data } = this.props;
        const { labelList } = data;
        let labelItem = Object.assign({}, this.state.labelItem);
        labelItem.name = labelItem.name.trim();
        let repeatLabel = labelList.every((label) => {
            return label.name.toLowerCase() !== labelItem.name.toLowerCase()
        })
        if (labelItem.name.length === 0) {
            toast.error("Bạn phải nhập hãng sản xuất");
            return { result: false, labelItem };
        }
        else if (!repeatLabel) {
            toast.error("Tên hãng sản xuất đã tồn tại");
            return { result: false, labelItem };
        }
        return { result: true, labelItem };
    }

    addLabel = async () => {
        try {
            let check = this.checkLabel();
            if (check.result) {
                await LabelApi.addLabel(check.labelItem);
                let labelItem = {
                    name: ""
                }
                this.props.getLabelList();
                this.toggleModal("", labelItem);
            }
        } catch (error) {
            console.log(error)            
        }
    }

    updateLabel = async () => {
        try {
            let check = this.checkLabel();
            if (check.result) {
                await LabelApi.updateLabel(check.labelItem);
                let labelItem = {
                    name: ""
                }
                this.props.getLabelList(this.state.params);
                this.toggleModal("", labelItem);
            }
        } catch (error) {
            console.log(error)            
        }
    }

    deleteLabel = async () => {
        const { id } = this.state.labelItem;
        try {
            await LabelApi.deleteLabel(id);
            this.props.getLabelList();
            this.toggleDeleteModal()
        } catch (error) {
            console.log(error.message);
        }
    }

    saveLabel = () => {
        let id = this.state.labelItem.id;
        if (id) {
            this.updateLabel();
        }
        else {
            this.addLabel();
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.saveLabel();
    }

    showAddNew = () => {
        let title = "Thêm mới"
        let labelItem = {
            name: ""
        }
        this.toggleModal(title, labelItem);
    }

    showUpdateModal = (label) => {
        const { labelItem } = this.state;
        labelItem.name = label.name;
        labelItem.id = label._id;
        this.toggleModal("Chỉnh sửa", labelItem)
    }

    showConfirmDelete = (id) => {
        const { labelItem } = this.state;
        labelItem.id = id;
        this.toggleDeleteModal(labelItem)
    }

    onClickSelectSort = (sort) => {
        const { params } = this.state;
        params.sort = sort;
        this.setState({
            params
        }, () => this.props.getLabelList(this.state.params));
    }

    onClickPagination = (number, index) => {
        const {params, indexPagination, limit_labels} = this.state;
        const {labelTotal} = this.props.data;
        let newIndexPagination = indexPagination;
        params.skip = limit_labels * (number - 1);

        if (index === "-" && indexPagination > 0){
            newIndexPagination = indexPagination - 1;
        }
        else if (index === "+" && params.skip + limit_labels < labelTotal){
            newIndexPagination = indexPagination + 1;
        }
        this.setState({
            params,
            indexPagination: newIndexPagination
        },() => {
            this.props.getLabelList(this.state.params);
        })
    }

    onSearchChange = (e) => {
        const {params} = this.state;
        params.name = e.target.value;
        this.setState({
            params
        }, () => {
            // this.props.getLabelList(this.state.params)
        })
    }

    onClickSearch = () => {
        this.props.getLabelList(this.state.params)
    }

    componentDidMount() {
        this.props.getLabelList(this.state.params)
    }

    render() {
        const { isOpenModal, labelItem, title, isShowModalConfirm, params, isOpenDropdownSort, indexPagination, limit_labels } = this.state;
        const { data, user } = this.props;
        const { labelList, labelTotal } = data;
        const currentList = labelList ? labelList.length : 0;
        if (user && user.role && user.role.index !== 1){
            return <Redirect from="/" to="/" />
        }
        return (
            <div>
                <ModalConfirm
                    isShowModal={isShowModalConfirm}
                    clickOk={this.deleteLabel}
                    toggleModal={this.toggleDeleteModal}
                />

                <Modal
                    isOpen={isOpenModal}
                    toggle={e => this.toggleModal()}
                    title={title}
                    hiddenFooter={true}
                >
                    <Form onSubmit={e => this.onSubmit(e)}
                        ref={c => {
                            this.form = c;
                        }}
                    >
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label for="name">Hãng sản xuất</Label>
                                    <Input type="text" name="name" id="name"
                                        value={labelItem.name || ""} onChange={this.onHandleChange}
                                        required
                                    />
                                </Col>
                            </Row>
                        </FormGroup>

                        <div className="text-center border-top pt-2">
                            <Button color="primary" type="submit"> Xác nhận </Button>{" "}
                            <Button className="btn-danger" onClick={e => this.toggleModal()}> Hủy </Button>
                        </div>
                    </Form>

                </Modal>
                <Row className="mt-2 mb-4 pb-2 border-bottom">
                    <Col lg="2" className="mb-3 mb-xl-0">
                        <Button onClick={this.showAddNew} block color="primary">Thêm mới</Button>
                    </Col>
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

                            <InputGroup>
                                <Input onChange={this.onSearchChange} className="input-search" type="text" id="input1-group2" name="search" placeholder="Nhập tên hãng điện thoại" />
                                <InputGroupAddon addonType="prepend">
                                    <Button onClick={this.onClickSearch} type="button" color="primary"><i className="fa fa-search"></i> Search</Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Table hover bordered responsive >

                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên</th>
                                    <th>Chỉnh sửa / Xóa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    labelList && labelList.map((val, idx) =>
                                        <tr key={idx}>
                                            <td>{++idx}</td>
                                            <td>{val.name}</td>
                                            <td width="20%">
                                                <Button
                                                    className="btn btn-primary fa fa-pencil"
                                                    onClick={() => this.showUpdateModal(val)} />
                                                <Button
                                                    className="btn btn-danger fa fa-trash"
                                                    onClick={() => this.showConfirmDelete(val._id)} />
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    {labelTotal > currentList &&
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
                                        labelTotal > limit_labels &&
                                        <PaginationItem active={(params.skip > 0 && params.skip + limit_labels < labelTotal) || (params.skip > 0 && labelTotal <= limit_labels * 2)}>
                                            <PaginationLink onClick={e => this.onClickPagination(indexPagination + 2)} tag="button">
                                                {indexPagination + 2}
                                            </PaginationLink>
                                        </PaginationItem>
                                    }
                                    {
                                        labelTotal > limit_labels * 2 &&
                                        <PaginationItem active={params.skip + limit_labels >= labelTotal}>
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
        data: state.labelList,
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getLabelList: (params) => {
            dispatch(getLabelList({...params, limit: 5}))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneLabel);