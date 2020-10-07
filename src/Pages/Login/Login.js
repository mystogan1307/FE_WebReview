import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { toast } from "react-toastify";

import Auth from "../../api/auth.api";
import cookie from "react-cookies";

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: ""
    }
  }

  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    })
  } 

  onSubmit = async (e) => {
    e.preventDefault();
    const {email, password} = this.state;
    const token = await Auth.Login(email, password);
    // console.log(token)
    if(token.msg) {
      toast.error(token.msg)
    }
    else{
      cookie.save("token", token);
      const url = this.props.location.state;
      if (url){
        return this.props.history.push(url);
      }
      return this.props.history.push("/")
    }
  }

  render() {
    const {email, password} = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={e => this.onSubmit(e)}
                      ref={c => this.form = c}
                    >
                      <h1>Đăng nhập</h1>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="email" name="email" placeholder="Email" autoComplete="email" 
                          onChange={e => this.onChange(e)}
                          value={email}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" name="password" placeholder="Mật khẩu" autoComplete="current-password"
                           onChange={e => this.onChange(e)}
                           value={password}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" color="primary" className="px-4">Đăng nhập</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button type="button" color="link" className="px-0">Quên mật khẩu?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Đăng ký</h2>
                      <p>Đăng ký tài khoản để tham gia đánh giá sản phẩm.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Đăng ký ngay!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
