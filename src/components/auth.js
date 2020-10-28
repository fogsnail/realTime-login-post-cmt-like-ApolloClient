const value = JSON.parse(localStorage.getItem("authenticated"));
const authenticated = value || false;
class Auth {
  constructor() {
    this.authenticated = authenticated;
  }

  login(cb) {
    this.authenticated = true;
    localStorage.setItem("authenticated", this.authenticated);
    cb();
  }

  logout(cb) {
    this.authenticated = false;
    localStorage.setItem("authenticated", this.authenticated);
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
