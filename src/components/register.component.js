import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";
import Select from "react-validation/build/select";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};
const rol = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid rol.
        </div>
      );
    }
  };
  const telefon = value => {
    if (!value || value.length != 10) {
      return (
        <div className="alert alert-danger" role="alert">
          Dați un telefon valid.
        </div>
      );
    }
  };
  const name = value => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The name must be between 3 and 20 characters.
        </div>
      );
    }
  };  
const username = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};
const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeRol = this.onChangeRol.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeTelefon = this.onChangeTelefon.bind(this);

    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      telefon: "",
      nume: "",
      username: "",
      rol:"",
      email: "",
      password: "",
      successful: false,
      message: ""
    };
  }
  onChangeName(e) {
    this.setState({
      nume: e.target.value
    });
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  onChangeRol(e) {
    this.setState({
      rol: e.target.value
    });
  }
  onChangeTelefon(e){
    this.setState({telefon: e.target.value})
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  handleRegister(e) {
    e.preventDefault();
    this.setState({
      message: "",
      successful: false
    });
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.nume,
        this.state.username,
        this.state.rol,
        this.state.email,
        this.state.password, this.state.telefon
      ).then(
        () => {
          this.props.history.push("/login");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.setState({
            successful: false,
            message: "Registration failed!"
          });
        }
      );
    }
  }
  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />
          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                  <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="name"
                    value={this.state.nume}
                    onChange={this.onChangeName}
                    validations={[required, name]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, username]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="telefon">Telefon</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="telefon"
                    value={this.state.telefon}
                    onChange={this.onChangeTelefon}
                    validations={[required, telefon]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="rol">Rol</label>
                  <Select name="role" className="form-control" 
                  id="role" value={this.state.rol}
                    onChange={this.onChangeRol}
                    validations={[required, rol]}>
                    <option value="">Select a role</option>
                    <option value="USER">User (client)</option>
                    <option value="ADMIN">Administrator</option>
                  </Select>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>
                <div className="form-group">
                  <button className="btn btn-dark btn-circle btn-xl">Sign Up</button>
                </div>
              </div>
            )}
            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}