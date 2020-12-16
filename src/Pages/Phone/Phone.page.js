import { connect } from "react-redux";
import React, { Component } from 'react';
import {
    Row, Col, Table, Button, Form, FormGroup, Input,
    Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
    Pagination, PaginationItem, PaginationLink
} from "reactstrap";
import { toast } from "react-toastify";
import CommentApi from "../../api/comment.api";
import { appConfig } from "../../configs/app.config";
import { getProductById } from "../../actions/phone.action";
import Comment from "../../components/common/comment";
import Modal from "../../components/modals/modal.info";
import Modal2 from "../../components/modals/modal.detail";
import Chart from "../../components/common/chart";
import { getCommentList } from "../../actions/comment.action";
import { FormattedNumber } from "react-intl";

class Phone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: {
                productId: this.props.match.params.id,
                // score: 0,
                content: ""
            },
            loading : false,
            listSore: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            nodeScore: 0,
            isOpenModal: false,
            isOpenModalDetail: false,
            doughnut: {
                labels: [
                    'Số điểm',
                ],
                datasets: [
                    {
                        data: [0, 2],
                        backgroundColor: [
                            '#FF6384',
                        ],
                    }],

            },
            options: {
                title: {
                    display: true,
                    text: '5.0/10',
                    position: 'bottom'
                },
                tooltips: {
                    enabled: false
                }
            },
            params: {
                productId: this.props.match.params.id,
                skip: 0
            },
            isOpenDropdownSort: false,
            isOpenDropdownAnalysis: false,
            indexPagination: 0,
            limit_comments: 5
        }
    }

    toggleModalInfo = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }
    toggleModalDetail = () => {
        this.setState({
            isOpenModalDetail: !this.state.isOpenModalDetail

        })
    }

    checkLogin = () => {
        console.log(this.props.user)
        if (this.props.user.role.index === 0) {
            return this.props.history.push("/login", this.props.match.url);
        }
    }

    onChange = (e) => {
        const { comment } = this.state;
        comment.content = e.target.value;
        this.setState({
            comment
        })
    }

    onSubmitComment = async (e) => {
        const { comment } = this.state;
        
        e.preventDefault();
        if (this.props.user.msg) {
            return this.props.history.push("/login", this.props.match.url);
        }
        if (!comment.content.trim()) {
            return toast.error("Bạn phải nhập nhận xét");
        }
        // else if (comment.score === 0){
        //     return toast.error("Bạn phải chọn điểm dánh giá");
        // }
        else {
            this.setState({loading : true})
            let kq = await CommentApi.SentimentAnalysis(comment.content);
            if (kq) {
                comment.analysis = kq[0]
                await CommentApi.AddComment(comment);
                await this.props.getProductById(this.props.match.params.id);
                await this.props.getCommentByProductId(this.state.params);

                comment.content = "";
                // comment.score = 0;
                this.setState({
                    comment,
                    loading : false
                })
            }
        }
    }

    onMouseOver = (e, val) => {
        this.setState({
            nodeScore: val
        })
    }

    onMouseLeave = (e, val) => {
        this.setState({
            nodeScore: 0
        })
    }

    onClick = (e, val) => {
        if (this.props.user.msg) {
            return this.props.history.push("/login", this.props.match.url);
        }

        const { comment } = this.state;
        comment.score = val;
        this.setState({
            comment
        })
    }

    toggleDropdownSort = () => {
        this.setState({
            isOpenDropdownSort: !this.state.isOpenDropdownSort
        })
    }

    toggleDropdownAnalysis = () => {
        this.setState({
            isOpenDropdownAnalysis: !this.state.isOpenDropdownAnalysis
        })
    }

    onClickSelectSort = (sort) => {
        const { params } = this.state;
        params.sort = sort;
        this.setState({
            params
        }, () => this.props.getCommentByProductId(params))
    }

    onClickSelectAnalysis = (analysis) => {
        const { params } = this.state;
        params.analysis = analysis;
        params.skip = 0;
        this.setState({
            params
        }, () => this.props.getCommentByProductId(params))
    }

    onClickPagination = (number, index) => {
        const { params, indexPagination, limit_comments } = this.state;
        const { commentTotal } = this.props.commentData;
        let newIndexPagination = indexPagination;
        params.skip = limit_comments * (number - 1);

        if (index === "-" && indexPagination > 0){
            newIndexPagination = indexPagination - 1;
        }
        else if (index === "+" && commentTotal > params.skip + limit_comments){
            newIndexPagination = indexPagination + 1;
        }

        this.setState({
            params,
            indexPagination: newIndexPagination
        }, () => {
            this.props.getCommentByProductId(this.state.params);
        })
    }

    componentDidMount() {
        this.props.getProductById(this.props.match.params.id);
        this.props.getCommentByProductId(this.state.params);
    }

    render() {
        const { isOpenModal,isOpenModalDetail, comment, params, isOpenDropdownAnalysis, isOpenDropdownSort, indexPagination, limit_comments } = this.state;
        const { phoneInfo, commentData } = this.props;
        const { commentList, commentTotal } = commentData;
        const { phone } = phoneInfo;
        let currentList = commentList ? commentList.length : 0;
        console.log(commentTotal, currentList,comment)
        return (
            <div >
                {
                    phone &&
                    <Modal
                        isOpen={isOpenModal}
                        name={phone.product.name}
                        productDetail={phone.productDetail}
                        toggle={this.toggleModalInfo}
                    />
                }

{
                    phone &&
                    <Modal2
                        isOpen={isOpenModalDetail}
                        name={phone.product.name}
                        productDetail={phone.productDetail}
                        toggle={this.toggleModalDetail}
                    />
                }


                <h3 className="border-bottom d-flex align-items-center pt-2">{phone ? phone.product.name : ""}</h3>
                <Row>
                    <Col xs="12" sm="4">
                    <Row>
                    <img alt="" height="250" width="auto" style={{margin :"auto"}} src={phone ? `${appConfig.apiProductImage}/${phone.product.image}` : ""} ></img>

                    </Row>

                        <Row>
                        <span className="text-danger" style={{margin : "auto", fontWeight : "bold", fontSize: " 30px"}}><FormattedNumber value={phone ?phone.product.price : ""}/> đ</span>
                        </Row>
                        </Col>

                    <Col xs="12" sm="4">
                        {/* <Doughnut data={doughnut} options={options} /> */}
                        {
                            phone && <Chart dataComments={phone.comments} ></Chart>
                        }
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0 ">
                        <Row>
                        <Button color="secondary" className="btn-pill" onClick={this.toggleModalDetail} style={{margin : "auto"}}>Xem đánh giá chi tiết </Button>

                        </Row>
                    </Col>

                    <Col xs="12" sm="8">
                        <h4>Nhận xét</h4>
                        <Form onSubmit={e => this.onSubmitComment(e)}>
                            <FormGroup className="form-group-comment">
                                {/* <Label for="">
                                    <div className="d-flex">
                                        <span className="d-flex align-items-center mr-4">
                                            Điểm sản phẩm: 
                                        </span>
                                        {
                                            listSore.map((val, idx) => {
                                                return <Score 
                                                onMouseOver={(e) => this.onMouseOver(e, val)}  
                                                onMouseLeave={(e) => this.onMouseLeave(e, val)}
                                                onClick={(e) => this.onClick(e, val)}
                                                key={idx} 
                                                sizeScore="mini"
                                                classname="score-hover"
                                                select={val <= nodeScore || val <= comment.score}>{val}</Score>
                                            })
                                        }
                                    </div>
                                </Label> */}
                                {/* onClick={this.checkLogin} */}
                                <Input value={comment.content} onChange={e => this.onChange(e)}   style={{ height: "100px", maxHeight: "250px", minHeight: "56px" }} type="textarea" name="text" id="exampleText" />
                                <Button className="btn-send-comment" outline color="dark">Gửi</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col xs="12" sm="4">
                        <h4>Thông số kỹ thuật</h4>
                        {phone && phone.productDetail &&
                            <div>
                                <Table>
                                    <tbody>
                                        <tr>
                                            <td style={{ width: "150px" }}>Màn hình</td>
                                            <td>{phone.productDetail.screen ? phone.productDetail.screen.screenTechnology : ""}</td>
                                        </tr>
                                        <tr>
                                            <td>Hệ điều hành</td>
                                            <td>{phone.productDetail.platform ? phone.productDetail.platform.os : ""}</td>
                                        </tr>
                                        <tr>
                                            <td>Camera trước</td>
                                            <td>{phone.productDetail.selfieCamera ? phone.productDetail.selfieCamera.resolution : ""}</td>
                                        </tr>
                                        <tr>
                                            <td>Camera sau</td>
                                            <td>{phone.productDetail.mainCamera ? phone.productDetail.mainCamera.resolution : ""}</td>
                                        </tr>
                                        <tr>
                                            <td>CPU</td>
                                            <td>{phone.productDetail.platform ? phone.productDetail.platform.cpu : ""}</td>
                                        </tr>
                                        <tr>
                                            <td>RAM</td>
                                            <td>{phone.productDetail.memory ? phone.productDetail.memory.ram : ""}</td>
                                        </tr>
                                        <tr>
                                            <td>Bộ nhớ trong</td>
                                            <td>{phone.productDetail.memory ? phone.productDetail.memory.rom : ""}</td>
                                        </tr>
                                        <tr>
                                            <td>Thẻ nhớ</td>
                                            <td>{phone.productDetail.memory ? phone.productDetail.memory.cardSlot : ""}</td>
                                        </tr>
                                        <tr>
                                            <td>Thẻ SIM</td>
                                            <td>{phone.productDetail.comms ? phone.productDetail.comms.sim : ""}</td>
                                        </tr>
                                        <tr>
                                            <td>Dung lượng pin</td>
                                            <td>{phone.productDetail.battery ? phone.productDetail.battery.capacity : ""}</td>
                                        </tr>
                                    </tbody>

                                </Table>
                                <Button className="mb-2" outline color="primary" size="lg" onClick={this.toggleModalInfo} block>Xem cấu hình chi tiết</Button>
                            
                            </div>
                        }
                    </Col>

                    <Col xs="12" sm="8">
                        <div className="d-flex mb-2">
                            <h4>Nhận xét khác</h4>
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

                                <Dropdown isOpen={isOpenDropdownAnalysis} toggle={this.toggleDropdownAnalysis}>
                                    <DropdownToggle caret>
                                        {params.analysis ? params.analysis : "Tất cả"}
                                    </DropdownToggle>
                                    <DropdownMenu className="">
                                        <DropdownItem onClick={e => this.onClickSelectAnalysis()}>Tất cả</DropdownItem>
                                        <DropdownItem onClick={e => this.onClickSelectAnalysis("tích cực")}>Tích cực</DropdownItem>
                                        <DropdownItem onClick={e => this.onClickSelectAnalysis("tiêu cực")}>Tiêu cực</DropdownItem>
                                        <DropdownItem onClick={e => this.onClickSelectAnalysis("bình thường")}>Bình thường</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>
                        {
                            this.state.loading && <Comment className = "blur" user={this.props.user} comment={comment} sizeScore="large"></Comment>
                        }
                        {commentList && commentList.map((val, idx) => {
                            return <Comment key={idx} user={val.userId} comment={val} sizeScore="large"></Comment>
                        })}
                        <div className="d-flex">
                            {commentTotal > currentList &&

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
                                            commentTotal > limit_comments &&
                                            <PaginationItem active={(params.skip > 0 && params.skip + limit_comments < commentTotal) || (params.skip > 0 && commentTotal <= limit_comments * 2)}>
                                                <PaginationLink onClick={e => this.onClickPagination(indexPagination + 2)} tag="button">
                                                    {indexPagination + 2}
                                                </PaginationLink>
                                            </PaginationItem>
                                        }
                                        {
                                            commentTotal > limit_comments * 2 &&
                                            <PaginationItem active={params.skip + limit_comments >= commentTotal}>
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
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        phoneInfo: state.phone,
        user: state.auth.user,
        commentData: state.comment
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getProductById: (id) => {
            dispatch(getProductById(id));
        },
        getCommentByProductId: (params) => {
            dispatch(getCommentList(params))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Phone);