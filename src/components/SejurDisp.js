import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";
import '../components/custom.css'
import * as IconName  from "react-icons/bi";
import * as IconName4  from "react-icons/tb";
import {Button} from 'react-bootstrap'


export default class SejurDispn extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.onChangeSearchByJudet=this.onChangeSearchByJudet.bind(this);
    this.onChangeSearchProprietate=this.onChangeSearchProprietate.bind(this);
    this.onChangeSearchByDate=this.onChangeSearchByDate.bind(this);
    this.onChangeSearchByDateSosire=this.onChangeSearchByDateSosire.bind(this);
    this.onChangeSearchByNumarPersoane=this.onChangeSearchByNumarPersoane.bind(this);
    this.onChangeSearchByNumarCamera=this.onChangeSearchByNumarCamera.bind(this);
    this.onChangeSearchByCompanie=this.onChangeSearchByCompanie.bind(this);

    this.onChangeSearchTotal=this.onChangeSearchTotal.bind(this);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.searchJudet=this.searchJudet.bind(this);
    this.searchProprietate=this.searchProprietate.bind(this);
    this.searchDate=this.searchDate.bind(this);
    this.searchDateSosire=this.searchDateSosire.bind(this);
    this.searchNrpersoane=this.searchNrpersoane.bind(this);
    this.searchNrCamere=this.searchNrCamere.bind(this);
    this.searchCompanie=this.searchCompanie.bind(this);

    this.searchTotal=this.searchTotal.bind(this);


    this.state = {
      tutorials: [],
      currentTutorial: {
        calatorieId: null,
       destinatie: "",
       proprietate:"",
       
       pret: 0,
       dataPlecare: "",
       dataSosire:"",
       numarPersoane:0,
       numarCamere:0,
       numeCompanie:""

       
     },
      currentIndex: -1,
      searchTitle: '',
      searchJudet:'',
      searchProprietate:'',
      searchDate:'',
      searchDateSosire:'',
      searchNrpersoane:'',
      searchNrCamere:'',
      searchCompanie:'',

      searchTotal:''
    };
  }

  componentDidMount() {
    this.retrieveTutorials();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  onChangeSearchByJudet(e){
    const searchJudet=e.target.value;

    this.setState({
      searchJudet:searchJudet
    });
  }
  onChangeSearchProprietate(e) {
    const searchProprietate = e.target.value;

    this.setState({
      searchProprietate: searchProprietate
    });
  }
  onChangeSearchByNumarCamera(e) {
    const searchNrCamere = e.target.value;

    this.setState({
      searchNrCamere: searchNrCamere
    });
  }

  onChangeSearchByCompanie(e) {
    const searchCompanie = e.target.value;

    this.setState({
      searchCompanie: searchCompanie
    });
  }
  onChangeSearchByNumarPersoane(e) {
    const searchNrpersoane = e.target.value;

    this.setState({
      searchNrpersoane: searchNrpersoane
    });
  }
  onChangeSearchByDate(e){
    const searchDate=e.target.value;

    this.setState({
      searchDate:searchDate
    });
  }

  onChangeSearchByDateSosire(e){
    const searchDateSosire=e.target.value;

    this.setState({
      searchDateSosire:searchDateSosire
    });
  }

  onChangeSearchTotal(e){
    const searchTotal=e.target.value;

    this.setState({
      searchTotal:searchTotal
    });
  }

  retrieveTutorials() {
    TutorialDataService.getAll()
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
 
     
      /*TutorialDataService.findByCompanie()  
      .them(response => {
       this.setState({
         tutorials: response.data
       });
       console.log(response.data);
     })*/
     .catch(e => {
      console.log(e);
    });
      }

  refreshList() {
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
    console.log("BAAA");
  }

  removeAllTutorials() {
    TutorialDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });

    
 

    TutorialDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  searchJudet() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });

    
 

    TutorialDataService.findByJudet(this.state.searchJudet)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchProprietate() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });

 

    TutorialDataService.findByProprietate(this.state.searchProprietate)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchNrCamere() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });

 

    TutorialDataService.findByNumarCamere(this.state.searchNrCamere)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  searchCompanie(){
    this.setState({
      currentTutorial:null,
      currentIndex:-1
    });

    TutorialDataService.findByCompanie(this.state.searchCompanie)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchDate(){
    this.setState({
      currentTutorial:null,
      currentIndex:-1
    });

    TutorialDataService.findByDate(this.state.searchDate)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  
  searchNrpersoane(){
    this.setState({
      currentTutorial:null,
      currentIndex:-1
    });

    TutorialDataService.findByNumarPersoane(this.state.searchNrpersoane)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  searchDateSosire(){
    this.setState({
      currentTutorial:null,
      currentIndex:-1
    });

    TutorialDataService.findByDateSosire(this.state.searchDateSosire)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTotal(){
    this.setState({
      currentTutorial:null,
      currentIndex:-1
    });

    TutorialDataService.findByTot(this.state.searchTitle,this.state.searchJudet, this.state.searchProprietate,this.state.searchDate,this.state.searchDateSosire,this.state.searchNrpersoane,this.numarcamere)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const {tutorials, currentTutorial, currentIndex } = this.state;

    return (
      <div className="row">
         <div class="cointainer">
          
          <div class="col-sm-6">
           <div class="email-signature">
            <div class="signature-icon1">
              
              <p class="fa fa-globe" style={{color:"black  ",  fontFamily:"URW Chancery L "}}>
              <ul class="signature-content">
              <li>
        <h4 strong style={{ fontFamily:"URW Chancery L "}} >
        <IconName.BiMap/> Destinatia </h4>
        
          {tutorials &&
            tutorials.map((tutorial, index) => (
              <li
                className={
                  "l" +
                  
                  (index === currentIndex ? "active" : "")
                  
                }
                onClick={() => this.setActiveTutorial(tutorial, index)}
                key={index}
              ><IconName4.TbPoint/>
                {tutorial.destinatie}
                
              </li>
            ))}
              </li>
              
            </ul>
              </p>
              <Button
            className="btn  btn-dark"
            style={{ size:"60px",color: "white", border: "50px", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)"}}

            onClick={this.removeAllTutorials}
          >
            Remove All
          </Button>
            </div>
            
           </div>
          </div>
        

         
          </div>

           <div class=" col-lg  card" style={{marginLeft:"-400px"}}>
           <h5 class="card-title" style={{color:"black  ",  fontFamily:"URW Chancery L "}}>  <IconName.BiMap/>
   Detalii Sejur </h5>
      
          {currentTutorial ? (
            <div className="card-body">
              <div>
              
              
                <label>
                  <strong style={{color:"black  ",  fontFamily:"URW Chancery L "}}>Destinatie: </strong>  {currentTutorial.destinatie}
                </label>{" "}
                
              </div>
              <div>
              
              
                <label>
                  <strong style={{color:"black  ", fontFamily:"URW Chancery L "}}>Proprietate:</strong> {currentTutorial.proprietate}
                </label>{" "}
               
              </div>
              <div>
                <label>
                  <strong style={{color:"black  ", fontFamily:"URW Chancery L "}} >Pret:</strong> {currentTutorial.pret}
                </label>{" "}
              </div>
              <div>
                <label>
                  <strong style={{color:"black  ", fontFamily:"URW Chancery L "}} >Data Plecare:</strong>             {currentTutorial.dataPlecare}

                </label>{" "}
              </div>
              <div>
                <label>
                  <strong style={{color:"black  ", fontFamily:"URW Chancery L "}}>Data Sosire:</strong>  {currentTutorial.dataSosire}
                </label>{" "}
              </div>
              
              <div>
                <label>
                  <strong style={{color:"black  ", fontFamily:"URW Chancery L "}}>Numar Persoane:</strong> {currentTutorial.numarPersoane}
                </label>{" "}
               
              </div>
              <div>
                <label>
                  <strong style={{color:"black  ",fontFamily:"URW Chancery L "}}>Numar Camere:</strong>                {currentTutorial.numarCamere}

                </label>{" "}
              </div>
             
             

              <Link
                to={"/calatorie/" + currentTutorial.calatorieId}
                className="btn btn-dark"
                style={{ marginTop:"20px",color: "white", marginLeft:"80px", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)"}}

              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Apasa pe destinatie pentru detalii</p>
            </div>
          )}
        
        </div>
        
       
      </div>
      
    );
  }
}
