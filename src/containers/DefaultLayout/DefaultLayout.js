import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from "react-redux";
import { getProfileUser } from "../../actions/auth.action";

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  // AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
// import navigation from '../../_nav';
import { navAdmin, navMember } from "../../_mynav";
// routes config
import routes from '../../routes';
import cookie from "react-cookies";

import "../../../src/index.css"

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  signOut(e) {
     e.preventDefault()
    console.log(2);
    // this.props.history.push('/login')
    // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; ";
    // cookie.remove('token', { path: '/' }) ;
    cookie.remove('token') ;
    //this.props.getProfileUser();
    window.location.reload();
    
  }

  componentDidMount() {
    this.props.getProfileUser();
  }
  
  login = () => {
    this.props.history.push("/login", this.props.history.location.pathname);
  }

  profile = () => {
    this.props.history.push("/thong-tin");
  }

  changePassword = () => {
    this.props.history.push("/mat-khau");
  }

  render() {
    const {user} = this.props;
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader profile={this.profile} changePassword={this.changePassword} login={this.login}  onLogout={e=>this.signOut(e)} user={user} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
         {
           (user && user.role.index === 1)?
            <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={user ? user.role.index === 1 ? navAdmin : navMember : {items: []}} {...this.props} router={router}/>
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>:null
         }
          <main className="main" style={{ marginLeft: (user && user.role.index ===1)? "200px":"0"}}>
            {/* <AppBreadcrumb appRoutes={routes} router={router}/> */}
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => (
                          <route.component {...props} />
                        )} />
                    ) : (null);
                  })}
                  <Redirect from="/" to="/" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
