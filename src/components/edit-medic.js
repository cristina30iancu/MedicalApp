import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import '../components/custom.css'
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
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
  if (value == 0) {
    return (
      <div className="alert alert-danger" role="alert">
        The number  must be more then 0.
      </div>
    );
  }
};

export default class EditMedic extends Component {
  constructor(props) {
    super(props);
    this.onChangeNumeMedic = this.onChangeNumeMedic.bind(this);
   
    this.getTutorial = this.getTutorial.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);
    this.onChangeClinica = this.onChangeClinica.bind(this);
    this.getClinici = this.getClinici.bind(this);

    this.state = {
      clinici: [],
      clinicaId:"",
      currentTutorial: {
        clinicaId: "",
        medicId: null,
        numeMedic: 0,
        message: "kkk",
        showModeratorBoard: false,
        showAdminBoard: false,
        currentUser: undefined,
      },
      message: ""
    };
  }

  componentDidMount() {
    const { state } = this.props.location;
    const { medicId } = this.props.match.params;
    this.getClinici();
    if (state && state.tutorial) {
      console.log(state.tutorial.clinica.clinicaId)
      this.setState({
        currentTutorial: state.tutorial,
        clinicaId: state.tutorial.clinica.clinicaId
      });
    } else {
      this.getTutorial(medicId);
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
    const numeMedic = e.target.value;

    this.setState(function (prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          numeMedic: numeMedic
        }
      };
    });
  }

  getTutorial(id) {
    TutorialDataService.getMedic(id)
      .then(response => {
        this.setState({
          currentTutorial: response.data,
          clinicaId: response.data.clinica.clinicaId
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      medicId: this.state.currentTutorial.medicId,
      numeMedic: this.state.currentTutorial.numeMedic,
      clinicaId: this.state.clinicaId,
    };
console.log(data)
    TutorialDataService.updateMedic(this.state.currentTutorial.medicId, data)
      .then(response => {
        this.setState(prevState => ({
          currentTutorial: {
            ...prevState.currentTutorial,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTutorial() {
    const { medicId } = this.props.match.params; // Obține ID-ul tutorialului din URL
    const { currentTutorial } = this.state;
    var data = {
      numeMedic: this.state.currentTutorial.numeMedic,
      clinicaId: this.state.clinicaId,
    };
console.log(data)
    TutorialDataService.updateMedic(medicId, data)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/afisareInfo')

      })
      .catch(e => {
        console.log(e);
      });
  }


  deleteTutorial() {
    const { medicId } = this.props.match.params; // Obține ID-ul tutorialului din URL
    const { currentTutorial } = this.state;
    TutorialDataService.deleteMedic(medicId, currentTutorial)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/afisareInfo')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTutorial, clinicaId } = this.state;
console.log(currentTutorial, clinicaId)
    return (
      <div>
        {currentTutorial ? (
          <div className="edit-form">

            <Form
              onSubmit={this.handleSubmit}
              ref={c => {
                this.form = c;
              }}>

              <div>
                <h4>Editare medic</h4>
                <Form
                  onSubmit={this.handleSubmit}
                  ref={c => {
                    this.form = c;
                  }}>
                     <div className="form-group" style={{ marginTop: '60px' }}>
                  <label htmlFor="clinicaId">Clinică</label>
                  <Select
                    name="clinicaId"
                    className="form-control"
                    id="clinicaId"
                    value={clinicaId}
                    onChange={this.onChangeClinica}
                    validations={[required]}
                  >
                    <option value="">Alege o clinică</option>
                    {this.state.clinici.map(clinica => (
                      <option key={clinica.clinicaId} value={clinica.clinicaId}>{clinica.numeClinica}</option>
                    ))}
                  </Select>
                </div>
                  <div className="form-group" >
                    <label htmlFor="destinatie"> Nume Medic </label>
                    <Input
                      type="text"
                      className="form-control"
                      id="city"
                      required
                      value={currentTutorial.numeMedic}
                      onChange={this.onChangeNumeMedic}
                      name="city"
                    />
                  </div>
                </Form>
              </div>

            </Form>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTutorial}
            >
              Salvează
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    );
  }
}