import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import {Button,Container, Row,Card} from 'react-bootstrap'
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
  


export default class AddMedici extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.onChangeNumeMedic = this.onChangeNumeMedic.bind(this); // Corrected binding
        this.onChangeNumeConsult = this.onChangeNumeConsult.bind(this);
        this.onChangeLocatie= this.onChangeLocatie.bind(this);
        this.onChangeCostServiciu = this.onChangeCostServiciu.bind(this);
        this.onChangeDurata = this.onChangeDurata.bind(this);
        this.onChangeDataDisponibila = this.onChangeDataDisponibila.bind(this);
        this.onChangeOraDisponibila = this.onChangeOraDisponibila.bind(this);
        this.onChangeStare = this.onChangeStare.bind(this);

        this.saveMedic = this.saveMedic.bind(this);
        this.newMedic = this.newMedic.bind(this);
    
        this.state = {
             medicId: null,
            // clinicaId: null,
            numeMedic: "",
            numeConsult: "",
            locatie:"",
            costServiciu: "",
            durata: "",
            dataDisponibila: "",
            oraDisponibila: "",
            stare:""
        };
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

  onChangeCostServiciu(e){
    this.setState({
        costServiciu:e.target.value
    });
  }

  onChangeDurata(e){
    this.setState({
        durata:e.target.value


    })
  }

  onChangeDataDisponibila(e){
    this.setState({
dataDisponibila:e.target.value
    });
  }
  onChangeOraDisponibila(e){
    this.setState({
oraDisponibila:e.target.value
    });
  }

  onChangeStare(e){
    this.setState({
stare:e.target.value
    });
  }



saveMedic() {
  
    var data = {
    //   medicId:this.state.medicId,
    //   clinicaId:this.state.clinicaId,
      numeMedic: this.state.numeMedic,
      numeConsult:this.state.numeConsult,
      locatie:this.state.locatie,
      costServiciu:this.state.costServiciu,
      durata:this.state.durata,
      dataDisponibila:this.state.dataDisponibila,
      oraDisponibila:this.state.oraDisponibila,
      stare:this.state.stare
    
      
    };

    TutorialDataService.createMedic(data)
  .then(response => {
    this.setState({
      medicId:response.data.medicId,
      numeMedic:response.data.numeMedic,
      numeConsult:response.data.numeConsult,
      locatie:response.data.locatie,
      costServiciu:response.data.costServiciu,
      durata:response.data.durata,
      dataDisponibila:response.data.dataDisponibila,
      oraDisponibila:response.data.oraDisponibila,
      stare:response.data.stare,
      submitted: true,

    });

   // this.updatePublished();

    console.log(response.data);
    this.props.history.push('/afisareInfo');


  })
  .catch(e => {
    console.log(e);
  });

}

newMedic() {
    this.setState({
     medicId: null,
    //   clinicaId:null,
      numeMedic: "",
      numeConsult:"",
      locatie:"",
      costServiciu:"",
      durata:"",
      dataDisponibila:"",
      oraDisponibila:"",
      stare:"",
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
      TutorialDataService.createMedic(
        this.state.numeMedic,
        this.state.numeConsult,
        this.state.locatie,
        this.state.costServiciu,
        this.state.durata,
        this.state.dataDisponibila,
        this.state.oraDisponibila,
        this.state.stare
 
      
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
               Medic adaugat cu succes!</h5>
            <button className="btn btn-light" onClick={this.newMedic}
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
              <label htmlFor="numeMedic">Nume medic</label>
              <Input
                type="text"
                className="form-control"
                id="numeMedic"
                required
                value={this.state.numeMedic}
                onChange={this.onChangeNumeMedic}
                name="numeMedic"
                validations={[required,name]}

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
                validations={[required,name]}

              />
            </div>

            <div className="form-group">
              <label htmlFor="numeConsult">Locatie</label>
              
              <Input
                type="text"
                className="form-control"
                id="locatie"
                required
                value={this.state.locatie}
                onChange={this.onChangeLocatie}
                name="locatie"
                validations={[required,name]}

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
                validations={[required,val]}

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
                validations={[required,val]}

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
                validations={[required,val]}

              />
            </div>

            <div className="form-group">
              <label htmlFor="oraDisponibila">Ora disponibila</label>
              <Input
                type="text"
                className="form-control"
                id="oraDisponibila"
                required
                value={this.state.oraDisponibila}
                onChange={this.onChangeOraDisponibila}
                name="oraDisponibila"
                validations={[required,val]}

              />
            </div>

            <div className="form-group">
              <label htmlFor="oraDisponibila">Stare</label>
              <Input
                type="text"
                className="form-control"
                id="oraDisponibila"
                required
                value={this.state.stare}
                onChange={this.onChangeStare}
                name="oraDisponibila"
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
             
            onClick={this.saveMedic} className="btn btn-dark">
              Save
            </Button>
            
          </div>
        )}
      
        </Row>
      </div>
    );
  }
}
