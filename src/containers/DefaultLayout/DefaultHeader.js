import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  Button,
} from "reactstrap";
// import PropTypes from 'prop-types';

import { AppNavbarBrand, AppSidebarToggler } from "@coreui/react";
import logo from "../../assets/img/brand/phonelogo.png";
import sygnet from "../../assets/img/brand/sygnet.svg";
import { appConfig } from "../../configs/app.config";

// const propTypes = {
//   children: PropTypes.node,
// };

// const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // eslint-disable-next-line
    const { children, user, login, profile, changePassword } = this.props;

    console.log(user);
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 50, alt: "CoreUI Logo" }}
          // full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          // minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        {/* <AppSidebarToggler className="d-md-down-none" display="lg" /> */}

        <Nav className="d-md-down-none menu" navbar>
          <NavItem className="px-3">
            <NavLink to="/" className="nav-link color-white">
              Trang chủ
            </NavLink>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/dien-thoai" className="nav-link color-white">
              Điện thoại
            </Link>
          </NavItem>

          {user && user._id && user.role.index === 0 ? (
            <NavItem className="px-3">
              <Link to={`/his/${user._id}`} className="nav-link color-white">
                Đơn đã đặt
              </Link>
            </NavItem>
          ) : null}


        </Nav>
        <Nav className="ml-auto" navbar>
          {user && user._id && user.role.index === 0 ? (
            <NavItem className="px-3">
              <Link to={`/cart/${user._id}`} className="nav-link color-white">
                Giỏ hàng
                <i
                  style={{ marginLeft: "5px" }}
                  className="fa fa-shopping-cart"
                ></i>
              </Link>
            </NavItem>
          ) : null}


          {user && user.msg === "Token không hợp lệ" && (
            <div>
              <Button
                className="mr-4"
                onClick={login}
                type="button"
                outline
                color="primary"
              >
                <i className="fa fa-user "></i> Đăng nhập
              </Button>
            </div>
          )}
          {user && user._id && (
            <UncontrolledDropdown
              className="mr-5 d-flex align-items-center"
              nav
              direction="down"
            >
              <DropdownToggle nav className="dropdown-user">
                <img
                  src={
                    user.avatar
                      ? `${appConfig.apiAvatar}/${user.avatar}`
                      : `${appConfig.defaultAvatar}`
                  }
                  className="img-avatar"
                  alt=""
                />
                <span className="showUsername mr-1">{user.username}</span>
                <i className="fa fa-chevron-circle-down showUsername icon-dropdown"></i>
              </DropdownToggle>

              <DropdownMenu right>
                <DropdownItem onClick={profile}>
                  <i className="fa fa-user"></i> Thông tin cá nhân
                </DropdownItem>
                <DropdownItem onClick={changePassword}>
                  <i className="fa fa-key"></i> Đổi mật khẩu
                </DropdownItem>

                <DropdownItem onClick={(e) => this.props.onLogout(e)}>
                  <i className="fa fa-lock"></i> Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          )}
        </Nav>
        {/* <AppAsideToggler className="d-md-down-none" />
        <AppAsideToggler className="d-lg-none" mobile /> */}
      </React.Fragment>
    );
  }
}

// DefaultHeader.propTypes = propTypes;
// DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
