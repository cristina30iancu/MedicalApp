import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import authService from "../services/auth.service";
import { Button, Row } from 'react-bootstrap';
import '../components/custom.css';
import Input from "react-validation/build/input";
import Select from "react-validation/build/select";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import { withRouter } from "react-router-dom";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Acest câmp este obligatoriu!
      </div>
    );
  }
};

const name = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Numele trebuie să fie între 3 și 20 de caractere.
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
        Poate dura maxim 60 de minute.
      </div>
    );
  }
};

const futureDate = value => {
  const today = new Date();
  const inputDate = new Date(value);
  if (inputDate < today) {
    return (
      <div className="alert alert-danger" role="alert">
        Disponibilitatea începe de mâine.
      </div>
    );
  }
};

export default class AddServicii extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeMedicId = this.onChangeMedicId.bind(this);
    this.onChangeNumeConsult = this.onChangeNumeConsult.bind(this);
    this.onChangeCostServiciu = this.onChangeCostServiciu.bind(this);
    this.onChangeDurata = this.onChangeDurata.bind(this);
    this.onChangeDataDisponibila = this.onChangeDataDisponibila.bind(this);
    this.onChangeOraDisponibila = this.onChangeOraDisponibila.bind(this);
    this.onChangeStare = this.onChangeStare.bind(this);
    this.saveServiciu = this.saveServiciu.bind(this);
    this.newServiciu = this.newServiciu.bind(this);
    this.getMedici = this.getMedici.bind(this);
    this.fetchOreOcupate = this.fetchOreOcupate.bind(this);
    this.getOreDisponibile = this.getOreDisponibile.bind(this);
    this.getServiciu = this.getServiciu.bind(this);

    this.state = {
      medici: [],
      medicId: "",
      numeConsult: "",
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
    this.getMedici();
    const user = authService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("USER"),
        showAdminBoard: user.roles.includes("ADMIN")
      });
    }
    const parts = window.location.href.split("/");
    const id = parseInt(parts[parts.length -1]);
    if (id) {
      this.getServiciu(id);
    }
  }
  
  fetchOreOcupate() {
    // Extragem `id` din URL
    const parts = window.location.href.split("/");
    const id = parseInt(parts[parts.length -1]);
  
    TutorialDataService.getMedicDetaliiServicii(this.state.medicId)
      .then(response => {
        const allServices = response.data;
  
        if (allServices) {
         console.log(allServices)
          // Reducem datele pentru a crea un obiect `oreOcupate`
          const oreOcupate = allServices.reduce((acc, service) => {
            // Ignorăm serviciile care sunt anulate sau, dacă avem `id`, care au același `id`
            if (service.stare === "Anulat" || (id && service.detaliiId == id)) {
              return acc;
            }
            console.log("aici")
            // Adăugăm orele ocupate în funcție de data disponibilă
            const dateKey = service.dataDisponibila;
            if (!acc[dateKey]) {
              acc[dateKey] = [];
            }
            acc[dateKey].push(service.oraDisponibila);
  
            return acc;
          }, {});
  
          // Actualizăm starea componentului cu orele ocupate
          this.setState({ oreOcupate });
          this.getOreDisponibile(oreOcupate, this.state.dataDisponibila);
        } else {
          // Dacă nu există servicii, setăm orele ocupate ca fiind un array gol
          this.setState({ oreOcupate: [] });
        }
      })
      .catch(e => {
        console.log(e);
      });
  }
  

  getMedici() {
    TutorialDataService.getAllPersonal()
      .then(response => {
        this.setState({
          medici: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  onChangeMedicId(e) {
    this.setState({
      medicId: e.target.value
    });

    if(this.state.dataDisponibila){
        this.fetchOreOcupate();
    }
    
  }

  getOreDisponibile(oreOcupate, date) {
    const allHours = [...Array(11).keys()].map(i => `${(8 + i).toString().padStart(2, '0')}:00`);
    const bookedHours = oreOcupate[date] || [];
    const ore = allHours.filter(hour => !bookedHours.includes(hour));
    this.setState({
      oreDisponibile: ore
    });
  }

  onChangeNumeConsult(e) {
    this.setState({
      numeConsult: e.target.value
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
    if(this.state.medicId){
        this.fetchOreOcupate();
    }
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

  getServiciu(id) {
    TutorialDataService.getServiciuById(id)
      .then(response => {
        const data = response.data;
        console.log(data)
        this.setState({
          medicId: data.medic.medicId,
          numeConsult: data.numeConsult,
          costServiciu: data.costServiciu,
          durata: data.durata,
          dataDisponibila: data.dataDisponibila,
          oraDisponibila: data.oraDisponibila,
          stare: data.stare,
        });
        this.fetchOreOcupate();
      })
      .catch(e => {
        console.log(e);
      });
  }

  saveServiciu() {
    const parts = window.location.href.split("/");
    const id = parseInt(parts[parts.length -1]);
    const data = {
      medicId: this.state.medicId,
      numeConsult: this.state.numeConsult,
      costServiciu: this.state.costServiciu,
      durata: this.state.durata,
      dataDisponibila: this.state.dataDisponibila,
      oraDisponibila: this.state.oraDisponibila,
      stare: this.state.stare
    };

    if (id) {
      TutorialDataService.updateServiciu(id, data)
        .then(response => {
          this.setState({
            submitted: true
          });
          this.props.history.push('/afisareInfo');
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      TutorialDataService.createServiciu(data)
        .then(response => {
          this.setState({
            submitted: true
          });
          this.props.history.push('/afisareInfo');
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

  newServiciu() {
    this.setState({
      medicId: "",
      numeConsult: "",
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
      this.saveServiciu();
    }
  }

  render() {
    return (
      <div className="submit-form">
        <Row>
          {this.state.submitted ? (
            <div>
              <h5 style={{ marginTop: "60px", marginLeft: "50px" }}>
                Serviciu {this.props.match.params.id ? "actualizat" : "adăugat"} cu succes!
              </h5>
              <button className="btn btn-light" onClick={this.newServiciu}
                style={{ color: "black", marginLeft: "140px", marginTop: "80px", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)" }}>
                {this.props.match.params.id ? "Editează din nou" : "Adaugă alt serviciu"}
              </button>
            </div>
          ) : (
            <div>
             {this.state.medici ?  <Form onSubmit={this.handleSubmit} ref={c => { this.form = c; }}>
                <div className="form-group" style={{ marginTop: '60px' }}>
                  <label htmlFor="medicId">Medic</label>
                  <Select
                    name="medicId"
                    className="form-control"
                    id="medicId"
                    value={this.state.medicId}
                    onChange={this.onChangeMedicId}
                    validations={[required]}
                  >
                    <option value="">Alege un medic</option>
                    {this.state?.medici?.map(medic => (
                      <option key={medic.medicId} value={medic.medicId}>{medic.numeMedic}</option>
                    ))}
                  </Select>
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
                  <label htmlFor="dataDisponibila">Data disponibilă</label>
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
                  <label htmlFor="oraDisponibila">Ora disponibilă</label>
                  <Select
                    className="form-control"
                    id="oraDisponibila"
                    required
                    value={this.state.oraDisponibila}
                    onChange={this.onChangeOraDisponibila}
                    name="oraDisponibila"
                    validations={[required]}
                  >
                    <option value="">Selectați ora</option>
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
                    <option value="">Alege o stare</option>
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
              </Form> : <div>
                <h2>Nu sunt medici.</h2>
                </div>}
            </div>
          )}
        </Row>
      </div>
    );
  }
}

