import React, { Component } from 'react';
import {
    Row, Col, Button, Form, FormGroup, Label, Input,
    Card, CardHeader, CardBody, CardFooter
} from "reactstrap";
import {Redirect} from "react-router-dom";
import { connect } from "react-redux";
import { appConfig } from "../../configs/app.config";
import { getProfileUser } from "../../actions/auth.action";
import authApi from "../../api/auth.api";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {}
        }
    }

    componentDidMount() {
        // this.props.getProfileUser();
    }

    onChange = (e) => {
        const { profile } = this.state;
        let name = e.target.name;
        let value = e.target.value;
        profile[name] = value;

        this.setState({
            profile
        })
    }

    onFileChange = (event) => {
        let profile = Object.assign({}, this.state.profile);
        var name = event.target.name;
        var value = event.target.files[0];
        
        if (value){
            profile[name] = value;
            let avatar = document.getElementById("avatar");
            avatar.src = ''

            let fileReader = new FileReader();
            fileReader.onload = function (elment) {
                avatar.src = elment.target.result;
            }
            fileReader.readAsDataURL(value);
        }
        this.setState({
            profile
        });
    }

    updateAvatar = async (avatar) => {
        try {
            let avatarResult = await authApi.updateAvatar(avatar);
            return avatarResult.filename
        } catch (error) {
            console.log(error.message);
        }
    }

    updateProfile = async () => {
        try {
            const { profile } = this.state;
            if (typeof(profile.avatar) === 'object'){
                profile.avatar = await this.updateAvatar(profile.avatar);
            }
            await authApi.updateProfile(profile);
            this.props.getProfileUser();
        } catch (error) {
            console.log(error.message)
        }
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        this.updateProfile()
    }

    render() {
        const { user } = this.props;
        const { profile } = this.state;
        if (user && user.result === false){
            return <Redirect from="/" to="/" />
        }
        if (user && Object.keys(profile).length === 0) {
            profile.username = user.username;
            profile.age = user.age;
            profile.gender = user.gender;
            profile.phone = user.phone;
            profile.avatar = user.avatar;
        }
        return (
            <div>
                {
                    user && user._id &&
                    <Form
                        onSubmit={this.onSubmitForm}
                    >
                        <Card className="mt-4">
                            <CardHeader>
                                <strong>Thông tin cá nhân</strong>
                            </CardHeader>
                            <CardBody>
                                <Row className="mt-2">
                                    <Col sm="4" id="showAvatar" >
                                        <img id="avatar"  height="250" src={user.avatar ? `${appConfig.apiAvatar}/${user.avatar}` : `${appConfig.defaultAvatar}`} />
                                        <Input className="mt-4" onChange={this.onFileChange} type="file" name="avatar" id="exampleFile" />
                                    </Col>

                                    <Col sm="6">
                                        <FormGroup>
                                            <Label htmlFor="username">Tên hiển thị</Label>
                                            <Input type="text" name="username" id="username" value={profile.username ? profile.username : ""} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="age">Tuổi</Label>
                                            <Input type="number" id="age" name="age" value={profile.age ? profile.age : ""} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="phone">Số điện thoại</Label>
                                            <Input type="text" id="phone" name="phone" value={profile.phone ? profile.phone : ""} onChange={this.onChange} />
                                        </FormGroup>
                                        <FormGroup row>
                                            <Col md="3">
                                                <Label>Giới tính</Label>
                                            </Col>
                                            <Col md="9">
                                                <FormGroup check className="radio">
                                                    <Input className="form-check-input" type="radio" id="radio1" name="gender" value="nam" checked={profile.gender === "nam"} onChange={this.onChange} />
                                                    <Label check className="form-check-label" htmlFor="radio1">Nam</Label>
                                                </FormGroup>
                                                <FormGroup check className="radio">
                                                    <Input className="form-check-input" type="radio" id="radio2" name="gender" value="nữ" checked={profile.gender === "nữ"} onChange={this.onChange} />
                                                    <Label check className="form-check-label" htmlFor="radio2">Nữ</Label>
                                                </FormGroup>
                                                <FormGroup check className="radio">
                                                    <Input className="form-check-input" type="radio" id="radio3" name="gender" value="khác" checked={profile.gender === "khác"} onChange={this.onChange} />
                                                    <Label check className="form-check-label" htmlFor="radio3">Khác</Label>
                                                </FormGroup>
                                            </Col>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Thay đổi</Button>
                                <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Hoàn tác</Button>
                            </CardFooter>
                        </Card>
                    </Form>
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getProfileUser: () => {
            dispatch(getProfileUser());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);