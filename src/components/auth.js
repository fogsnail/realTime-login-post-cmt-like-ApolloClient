const value = JSON.parse(sessionStorage.getItem("authenticated"));
const authenticated = value || false;
class Auth {
  constructor() {
    this.authenticated = authenticated;
  }

  login(cb) {
    this.authenticated = true;
    sessionStorage.setItem("authenticated", this.authenticated);
    cb();
  }

  logout(cb) {
    this.authenticated = false;
    sessionStorage.setItem("authenticated", this.authenticated);
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
