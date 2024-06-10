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

export default class EditMedic extends Component {
  constructor(props) {
    super(props);
    this.onChangeNumeMedic = this.onChangeNumeMedic.bind(this);
    this.onChangeNumeConsult=this.onChangeNumeConsult.bind(this);
    this.onChangeLocatie= this.onChangeLocatie.bind(this);
    this.onChangeCostServiciu=this.onChangeCostServiciu.bind(this);
    this.onChangeDurata=this.onChangeDurata.bind(this);
    this.onChangeDataDisponibila=this.onChangeDataDisponibila.bind(this);
    this.onChangeOraDisponibila=this.onChangeOraDisponibila.bind(this);
    this.onChangeStare=this.onChangeStare.bind(this);

    this.getTutorial = this.getTutorial.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);

    this.state = {
      currentTutorial: {
       medicId: null,
      idClinica:null,
      numeMedic:0,
      numeConsult:"",
      locatie:"",
      costServiciu: 0,
      durata:0,
      dataDisponibila:0,
      oraDisponibila:"",
      stare:"",
      message:"kkk",
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
  
    if (state && state.tutorial) {
      this.setState({
        currentTutorial: state.tutorial
      });
    } else {
      this.getTutorial(medicId);
    }
  }
  

  onChangeNumeMedic(e) {
    const numeMedic = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          numeMedic: numeMedic
        }
      };
    });
  }
  onChangeNumeConsult(e) {
    const numeConsult = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          numeConsult: numeConsult
        }
      };
    });
  }

  onChangeLocatie(e) {
    const locatie = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        locatie: locatie
      }
    }));
  }
  onChangeCostServiciu(e) {
    const costServiciu = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        costServiciu: costServiciu
      }
    }));
  }
  onChangeDurata(e) {
    const durata = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        durata: durata
      }
    }));
  }


  onChangeDataDisponibila(e) {
    const dataDisponibila = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        dataDisponibila: dataDisponibila
      }
    }));
  }
  onChangeOraDisponibila(e) {
    const oraDisponibila = e.target.value;
    
    this.setState(prevState => ({
      currentTutorial: {
        ...prevState.currentTutorial,
        oraDisponibila: oraDisponibila
      }
    }));
  }

  
  onChangeStare(e) {
    const stare = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          stare: stare
        }
      };
    });
  }

 


  getTutorial(id) {
    TutorialDataService.getMedic(id)
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
      medicId: this.state.currentTutorial.medicId,
      numeMedic: this.state.currentTutorial.numeMedic,
      numeConsult:this.state.currentTutorial.numeConsult,
      locatie: this.state.currentTutorial.locatie,
      costServiciu: this.state.currentTutorial.costServiciu,
      durata:this.state.currentTutorial.durata,
      dataDisponibila:this.state.currentTutorial.dataDisponibila,
      oraDisponibila:this.state.currentTutorial.oraDisponibila,
      stare:this.state.currentTutorial.stare

  
   
    };

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
  
    TutorialDataService.updateMedic(medicId, currentTutorial)
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
    const { currentTutorial } = this.state;

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
             <h4>Edit  Medic Information</h4>
             <Form
            onSubmit={this.handleSubmit}
            ref={c => {
             this.form = c;
           }}>
            <div className="form-group" style={{ marginTop: '60px' }}>
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
            <div className="form-group">  
  <label htmlFor="destinatie"> Nume Consult</label>
  <Input
    type="text"
    className="form-control"
    id="adress"
    required
    value={currentTutorial.numeConsult}
    onChange={this.onChangeNumeConsult}
    name="adress"
    
  />
</div>


            <div className="form-group">
              <label htmlFor="proprietate">Locatie</label>
              <Input
                type="text"
                className="form-control"
                id="phone"
                required
                value={currentTutorial.locatie}
                onChange={this.onChangeLocatie}
                
                
              />
            </div>

            <div className="form-group">
              <label htmlFor="dataPlecare">Cost Serviciu</label>
              <Input
                type="number"
                className="form-control"
                id="dataPlecare"
                required
                value={currentTutorial.costServiciu}
                onChange={this.onChangeCostServiciu}
                name="dataPlecare"

              />
            </div>

            <div className="form-group">
              <label htmlFor="pret">Durata</label>
              <Input
                type="number"
                className="form-control"
                id="networks"
                required
                value={currentTutorial.durata}
                onChange={this.onChangeDurata}
                
                

              />
            </div>

            <div className="form-group">
  <label htmlFor="pret">Data Disponibila</label>
  <input
    type="date"
    className="form-control"
    id="networks"
    required
    value={currentTutorial.dataDisponibila}
    onChange={this.onChangeDataDisponibila}
  />
</div>



            <div className="form-group">
              <label htmlFor="pret">Ora Disponibila</label>
              <Input
                type="text"
                className="form-control"
                id="networks"
                required
                value={currentTutorial.oraDisponibila}
                onChange={this.onChangeDataDisponibila}
                
                

              />
            </div>

            
            <div className="form-group">
              <label htmlFor="pret">Stare</label>
              <Input
                type="text"
                className="form-control"
                id="networks"
                required
                value={currentTutorial.stare}
                onChange={this.onChangeStare}
                
                

              />
            </div>
            
            

           
           
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
            
            </Form>
            
            

        
            
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