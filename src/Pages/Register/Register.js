import React, { Component } from 'react';
import {
  Button, Card, CardBody, CardFooter, Col, Container, Form,
  Input, InputGroup, InputGroupAddon, InputGroupText, Row,
  FormGroup, Label
} from 'reactstrap';
import { toast } from 'react-toastify';

import authApi from "../../api/auth.api";

class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      account: {
        email: "",
        password: "",
        age: "",
        gender: "",
        password_confirm: ""
      }
    }
  }

  onClickReturn = () => {
    return this.props.history.push('/login');
  }

  register = async () => {
    try {
      const {account} = this.state;
      if (!account.gender) {
        return toast.error("Vui lòng chọn giới tính", {
          position: toast.POSITION.TOP_RIGHT
        });
      }
      else if (account.password.length < 6 || account.password_confirm.length < 6){
        return toast.error("Mật khẩu phải ít nhất 6 ký tự", {
            position: toast.POSITION.TOP_RIGHT
        });
      }
      else if (account.password !== account.password_confirm){
          return toast.error("Mật khẩu không khớp nhau", {
              position: toast.POSITION.TOP_RIGHT
          });
      }
  
      let user = await authApi.register(account);
      if (user.result){
        toast.success(user.msg, {
          position: toast.POSITION.TOP_RIGHT
        });
        return this.props.history.push('/login');
      }
      else {
        return toast.error(user.msg, {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    } catch (error) {
      console.log(error)
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.register()
  }

  onChange = (e) => {
    const { account } = this.state;
    let name = e.target.name;
    let value = e.target.value;
    account[name] = value;
    this.setState({
      account
    })
  }

  onClickReset = () => {
    this.setState({
      account: {
        email: "",
        password: "",
        age: "",
        gender: "",
        password_confirm: ""
      }
    })
  }

  render() {
    const { account } = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Form onSubmit={this.onSubmit}
                ref={c => {
                  this.form = c;
                }}
              >
                <Card className="mx-4">
                  <CardBody className="p-4">
                    <h1>Đăng ký</h1>
                    <p className="text-muted">Tạo tài khoản của bạn</p>
                    {/* <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Username" autoComplete="username" />
                    </InputGroup> */}
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="email" name="email" value={account.email} placeholder="Email" onChange={this.onChange} required />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-birthday-cake"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="number" name="age" value={account.age} placeholder="Tuổi" onChange={this.onChange} required />
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-venus-mars"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <FormGroup className="ml-2" check inline>
                        <Input className="form-check-input" type="radio" id="inline-radio1" name="gender" value="nam" onChange={this.onChange} />
                        <Label className="form-check-label" check htmlFor="inline-radio1">nam</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" type="radio" id="inline-radio2" name="gender" value="nữ" onChange={this.onChange} />
                        <Label className="form-check-label" check htmlFor="inline-radio2">nữ</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" type="radio" id="inline-radio3" name="gender" value="khác" onChange={this.onChange} />
                        <Label className="form-check-label" check htmlFor="inline-radio3">khác</Label>
                      </FormGroup>
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" name="password" value={account.password} onChange={this.onChange} required />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repeat password" name="password_confirm" value={account.password_confirm} onChange={this.onChange} required />
                    </InputGroup>
                    <Button type="submit" color="success" block>Tạo tài khoản</Button>
                  </CardBody>
                  <CardFooter className="p-4">
                    <Row>
                      <Col xs="12" sm="6">
                        <Button type="reset" onClick={this.onClickReset} color="danger" block><span>Hoàn tác</span></Button>
                      </Col>
                      <Col xs="12" sm="6">
                        <Button onClick={this.onClickReturn} color="primary" block><span>Quay lại</span></Button>
                      </Col>
                    </Row>
                  </CardFooter>
                </Card>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
