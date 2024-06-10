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

export default class EditClinica extends Component {
  constructor(props) {
    super(props);
    this.onChangeNumeClinica = this.onChangeNumeClinica.bind(this);
    this.onChangeLocatie=this.onChangeLocatie.bind(this);
    this.getTutorial = this.getTutorial.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);

    this.state = {
      currentTutorial: {
       clinicaId: null,
      numeClinica:"",
      locatie:"",
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
    const { clinicaId } = this.props.match.params;
  
    if (state && state.tutorial) {
      this.setState({
        currentTutorial: state.tutorial
      });
    } else {
      this.getTutorial(clinicaId);
    }
  }
  

  onChangeNumeClinica(e) {
    const numeClinica = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          numeClinica: numeClinica
        }
      };
    });
  }
  onChangeLocatie(e) {
    const locatie = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          locatie: locatie
        }
      };
    });
  }

 
 
 


  
 


 


  getTutorial(id) {
    TutorialDataService.getClinica(id)
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
      clinicaId: this.state.currentTutorial.clinicaId,
      numeClinica: this.state.currentTutorial.numeClinica,
      locatie: this.state.currentTutorial.locatie,
      
   
    };

    TutorialDataService.updateClinica(this.state.currentTutorial.clinicaId, data)
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
    const { clinicaId } = this.props.match.params; // Obține ID-ul tutorialului din URL
    const { currentTutorial } = this.state;
  
    TutorialDataService.updateClinica(clinicaId, currentTutorial)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/afisareInfo')
        
      })
      .catch(e => {
        console.log(e);
      });
  }
  

  deleteTutorial() {    
    const { clinicaId } = this.props.match.params; // Obține ID-ul tutorialului din URL
    const { currentTutorial } = this.state;
    TutorialDataService.deleteClinica(clinicaId, currentTutorial)
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
             <h4>Edit  Clinica Information</h4>
             <Form
            onSubmit={this.handleSubmit}
            ref={c => {
             this.form = c;
           }}>
            <div className="form-group" style={{ marginTop: '60px' }}>
  <label htmlFor="destinatie"> Nume Clinica </label>
  <Input
  type="text"
  className="form-control"
  id="city"
  required
  value={currentTutorial.numeClinica}
  onChange={this.onChangeNumeClinica}
  name="city"
/>
</div>
            <div className="form-group">  
  <label htmlFor="destinatie"> Locatie</label>
  <Input
    type="text"
    className="form-control"
    id="adress"
    required
    value={currentTutorial.locatie}
    onChange={this.onChangeLocatie}
    name="adress"
    
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