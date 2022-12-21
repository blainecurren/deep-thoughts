import decode from "jwt-decode";

class AuthService {
  //retrieve data saved in token
  getProfile() {
    return decode(this.getToken());
  }

  // check if the user is still logged in
  loggedIn() {
    //checks if there is a saved token and its still valid
    const token = this.getToken();
    // use type coercion to check if token is NOT undefined and the token is NOT expired
    return !!token && !this.isTokenExpired(token);
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  // retrieve token from localStorage
  getToken() {
    return localStorage.getItem("id_token");

    localStorage.setItem("id_token", idToken);

    window.location.assign("/");
  }

  // clear token from localStorage and force logout with reload
  logout() {
    //clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
    // this will reload the page and reset the state of the application
    window.location.assign("/");
  }
}

export default new AuthService();
