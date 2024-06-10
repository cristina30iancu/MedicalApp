import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import {Button,Container, Row} from 'react-bootstrap'
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

const notnull = value => {
  if (value.length==0) {
    return (
      <div className="alert alert-danger" role="alert">
        This is a null input
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
export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeProprietate=this.onChangeProprietate.bind(this);
    this.onChangeZiPlecare=this.onChangeZiPlecare.bind(this);
    this.onChangeZiSosire=this.onChangeZiSosire.bind(this);
    this.onChangeNumarCamere=this.onChangeNumarCamere.bind(this);
    this.onChangeNumarPersoane=this.onChangeNumarPersoane.bind(this);
    this.onChangeStare=this.onChangeStare.bind(this);


    this.saveTutorial = this.saveTutorial.bind(this);
    this.newTutorial = this.newTutorial.bind(this);

    this.state = {
      calatorieId: null,
      destinatie:"",
      proprietate:"",
      pret: 0,
      dataPlecare: "",
      dataSosire: "", 
      numarPersoane:0,
      numarCamere:0,
      status:"disponibil",
      submitted: false,
      message:"kkk"
    };
  }

  onChangeTitle(e) {
    this.setState({
      destinatie: e.target.value
    });
  }

  onChangeProprietate(e) {
    this.setState({
      proprietate: e.target.value
    });
  }
  onChangeDescription(e) {
    this.setState({
      pret: e.target.value
    });
  }
  onChangeStare(e) {
    this.setState({
      status: e.target.value
    });
  }
  onChangeZiPlecare(e) {
    this.setState({
      dataPlecare: e.target.value
    });
  }
  onChangeZiSosire(e) {
    this.setState({
      dataSosire: e.target.value
    });
  }
  onChangeNumarCamere(e) {
    this.setState({
      numarCamere: e.target.value
    });
  }

  onChangeNumarPersoane(e) {
    this.setState({
      numarPersoane: e.target.value
    });
  }
 
 

  saveTutorial() {
    var data = {
      destinatie: this.state.destinatie,
      proprietate:this.state.proprietate,
      pret: this.state.pret,
      dataPlecare: this.state.dataPlecare,
      dataSosire:this.state.dataSosire,
      numarPersoane:this.state.numarPersoane,

      numarCamere:this.state.numarCamere,
      status: this.state.status,
      rezervari: 0
    };

    TutorialDataService.create(data)
      .then(response => {
        this.setState({
          calatorieId: response.data.calatorieId,
          destinatie: response.data.destinatie,
          proprietate: response.data.proprietate,
          
          pret: response.data.pret,
          dataPlecare: response.data.dataPlecare,
          dataSosire:response.data.dataSosire,
          numarPersoane:response.data.numarPersoane,

          numarCamere:response.data.numarCamere,
          status:response.data.status,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTutorial() {
    this.setState({
      calatorieId: null,
      destinatie: "",
      proprietate:"",
      pret: 0,
      dataPlecare: "",
      dataSosire:"",
      numarPersoane:0,

      numarCamere:0,
      submitted:false
      
    });
  }
  handleSubmit(e)  {
    e.preventDefault();
    this.setState({
      message:"aa",
      successful: false
    })
    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      TutorialDataService.create(
        this.state.destinatie,
        this.state.proprietate,
        this.state.pret,
        this.state.dataPlecare,
        this.state.dataSosire,
        this.state.numarPersoane,
        this.state.numarCamere,
        this.state.status,

      
      ).then(
        () => {
          //this.props.history.push("/login");
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
            message: resMessage
          });
        }
      );
    }
  };
  render() {
    return (
      <div className="submit-form">
        <Row>
        {this.state.submitted ? (
          <div>
            <h5
          style={{ marginTop:"60px",marginLeft:"50px"}}
                        >
               Sejur adaugat cu succes!</h5>
            <button className="btn btn-light" onClick={this.newTutorial}
            style={{color:"black",marginLeft:"140px", marginTop:"80px" ,boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)"}}
                            >
              Add
            </button>
          </div>
           ) : (
          <div>
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
                required
                value={this.state.destinatie}
                onChange={this.onChangeTitle}
                name="destinatie"
                validations={[required,name]}

              />
            </div>
            <div className="form-group">
              <label htmlFor="proprietate">Propietate</label>
              
              <Input
                type="text"
                className="form-control"
                id="proprietate"
                required
                value={this.state.proprietate}
                onChange={this.onChangeProprietate}
                name="proprietate"
                validations={[required,name]}

              />
            </div>

            <div className="form-group">
              <label htmlFor="pret">Pret</label>
              <Input
                type="number"
                className="form-control"
                id="pret"
                required
                value={this.state.pret}
                onChange={this.onChangeDescription}
                name="pret"
                validations={[required,val]}

              />
            </div>

            <div className="form-group">
              <label htmlFor="dataPlecare">Zi Plecare</label>
              <Input
                type="date"
                className="form-control"
                id="dataPlecare"
                required
                value={this.state.dataPlecare}
                onChange={this.onChangeZiPlecare}
                name="dataPlecare"
                validations={[required,notnull]}

              />
            </div>
            <div className="form-group">
              <label htmlFor="datasosire">Zi Sosire</label>
              <Input
                type="date"
                className="form-control"
                id="datasosire"
                required
                value={this.state.dataSosire}
                onChange={this.onChangeZiSosire}
                name="datasosire"
                validations={[required,notnull]}

              />
            </div>
            <div className="form-group">
              <label htmlFor="numarpersoane">Numar Persoane</label>
              <Input
                type="number"
                className="form-control"
                id="numarpersoane"
                required
                value={this.state.numarPersoane}
                onChange={this.onChangeNumarPersoane}
                name="numarpersoane"
                validations={[required,val]}

              />
            </div>

            <div className="form-group">
              <label htmlFor="numarcamere">Numar Camere</label>
              <Input
                type="number"
                className="form-control"
                id="numarcamere"
                required
                value={this.state.numarCamere}
                onChange={this.onChangeNumarCamere}
                name="numarcamere"
                validations={[required,val]}

              />
            </div>
           
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
            
            </Form>
            
            

            <Button 
             style={{color:"white", marginLeft: "25%", marginTop:"10px", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)"}}
             variant="pink"
             
            onClick={this.saveTutorial} className="btn btn-dark">
              Save
            </Button>
            
          </div>
        )}
      
        </Row>
      </div>
    );
  }
}
