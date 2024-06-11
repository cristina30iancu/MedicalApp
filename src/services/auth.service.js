import axios from "axios";
const REGISTER_URL = "http://localhost:8080/api/auth/register";
const LOGIN_URL = "http://localhost:8080/api/auth/login";
const USER_URL = "http://localhost:8080/api/utilizatori/";

class AuthService {
  login(username, password) {
    return axios
      .post(LOGIN_URL, {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(numeUtilizator, username, rol,email, password, telefon) {
    return axios.post(REGISTER_URL ,  {
      numeUtilizator,
      username,
      rol,
      email,
      password, telefon
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
  getUser(id) {
    return axios.get(USER_URL + id)
  }
}
export default new AuthService();