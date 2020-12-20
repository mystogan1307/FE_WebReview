import React from "react";

const Home = React.lazy(() => import("./Pages/Home/Home.page"));
const Phone = React.lazy(() => import("./Pages/Phone/Phone.page"));
const PhoneSettings = React.lazy(() =>
  import("./Pages/PhoneSettings/phoneSettings.page")
);
const PhonePage = React.lazy(() => import("./Pages/PhonePage/PhonePage.page"));
const ProfilePage = React.lazy(() => import("./Pages/Profile/Profile.page"));
const PasswordPage = React.lazy(() => import("./Pages/Password/Password.page"));
const PhoneLabel = React.lazy(() =>
  import("./Pages/PhoneLabel/PhoneLabel.page")
);
const User = React.lazy(() => import("./Pages/Users/User.page"));
const Cart = React.lazy(() => import("./Pages/Cart/Cart"));
const His = React.lazy(() => import("./Pages/HisBill/HisBill"));
const BillSetting = React.lazy(() => import("./Pages/BillSetting/BillSetting"));
const Dashboard = React.lazy(() => import("./Pages/Dashboard/Dashboard"));

const routes = [
  { path: "/", exact: true, name: "trangchu", component: Home },
  { path: "/cart/:id", exact: true, name: "cart", component: Cart },
  {
    path: "/dien-thoai",
    exact: true,
    name: "dien-thoai",
    component: PhonePage,
  },
  {
    path: "/his/:id",
    exact: true,
    name: "his",
    component: His,
  },
  {
    path: "/don-hang",
    exact: true,
    name: "don-hang",
    component: BillSetting,
  },
  {
    path: "/dashboard",
    exact: true,
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/dien-thoai/:id",
    exact: true,
    name: "dien-thoai-id",
    component: Phone,
  },
  {
    path: "/quanlydienthoai",
    exact: true,
    name: "quanlydienthoai",
    component: PhoneSettings,
  },
  {
    path: "/thong-tin",
    exact: true,
    name: "thong-tin",
    component: ProfilePage,
  },
  { path: "/mat-khau", exact: true, name: "mat-khau", component: PasswordPage },
  { path: "/nhan-hieu", exact: true, name: "nhan-hieu", component: PhoneLabel },
  { path: "/nguoi-dung", exact: true, name: "nguoi-dung", component: User },
];

export default routes;
