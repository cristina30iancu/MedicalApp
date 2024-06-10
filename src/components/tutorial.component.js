import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import '../components/custom.css'
import Input from "react-validation/build/input";
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
  if ( value==0) {
    return (
      <div className="alert alert-danger" role="alert">
         The number  must be more then 0.
      </div>
    );
  }
};

export default class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeProprietate=this.onChangeProprietate.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeZiPlecare=this.onChangeZiPlecare.bind(this);
    this.onChangeZiSosire=this.onChangeZiSosire.bind(this);
    this.onChangeNumarCamere=this.onChangeNumarCamere.bind(this);
    this.onChangeStare=this.onChangeStare.bind(this);

    this.onChangeNumarPersoane=this.onChangeNumarPersoane.bind(this);
    this.getTutorial = this.getTutorial.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);

    this.state = {
      currentTutorial: {
        calatorieId: null,
        destinatie: "",
        proprietate:"",
        
        pret: 0,
        dataPlecare: "",
        dataSosire:"",
        numarPersoane:0,
        numarCamere:0,
        status: "disponibil"
        
      },
      message: ""
    };
  }

  componentDidMount() {
    
    this.getTutorial(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const destinatie = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          destinatie: destinatie
        }
      };
    });
  }
  onChangeProprietate(e) {
    const proprietate = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          proprietate: proprietate
        }
      };
    });
  }

  onChangeDescription(e) {
    const pret = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        pret: pret
      }
    }));
  }
  onChangeZiPlecare(e) {
    const dataPlecare = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        dataPlecare: dataPlecare
      }
    }));
  }
  onChangeZiSosire(e) {
    const dataSosire = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        datasosire: dataSosire
      }
    }));
  }

  onChangeNumarCamere(e) {
    const numarCamere = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        numarCamere: numarCamere
      }
    }));
  }

  onChangeStare(e) {
    const status = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        status: status
      }
    }));
  }
  onChangeNumarPersoane(e) {
    const numarPersoane = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        numarPersoane: numarPersoane
      }
    }));
  }
 

 


  getTutorial(id) {
    TutorialDataService.get(id)
      .then(response => {
        this.setState({
          currentTutorial: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      calatorieId: this.state.currentTutorial.calatorieId,
      destinatie: this.state.currentTutorial.destinatie,
      proprietate:this.state.currentTutorial.proprietate,
      pret: this.state.currentTutorial.pret,
      dataPlecare: this.state.currentTutorial.dataPlecare,
      dataSosire:this.state.currentTutorial.dataSosire,
      numarPersoane:this.state.currentTutorial.numarPersoane,

      numarCamere:this.state.currentTutorial.numarCamere,
      status: this.state.currentTutorial.status,
      published: status
    };

    TutorialDataService.update(this.state.currentTutorial.calatorieId, data)
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
    TutorialDataService.update(
      this.state.currentTutorial.calatorieId,
      this.state.currentTutorial
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Sejur modificat cu succes!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTutorial() {    
    TutorialDataService.delete(this.state.currentTutorial.calatorieId)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/calatorie')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTutorial } = this.state;

    return (
      <div>
        {currentTutorial ? (
          <div className="edit-form">
            <h4>Calatorie</h4>
            <Form
            onSubmit={this.handleSubmit}
            ref={c => {
             this.form = c;
           }}>
              <div className="form-group">
                <label htmlFor="destinatie">Destinatie</label>
                <Input
                  type="text"
                  className="form-control"
                  id="destinatie"
                  value={currentTutorial.destinatie}
                  onChange={this.onChangeTitle}
                  validations={[required,name]}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="proprietate">Propietate</label>
                <Input
                  type="text"
                  className="form-control"
                  id="destinatie"
                  value={currentTutorial.proprietate}
                  onChange={this.onChangeProprietate}
                  validations={[required,name]}

                />
              </div>
              <div className="form-group">
                <label htmlFor="pret">Pret</label>
                <Input
                  type="number"
                  className="form-control"
                  id="pret"
                  value={currentTutorial.pret}
                  onChange={this.onChangeDescription}
                  validations={[required,val]}

                />
              </div>
              

              <div className="form-group">
                <label htmlFor="dataPlecare">Data Plecare</label>
                <Input
                  type="date"
                  className="form-control"
                  id="dataPlecare"
                  value={currentTutorial.dataPlecare}
                  onChange={this.onChangeZiPlecare}
                  validations={[required]}

                />
              </div>
              <div className="form-group">
                <label htmlFor="datasosire">Data Sosire</label>
                <Input
                  type="date"
                  className="form-control"
                  id="datasosire"
                  value={currentTutorial.dataSosire}
                  onChange={this.onChangeZiSosire}
                  validations={[required]}

                />
              </div>

              <div className="form-group">
                <label htmlFor="numarpersoane">Numar Persoane</label>
                <Input
                  type="number"
                  className="form-control"
                  id="numarpersoane"
                  value={currentTutorial.numarPersoane}
                  onChange={this.onChangeNumarPersoane}
                  validations={[required,val]}

                />
              </div>
              <div className="form-group">
                <label htmlFor="numarcamere">Numar Camere</label>
                <Input
                  type="number"
                  className="form-control"
                  id="numarcamere"
                  value={currentTutorial.numarCamere}
                  onChange={this.onChangeNumarCamere}
                  validations={[required,val]}

                />
              </div>
              <div className="form-group">
                <label htmlFor="stare">Status</label>
                <Input
                  type="text"
                  className="form-control"
                  id="status"
                  value={currentTutorial.status}
                  onChange={this.onChangeStare}
                  validations={[required,name]}

                />
              </div>
              

              <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />

              
            </Form>

           {/* {currentTutorial.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                Disponibil
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Rezervat
              </button>
            )}*/}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTutorial}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTutorial}
            >
              Update
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
