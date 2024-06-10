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

const val = value => {
  if (value <= 0) {
    return (
      <div className="alert alert-danger" role="alert">
        Adăugați un număr pozitiv.
      </div>
    );
  }
  if (value > 60) {
    return (
      <div className="alert alert-danger" role="alert">
        Poate dura maxim 60 minute.
      </div>
    );
  }
};

const futureDate = value => {
  const today = new Date();
  const inputDate = new Date(value);
  today.setDate(today.getDate() + 1);
  if (inputDate <= today) {
    return (
      <div className="alert alert-danger" role="alert">
        Disponibilitatea începe de mâine.
      </div>
    );
  }
};

export default class AddMedici extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeNumeMedic = this.onChangeNumeMedic.bind(this);
    this.onChangeNumeConsult = this.onChangeNumeConsult.bind(this);
    this.onChangeLocatie = this.onChangeLocatie.bind(this);
    this.onChangeCostServiciu = this.onChangeCostServiciu.bind(this);
    this.onChangeDurata = this.onChangeDurata.bind(this);
    this.onChangeDataDisponibila = this.onChangeDataDisponibila.bind(this);
    this.onChangeOraDisponibila = this.onChangeOraDisponibila.bind(this);
    this.onChangeStare = this.onChangeStare.bind(this);
    this.saveMedic = this.saveMedic.bind(this);
    this.newMedic = this.newMedic.bind(this);
    this.onChangeClinica = this.onChangeClinica.bind(this);
    this.getClinici = this.getClinici.bind(this);
    this.fetchOreOcupate = this.fetchOreOcupate.bind(this);
    this.getOreDisponibile = this.getOreDisponibile.bind(this);

    this.state = {
      clinici: [],
      clinicaId: "",
      medicId: null,
      numeMedic: "",
      numeConsult: "",
      locatie: "",
      costServiciu: "",
      durata: "",
      dataDisponibila: "",
      oraDisponibila: "",
      stare: "",
      oreDisponibile: [],
      oreOcupate: [],
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
    this.fetchOreOcupate();
    this.getOreDisponibile();
  }

  fetchOreOcupate() {
    TutorialDataService.getAllPersonal()
      .then(response => {
        const allMedics = response.data;
        if (allMedics) {
          const oreOcupate = allMedics.reduce((acc, medic) => {
            medic.forEach(appointment => {
              if (appointment.stare !== "Anulat") {
                const dateKey = appointment.dataDisponibila; // assuming the date format is consistent
                if (!acc[dateKey]) {
                  acc[dateKey] = [];
                }
                acc[dateKey].push(appointment.oraDisponibila);
              }
            });
            return acc;
          }, {});
          this.setState({ oreOcupate });
        } else {
          this.setState({ oreOcupate: [] });
        }

      })
      .catch(e => {
        console.log(e);
      });
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
  getOreDisponibile(date) {
    const allHours = [...Array(11).keys()].map(i => `${(8 + i).toString().padStart(2, '0')}:00`);
    const bookedHours = this.state.oreOcupate[date] || [];
    console.log(allHours, bookedHours)
    const ore = allHours.filter(hour => !bookedHours.includes(hour));
    this.setState({
      oreDisponibile: ore
    });
  }
  onChangeNumeMedic(e) {
    this.setState({
      numeMedic: e.target.value
    });
  }

  onChangeNumeConsult(e) {
    this.setState({
      numeConsult: e.target.value
    });
  }

  onChangeLocatie(e) {
    this.setState({
      locatie: e.target.value
    });
  }

  onChangeCostServiciu(e) {
    this.setState({
      costServiciu: e.target.value
    });
  }

  onChangeDurata(e) {
    this.setState({
      durata: e.target.value
    });
  }

  onChangeDataDisponibila(e) {
    this.setState({
      dataDisponibila: e.target.value
    });
    this.getOreDisponibile(e.target.value)
  }

  onChangeOraDisponibila(e) {
    this.setState({
      oraDisponibila: e.target.value
    });
  }

  onChangeStare(e) {
    this.setState({
      stare: e.target.value
    });
  }

  saveMedic() {
    const data = {
      clinicaId: this.state.clinicaId,
      numeMedic: this.state.numeMedic,
      numeConsult: this.state.numeConsult,
      locatie: this.state.locatie,
      costServiciu: this.state.costServiciu,
      durata: this.state.durata,
      dataDisponibila: this.state.dataDisponibila,
      oraDisponibila: this.state.oraDisponibila,
      stare: this.state.stare
    };

    TutorialDataService.createMedic(data)
      .then(response => {
        this.setState({
          medicId: response.data.medicId,
          numeMedic: response.data.numeMedic,
          numeConsult: response.data.numeConsult,
          locatie: response.data.locatie,
          costServiciu: response.data.costServiciu,
          durata: response.data.durata,
          dataDisponibila: response.data.dataDisponibila,
          oraDisponibila: response.data.oraDisponibila,
          stare: response.data.stare,
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
      numeConsult: "",
      locatie: "",
      costServiciu: "",
      durata: "",
      dataDisponibila: "",
      oraDisponibila: "",
      stare: "",
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
                <div className="form-group">
                  <label htmlFor="numeConsult">Nume consult</label>
                  <Input
                    type="text"
                    className="form-control"
                    id="numeConsult"
                    required
                    value={this.state.numeConsult}
                    onChange={this.onChangeNumeConsult}
                    name="numeConsult"
                    validations={[required, name]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="locatie">Locatie</label>
                  <Input
                    type="text"
                    className="form-control"
                    id="locatie"
                    required
                    value={this.state.locatie}
                    onChange={this.onChangeLocatie}
                    name="locatie"
                    validations={[required]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="costServiciu">Cost serviciu</label>
                  <Input
                    type="number"
                    className="form-control"
                    id="costServiciu"
                    required
                    value={this.state.costServiciu}
                    onChange={this.onChangeCostServiciu}
                    name="costServiciu"
                    validations={[required]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="durata">Durata</label>
                  <Input
                    type="number"
                    className="form-control"
                    id="durata"
                    required
                    value={this.state.durata}
                    onChange={this.onChangeDurata}
                    name="durata"
                    validations={[required, val]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dataDisponibila">Data disponibila</label>
                  <Input
                    type="date"
                    className="form-control"
                    id="dataDisponibila"
                    required
                    value={this.state.dataDisponibila}
                    onChange={this.onChangeDataDisponibila}
                    name="dataDisponibila"
                    validations={[required, futureDate]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="oraDisponibila">Ora disponibila</label>
                  <Select
                    className="form-control"
                    id="oraDisponibila"
                    required
                    value={this.state.oraDisponibila}
                    onChange={this.onChangeOraDisponibila}
                    name="oraDisponibila"
                    validations={[required]}
                  >
                    {this.state.oreDisponibile.map(hour => (
                      <option key={hour} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </Select>

                </div>
                <div className="form-group">
                  <label htmlFor="stare">Stare</label>
                  <Select
                    className="form-control"
                    id="stare"
                    required
                    value={this.state.stare}
                    onChange={this.onChangeStare}
                    name="stare"
                    validations={[required]}
                  >
                    <option value="Disponibil">Disponibil</option>
                    <option value="Programat">Programat</option>
                    <option value="În desfășurare">În desfășurare</option>
                    <option value="Terminat">Terminat</option>
                    <option value="Anulat">Anulat</option>
                  </Select>
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