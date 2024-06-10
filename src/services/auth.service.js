import axios from "axios";
const REGISTER_URL = "http://localhost:8080/api/auth/register";
const LOGIN_URL = "http://localhost:8080/api/auth/login";
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
  register(numeUtilizator, username, rol,email, password) {
    return axios.post(REGISTER_URL ,  {
      numeUtilizator,
      username,
      rol,
      email,
      password
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}
export default new AuthService();