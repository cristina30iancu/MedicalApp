import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import authService from "../services/auth.service";
import { Button, Row } from 'react-bootstrap';
import '../components/custom.css';
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
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

export default class AddMedici extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeNumeMedic = this.onChangeNumeMedic.bind(this);
    this.saveMedic = this.saveMedic.bind(this);
    this.newMedic = this.newMedic.bind(this);
    this.onChangeClinica = this.onChangeClinica.bind(this);
    this.getClinici = this.getClinici.bind(this);

    this.state = {
      clinici: [],
      clinicaId: "",
      medicId: null,
      numeMedic: "",
      submitted: false
    };
  }

  componentDidMount() {
    this.getClinici();
    const user = authService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("USER"),
        showAdminBoard: user.roles.includes("ADMIN")
      });
    }
  }

  getClinici() {
    TutorialDataService.getAllClinici()
      .then(response => {
        this.setState({
          clinici: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  onChangeClinica(e) {
    this.setState({
      clinicaId: e.target.value
    });
  }

  onChangeNumeMedic(e) {
    this.setState({
      numeMedic: e.target.value
    });
  }

  saveMedic() {
    const data = {
      clinicaId: this.state.clinicaId,
      numeMedic: this.state.numeMedic
    };

    TutorialDataService.createMedic(data)
      .then(response => {
        this.setState({
          medicId: response.data.medicId,
          numeMedic: response.data.numeMedic,
          submitted: true
        });
        this.props.history.push('/afisareInfo');
      })
      .catch(e => {
        console.log(e);
      });
  }

  newMedic() {
    this.setState({
      clinicaId: null,
      medicId: null,
      numeMedic: "",
      submitted: false
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      this.saveMedic();
    }
  }

  render() {
    return (
      <div className="submit-form">
        <Row>
          {this.state.submitted ? (
            <div>
              <h5 style={{ marginTop: "60px", marginLeft: "50px" }}>
                Medic adaugat cu succes!
              </h5>
              <button className="btn btn-light" onClick={this.newMedic}
                style={{ color: "black", marginLeft: "140px", marginTop: "80px", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)" }}>
                Adaugă
              </button>
            </div>
          ) : (
            <div>
              <Form onSubmit={this.handleSubmit} ref={c => { this.form = c; }}>
                <div className="form-group" style={{ marginTop: '60px' }}>
                  <label htmlFor="clinicaId">Clinică</label>
                  <Select
                    name="clinicaId"
                    className="form-control"
                    id="clinicaId"
                    value={this.state.clinicaId}
                    onChange={this.onChangeClinica}
                    validations={[required]}
                  >
                    <option value="">Alege o clinică</option>
                    {this.state.clinici.map(clinica => (
                      <option key={clinica.clinicaId} value={clinica.clinicaId}>{clinica.numeClinica}</option>
                    ))}
                  </Select>
                </div>
                <div className="form-group">
                  <label htmlFor="numeMedic">Nume medic</label>
                  <Input
                    type="text"
                    className="form-control"
                    id="numeMedic"
                    required
                    value={this.state.numeMedic}
                    onChange={this.onChangeNumeMedic}
                    name="numeMedic"
                    validations={[required, name]}
                  />
                </div>
                <CheckButton
                  style={{ display: "none" }}
                  ref={c => {
                    this.checkBtn = c;
                  }}
                />
                <Button
                  style={{ color: "white", marginLeft: "25%", marginTop: "10px", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)" }}
                  variant="dark"
                  type="submit"
                >
                  Salvează
                </Button>
              </Form>
            </div>
          )}
        </Row>
      </div>
    );
  }
}