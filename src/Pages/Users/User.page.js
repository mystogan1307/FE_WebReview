import React, { Component } from 'react';
import { connect } from "react-redux";
import {
    Button, Col, Row, Table,
    Input,
    InputGroup, InputGroupAddon,
    Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
    Pagination, PaginationItem, PaginationLink
} from 'reactstrap';
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

import ModalConfirm from "../../components/modals/modal.comfirm";
import { getUserList } from "../../actions/user.action";
import UserApi from "../../api/user.api";
import "./UserPage.scss"

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpenModal: false,
            isShowModalConfirm: false,
            isOpenDropdownSort: false,
            isOpenDropdownActive: false,
            params: {
                skip: 0
            },
            userItem: {
            },
            indexPagination: 0,
            limit_users: 5
        }
    }

    toggleConfirmModal = (title = "", user = {}) => {
        this.setState({
            isShowModalConfirm: !this.state.isShowModalConfirm,
            title,
            userItem: {
                id: user._id,
                isDelete: !user.isDelete
            }
        })
    }

    showConfirmModal = (title, user) => {
        this.toggleConfirmModal(title, user);
    }

    toggleDropdownSort = () => {
        this.setState({
            isOpenDropdownSort: !this.state.isOpenDropdownSort
        })
    }

    toggleDropdownActive = () => {
        this.setState({
            isOpenDropdownActive: !this.state.isOpenDropdownActive
        })
    }

    confirmUser = async () => {
        try {
            const user = Object.assign({}, this.state.userItem);
            await UserApi.updateUser(user);
            this.toggleConfirmModal();
            this.props.getUsers()
        } catch (error) {
            console.log(error);            
        }
    }

    onSearchChange = (e) => {
        const {params} = this.state;
        params.name = e.target.value;
        this.setState({
            params
        }, () => {
            // this.props.getUsers(this.state.params);
        })
    }

    onClickSearch = () => {
        this.props.getUsers(this.state.params);
    }

    onClickSelectSort = (sort) => {
        const {params} = this.state;
        params.sort = sort;
        this.setState({
            params
        }, () => this.props.getUsers(this.state.params))
    }

    onClickSelectActive = (isDelete) => {
        const {params} = this.state;
        params.isDelete = isDelete;
        this.setState({
            params
        }, () => this.props.getUsers(this.state.params))
    }

    onClickPagination = (number, index) => {
        const {params, indexPagination, limit_users} = this.state;
        const {userTotal} = this.props.data;
        let newIndexPagination = indexPagination;
        params.skip = limit_users * (number - 1);

        if (index === "-" && indexPagination > 0){
            newIndexPagination = indexPagination - 1;
        }
        else if (index === "+" && params.skip + limit_users < userTotal){
            newIndexPagination = indexPagination + 1;
        }
        this.setState({
            params,
            indexPagination: newIndexPagination
        },() => {
            this.props.getUsers(this.state.params);
        })
    }

    componentDidMount() {
        this.props.getUsers();
    }

    render() {
        const { title, isShowModalConfirm, params, isOpenDropdownSort, isOpenDropdownActive, indexPagination, limit_users } = this.state;
        const { data, user } = this.props;
        const { userList, userTotal } = data;
        const currentList = userList ? userList.length : 0;
        if (user && user.role && user.role.index !== 1){
            return <Redirect from="/" to="/" />
        }
        return (
            <div className="user-page">
                <ModalConfirm
                    title={title}
                    isShowModal={isShowModalConfirm}
                    clickOk={this.confirmUser}
                    toggleModal={e => this.toggleConfirmModal()}
                />
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

                            <Dropdown isOpen={isOpenDropdownActive} toggle={this.toggleDropdownActive}>
                                <DropdownToggle caret>
                                    {params.isDelete ? "Khóa" : params.isDelete === false ? "Hoạt động" : "Tất cả"}
                                </DropdownToggle>
                                <DropdownMenu className="">
                                <DropdownItem onClick={e => this.onClickSelectActive()}>Tất cả</DropdownItem>
                                    <DropdownItem onClick={e => this.onClickSelectActive(false)}>Hoạt động</DropdownItem>
                                    <DropdownItem onClick={e => this.onClickSelectActive(true)}>Khóa</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>

                            <InputGroup>
                                <Input onChange={this.onSearchChange} className="input-search" type="text" id="input1-group2" name="search" placeholder="Nhập email, username" />
                                <InputGroupAddon addonType="prepend">
                                    <Button onClick={this.onClickSearch} type="button" color="primary"><i className="fa fa-search"></i> Search</Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Table hover bordered responsive size="sm">

                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>Username</th>
                                    <th>Trạng thái</th>
                                    <th>Khóa / Mở</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userList && userList.map((val, idx) =>
                                        <tr key={idx}>
                                            <td>{val.local.email}</td>
                                            <td>{val.username}</td>
                                            <td>{val.isDelete ? "Khóa" : "Hoạt động"}</td>
                                            <td width="20%">
                                                {
                                                    val.isDelete ?
                                                        <Button
                                                            className="btn btn-primary fa fa-unlock"
                                                            onClick={() => this.showConfirmModal("Bạn muốn mở khóa tài khoản này", val)} />
                                                        :
                                                        <Button
                                                            className="btn btn-danger fa fa-lock"
                                                            onClick={() => this.showConfirmModal("Bạn muốn khóa tài khoản này", val)} />
                                                }
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    {userTotal > currentList &&
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
                                        userTotal > limit_users &&
                                        <PaginationItem active={(params.skip > 0 && params.skip + limit_users < userTotal) || (params.skip > 0 && userTotal <= limit_users * 2)}>
                                            <PaginationLink onClick={e => this.onClickPagination(indexPagination + 2)} tag="button">
                                                {indexPagination + 2}
                                            </PaginationLink>
                                        </PaginationItem>
                                    }
                                    {
                                        userTotal > limit_users * 2 &&
                                        <PaginationItem active={params.skip + limit_users >= userTotal}>
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
        data: state.user,
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getUsers: (params) => {
            dispatch(getUserList(params));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);