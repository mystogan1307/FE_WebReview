import "./Cart.css";

import React from "react";
import CI from "./CI/CI";
import { useEffect, useRef, useState } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { FormattedNumber } from "react-intl";
import { appConfig } from "../../configs/app.config";
import { toast } from "react-toastify";

const Cart = ({ match: { params }, user, ...otherProps }) => {
  const [cart, setCart] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (user && user._id) {
      setName(user.username);
      setEmail(user.local.email);
      setPhoneNumber(user.phone ? user.phone : "");
      setAddress("");
    }
  }, [user]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/cart/${params.id}`).then((res) => {
      console.log(res.data);
      setCart(res.data.data);
    });

    Axios.get(`http://localhost:3001/cart/totalprice/${params.id}`).then(
      (res) => {
        setTotalPrice(res.data.tempPrice);
      }
    );
  }, []);

  const deleteProduct = async (productId) => {
    Axios.post("http://localhost:3001/cart/delete", {
      userId: params.id,
      productId: productId,
    }).then((res) => {
      Axios.get(`http://localhost:3001/cart/totalprice/${params.id}`).then(
        (res) => {
          setTotalPrice(res.data.tempPrice);
        }
      );
    });
    setCart({
      ...cart,
      products: cart.products.filter((ele) => ele.productId !== productId),
    });
  };

  const updateCart = (productId, count) => {
    if (count) {
      setCart({
        ...cart,
        products: cart.products.map((ele) => {
          if (ele.productId === productId) {
            return { ...ele, count: count };
          }
          return ele;
        }),
      });
      Axios.post(`${appConfig.apiUrl}/cart/update`, {
        userId: params.id,
        product: {
          productId: productId,
          count: count,
        },
      }).then((res) => {
        Axios.get(`http://localhost:3001/cart/totalprice/${params.id}`).then(
          (res) => {
            setTotalPrice(res.data.tempPrice);
          }
        );
      });
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(otherProps);

    console.log({
      userId: params.id,
      name: name,
      phone: phoneNumber,
      address: address,
      email: email,
    });

    Axios.post(`${appConfig.apiUrl}/bill/add`, {
      userId: params.id,
      name: name,
      phone: phoneNumber,
      address: address,
      email: email,
    });

    toast.success("Đặt hàng thành công.");
    otherProps.history.push("/");
  };

  return (
    <div className="cart-container">
      <div className="cart">
        <div className="cart__list">
          {cart && cart.products.length ? (
            cart.products.map((ele) => {
              return (
                <CI
                  product={ele}
                  key={ele.productId}
                  deleteProduct={deleteProduct}
                  updateCart={updateCart}
                />
              );
            })
          ) : (
            <p>Không có sản phẩm nào.</p>
          )}
        </div>
        <div className="cart__total-price">
          <p>Tổng tiền</p>
          <span
            className="text-danger"
            style={{
              fontWeight: "bold",
              fontSize: " 20px",
              textAlign: "right",
            }}
          >
            <FormattedNumber value={totalPrice ? totalPrice : ""} /> đ
          </span>
        </div>
        <form onSubmit={onSubmit}>
          <div className="cart__info_user">
            <p>Thông tin khách hàng</p>
            <div className="cart__field">
              <label>Email</label>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled
              />
            </div>
            <div className="cart__field">
              <label>Họ và Tên</label>
              <input
                value={name}
                required
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="cart__field">
              <label>Số điện thoại</label>
              <input
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                required
                type="text"
                pattern="[0]\d{9}"
              />
            </div>
            <div className="cart__field">
              <label>Địa chỉ nhận hàng</label>
              <input
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                required
              />
            </div>
          </div>
          <div className="cart__bottom">
            <button className={cart && cart.products.length ? "" : "disable-a"}>
              Đặt hàng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.auth.user };
};

export default connect(mapStateToProps)(Cart);
