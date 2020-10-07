import React, { Component } from 'react';
import { connect } from "react-redux";
import { Card, CardHeader, CardBody, CardFooter,
    Input, Label, Col, FormGroup, Row, Button, Form
} from "reactstrap";
import { toast } from 'react-toastify';
import { Redirect } from "react-router-dom";

import authApi from "../../api/auth.api";

class Password extends Component {
    constructor(props){
        super(props);
        this.state = {
            item: {
                password: "",
                newPassword: "",
                confirmPassword: ""
            }
        }
    }

    onChange = (e) => {
        const {item} = this.state;
        let name = e.target.name;
        let value = e.target.value;
        item[name] = value;
        this.setState({
            item
        })
    }

    changePassword = async () => {
        try {
            const {item} = this.state;
            if (item.newPassword.length < 6 || item.confirmPassword.length < 6 || item.password.length < 6){
                return toast.error("Mật khẩu phải ít nhất 6 ký tự", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
            else if (item.newPassword !== item.confirmPassword){
                return toast.error("Mật khẩu mới không khớp", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
            let kq = await authApi.updatePassword(item);
            if (kq.result){
                toast.success("Thay đổi mật khẩu thành công", {
                    position: toast.POSITION.TOP_RIGHT
                });
                this.setState({
                    item: {
                        password: "",
                        newPassword: "",
                        confirmPassword: ""
                    }
                })
            }
            else{
                return toast.error(kq.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        } catch (error) {
            console.log(error);
        }
        
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.changePassword();
    }

    render() {
        const { item } = this.state;
        const { user } = this.props;
        if (user && user.result === false){
            return <Redirect from="/" to="/" />
        }
        return (
            <Form
                onSubmit={this.onSubmit}
                ref={c => {
                    this.form = c;
                }}
            >
                <Card className="mt-4">
                <CardHeader>
                    <strong>Đổi mật khẩu</strong>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="12">
                            <FormGroup>
                            <Label htmlFor="password">Mật khẩu cũ</Label>
                            <Input type="password" name="password" id="password" value={item.password} onChange={this.onChange} required />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <FormGroup>
                            <Label htmlFor="newPassword">Mật khẩu mới</Label>
                            <Input type="password" id="newPassword" name="newPassword" value={item.newPassword} onChange={this.onChange} required />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12">
                            <FormGroup>
                            <Label htmlFor="confirmPassword">Nhập lại mật khẩu mới</Label>
                            <Input type="password" id="confirmPassword" name="confirmPassword" value={item.confirmPassword} onChange={this.onChange} required />
                            </FormGroup>
                        </Col>
                    </Row>
                </CardBody>
                <CardFooter>
                    <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Xác nhận</Button>
                    <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Hoàn tác</Button>
                </CardFooter>
                </Card>
            </Form>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(Password);