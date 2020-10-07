import React from 'react';

const Home = React.lazy(() => import('./Pages/Home/Home.page'));
const Phone = React.lazy(() => import('./Pages/Phone/Phone.page'));
const PhoneSettings = React.lazy(() => import('./Pages/PhoneSettings/phoneSettings.page'));
const PhonePage = React.lazy(() => import('./Pages/PhonePage/PhonePage.page'));
const ProfilePage = React.lazy(() => import('./Pages/Profile/Profile.page'));
const PasswordPage = React.lazy(() => import('./Pages/Password/Password.page'));
const PhoneLabel = React.lazy(() => import('./Pages/PhoneLabel/PhoneLabel.page'));
const User = React.lazy(() => import('./Pages/Users/User.page'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'trangchu', component:  Home},
  { path: '/dien-thoai', exact: true, name: 'dien-thoai', component: PhonePage},
  { path: '/dien-thoai/:id', exact: true, name: 'dien-thoai-id', component: Phone},
  { path: '/quanlydienthoai', exact: true, name: 'quanlydienthoai', component:  PhoneSettings},
  { path: '/thong-tin', exact: true, name: 'thong-tin', component:  ProfilePage},
  { path: '/mat-khau', exact: true, name: 'mat-khau', component:  PasswordPage},
  { path: '/nhan-hieu', exact: true, name: 'nhan-hieu', component:  PhoneLabel},
  { path: '/nguoi-dung', exact: true, name: 'nguoi-dung', component:  User},
  // { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  // { path: '/theme', exact: true, name: 'Theme', component: Colors },
  // { path: '/theme/colors', name: 'Colors', component: Colors },
  // { path: '/theme/typography', name: 'Typography', component: Typography },
  // { path: '/base', exact: true, name: 'Base', component: Cards },
  // { path: '/base/cards', name: 'Cards', component: Cards },
  // { path: '/base/forms', name: 'Forms', component: Forms },
  // { path: '/base/switches', name: 'Switches', component: Switches },
  // { path: '/base/tables', name: 'Tables', component: Tables },
  // { path: '/base/tabs', name: 'Tabs', component: Tabs },
  // { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  // { path: '/base/carousels', name: 'Carousel', component: Carousels },
  // { path: '/base/collapses', name: 'Collapse', component: Collapses },
  // { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  // { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  // { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  // { path: '/base/navbars', name: 'Navbars', component: Navbars },
  // { path: '/base/navs', name: 'Navs', component: Navs },
  // { path: '/base/paginations', name: 'Paginations', component: Paginations },
  // { path: '/base/popovers', name: 'Popovers', component: Popovers },
  // { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  // { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  // { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
  // { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  // { path: '/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
  // { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  // { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  // { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  // { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  // { path: '/icons/flags', name: 'Flags', component: Flags },
  // { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  // { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  // { path: '/notifications', exact: true, name: 'Notifications', component: Alerts },
  // { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  // { path: '/notifications/badges', name: 'Badges', component: Badges },
  // { path: '/notifications/modals', name: 'Modals', component: Modals },
  // { path: '/widgets', name: 'Widgets', component: Widgets },
  // { path: '/charts', name: 'Charts', component: Charts },
  // { path: '/users', exact: true,  name: 'Users', component: Users },
  // { path: '/users/:id', exact: true, name: 'User Details', component: User },
];

export default routes;
