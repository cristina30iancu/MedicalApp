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

export default class AddClinica extends Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
  
      this.onChangeNumeClinica = this.onChangeNumeClinica.bind(this);
      this.onChangeLocatie = this.onChangeLocatie.bind(this);


      this.saveClinica = this.saveClinica.bind(this);
      this.newClinica = this.newClinica.bind(this);
  
      this.state = {
        clinicaId: null,
        numeClinica:"",
        locatie:"",
        submitted: false,
        message:"kkk"
      };
    
    
    }

    onChangeNumeClinica(e) {
        this.setState({
          numeClinica: e.target.value
        });
      }

      
  onChangeLocatie(e) {
    this.setState({
      locatie: e.target.value
    });
  }

  
  saveClinica() {
    var data = {
      numeClinica: this.state.numeClinica,
      locatie:this.state.locatie,

    };


    ///trebuie sa ma duc in tutorial DataService sa pun cele 3 sa l caute
    TutorialDataService.createClinica(data)
    .then(response => {
      this.setState({
        clinicaId: response.data.clinicaId,
        numeClinica: response.data.numeClinica,
        locatie: response.data.locatie,
        
     
        submitted: true
      });
      console.log(response.data);
      this.props.history.push('/afisareInfo');

    })
    .catch(e => {
      console.log(e);
    });
}


newClinica() {
    this.setState({
      clinicaId: null,
      numeClinica: "",
      locatie:"",
      
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
      TutorialDataService.createClinica(
        this.state.numeClinica,
        this.state.locatie,
 
      
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

  // render() {
  //   return (

  //     <Container>
  //       <Row className="justify-content-md-center">
  //         <Card style={{ width: '30rem' }}>
  //           <Card.Body>
  //             <Form onSubmit={this.handleSubmit} ref={c => { this.form = c; }}></Form>
  //     <div className="submit-form">
  //       <Row>
  //       {this.state.submitted ? (
  //         <div>
  //           <h5
  //         style={{ marginTop:"60px",marginLeft:"-750px"}}
  //                       >
  //              Clinica adaugata cu succes!</h5>
  //           <button className="btn btn-light2" onClick={this.newClinica}
  //           style={{color:"black",boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)", marginLeft:"-800px"}} >                              
  //             Add
  //           </button>
  //         </div>
  //          ) : (
  //         <div>
  //           <br></br>
  //           <br></br>
  //           <br></br>
  //            <Form
  //           onSubmit={this.handleSubmit}
  //           ref={c => {
  //            this.form = c;
  //          }}>
  //           <div className="form-group" >
  //             <label htmlFor="numeClinica"  style={{marginLeft:"-650px"}}>Nume clinica</label>
  //             <Input
  //               type="text"
  //               className="form-control2" style={{marginLeft:"-750px"}}
  //               id="numeClinica"
  //               required
  //               value={this.state.numeClinica}
  //               onChange={this.onChangeNumeClinica}
  //               name="numeClinica"
  //               validations={[required,name]}

  //             />
  //           </div>
  //           <div className="form-group">
  //             <label htmlFor="locatie" style={{marginLeft:"-650px"}}>Locatie</label>
              
  //             <Input
  //               type="text"
  //               className="form-control2"  style={{marginLeft:"-750px"}}
  //               id="locatie"
  //               required
  //               value={this.state.locatie}
  //               onChange={this.onChangeLocatie}
  //               name="locatie"
  //               validations={[required,name]}

  //             />
  //           </div>

          

       
  

     
           
  //           <CheckButton
  //             style={{ display: "none" }}
  //             ref={c => {
  //               this.checkBtn = c;
  //             }}
  //           />
            
  //           </Form>
            
            

  //           <Button 
  //            style={{color:"black", marginTop:"10px", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)"}}
  //            variant="pink"
             
  //           onClick={this.saveClinica} className="btn-btn-dark2" >
  //             Save
  //           </Button>
            
  //         </div>
  //       )}
      
  //       </Row>
  //     </div>
  //     </Card.Body>
  //         </Card>
  //       </Row>
  //     </Container>
  //   );
  // }

      
  render() {
    return (
      <div className="submit-form">
        <Row>
        {this.state.submitted ? (
          <div>
            <h5
          style={{ marginTop:"60px",marginLeft:"50px"}}
                        >
               Clinica adaugata cu succes!</h5>
            <button className="btn btn-light" onClick={this.newClinica}
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
              <label htmlFor="numeClinica">Nume clinica</label>
              <Input
                type="text"
                className="form-control"
                id="numeClinica"
                required
                value={this.state.numeClinica}
                onChange={this.onChangeNumeClinica}
                name="numeClinica"
                validations={[required,name]}

              />
            </div>
            <div className="form-group">
              <label htmlFor="locatie">Locatia</label>
              
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
             
            onClick={this.saveClinica} className="btn btn-dark">
              Save
            </Button>
            
          </div>
        )}
      
        </Row>
      </div>
    );
  }
}



// render() {
//   const commonStyle = {
//     marginLeft: "-650px",
//     boxShadow: "50px",
    

//     // Adauga alte stiluri comune aici
//   };

//   return (
//     <Container>
//       <Row className="justify-content-md-center">
//         <Card style={{ width: '30rem' }}>
//           <Card.Body>
//             <Form onSubmit={this.handleSubmit} ref={c => { this.form = c; }}></Form>
//             <div className="submit-form">
//               <Row>
//                 {this.state.submitted ? (
//                   <div>
//                     <h5 style={{ ...commonStyle, marginTop: "60px", marginRight:"500px" }}>Clinica adaugata cu succes!</h5>
//                     <button
//                       className="btn-btn-light2"
//                       onClick={this.newClinica}
//                       style={{ color: "black", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)", ...commonStyle }}
//                     >
//                       Add
//                     </button>
//                   </div>
//                 ) : (
//                   <div>
//                     <br></br>
//                     <br></br>
//                     <br></br>
//                     <Form
//                       onSubmit={this.handleSubmit}
//                       ref={c => {
//                         this.form = c;
//                       }}>
//                       <div className="form-group">
//                         <label htmlFor="numeClinica" style={commonStyle}>Nume clinica</label>
//                         <Input
//                           type="text"
//                           className="form-control2"
//                           style={{ ...commonStyle, marginLeft: "-750px" }}
//                           id="numeClinica"
//                           required
//                           value={this.state.numeClinica}
//                           onChange={this.onChangeNumeClinica}
//                           name="numeClinica"
//                           validations={[required, name]}
//                         />
//                       </div>
//                       <div className="form-group">
//                         <label htmlFor="locatie" style={commonStyle}>Locatie</label>
//                         <Input
//                           type="text"
//                           className="form-control2"
//                           style={{ ...commonStyle, marginLeft: "-750px" }}
//                           id="locatie"
//                           required
//                           value={this.state.locatie}
//                           onChange={this.onChangeLocatie}
//                           name="locatie"
//                           validations={[required, name]}
//                         />
//                       </div>
//                       <CheckButton
//                         style={{ display: "none" }}
//                         ref={c => {
//                           this.checkBtn = c;
//                         }}
//                       />
//                     </Form>
//                     <Button
//                       style={{ color: "black", marginTop: "10px", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)", ...commonStyle }}
//                       variant="pink"
//                       onClick={this.saveClinica}
//                       className="btn-btn-dark2"
//                     >
//                       Save
//                     </Button>
//                   </div>
//                 )}
//               </Row>
//             </div>
//           </Card.Body>
//         </Card>
//       </Row>
//     </Container>
//   );
// }
