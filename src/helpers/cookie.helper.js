import cookie from 'react-cookies';

export default class SessionHelper {
  static getToken() {
    return cookie.load("token");
  }
}