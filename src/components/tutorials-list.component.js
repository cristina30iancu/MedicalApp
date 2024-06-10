  import React, { Component } from "react";
  import TutorialDataService from "../services/tutorial.service";
  import 'bootstrap/dist/css/bootstrap.min.css'
  import Input from "react-validation/build/input";
  import CheckButton from "react-validation/build/button";
  import Form from "react-validation/build/form";
  import {Button} from 'react-bootstrap'
  import '../components/custom.css'
  import * as IconName  from "react-icons/bi";
  import * as IconName3  from "react-icons/ai";
  import * as IconName4  from "react-icons/tb";
  import *as IconName5 from "react-icons/bs";
  import *as IconName6 from "react-icons/md"
  import *as IconName7 from "react-icons/io"

  import * as FaHandHoldingMedical  from "react-icons/fa";
  import AuthService from "../services/auth.service";
  import { Map, GoogleApiWrapper,Marker  } from 'google-maps-react';
  import Geocode from "react-geocode";
  import { isEmail } from "validator";
  import Maa from "../components/heart.jpg"

  import Popup from 'reactjs-popup';

  

  const mapStyles = {
    width: '40%',
    height: '40%'
  };
  const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
  const email = value => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email, you need the '@..' annotation.
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
  const tel = value => {
    if ( value.length <10) {
      return (
        <div className="alert alert-danger" role="alert">
          The phone must be 10 characters.
        </div>
      );
    }
  };  
  export class TutorialsList extends Component {
  constructor(props) {
  super(props);
  this.handleSubmit = this.handleSubmit.bind(this);


  this.onChangeSearchSpecialitate=this.onChangeSearchBySpecialitate.bind(this);
  this.onChangeSearchData=this.onChangeSearchByData.bind(this);
  this.onChangeSearchByJudet=this.onChangeSearchByJudet.bind(this);
  this.onChangeSearchByLocatia=this.onChangeSearchByLocatia.bind(this);
  this.onChangeSearchByZiuaProgramarii=this.onChangeSearchByZiuaProgramarii.bind(this);
  this.onChangeSearchByCostServiciu=this.onChangeSearchByCostServiciu.bind(this);
  this.onChangeSearchByLocuriDisponibile=this.onChangeSearchByLocuriDisponibile.bind(this);
  this.onChangeSearchByNumeConsult=this.onChangeSearchByNumeConsult.bind(this);
  this.onChangeSearchByLocatie=this.onChangeSearchByLocatie.bind(this);
  this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
  this.onChangeNumeMedic = this.onChangeNumeMedic.bind(this);
  this.onChangeSearchByJudet=this.onChangeSearchByJudet.bind(this);
  this.onChangeSearchBySpecialitate = this.onChangeSearchBySpecialitate.bind(this);
this.onChangeSearchByData=this.onChangeSearchByData.bind(this);
this.onChangeSearchByDataDisponibila=this.onChangeSearchByDataDisponibila.bind(this);
  this.onChangeSearchProprietate=this.onChangeSearchProprietate.bind(this);
  this.onChangeSearchByDate=this.onChangeSearchByDate.bind(this);
  this.onChangeSearchByDateSosire=this.onChangeSearchByDateSosire.bind(this);
  this.onChangeSearchByNumarPersoane=this.onChangeSearchByNumarPersoane.bind(this);
  this.onChangeSearchByNumarCamera=this.onChangeSearchByNumarCamera.bind(this);
  this.onChangeSearchByCompanie=this.onChangeSearchByCompanie.bind(this);
  this.onChangeSearchProgramare=this.onChangeSearchProgramare.bind(this);
  this.onChangeSearchDatsDatep=this.onChangeSearchDatsDatep.bind(this);
  this.onChangeSearchDestinatieDate=this.onChangeSearchDestinatieDate.bind(this);
  this.onChangeSearchNumeClient=this.onChangeSearchByNumeClient.bind(this);
  this.onChangeNumeClient = this.onChangeNumeClient.bind(this);
  this.onChangeTelefonClient=this.onChangeTelefonClient.bind(this);
  this.onChangeEmailClient=this.onChangeEmailClient.bind(this);
  this.onChangeNumarCamere=this.onChangeNumarCamere.bind(this);
  this.onChangeutilizatorId=this.onChangeutilizatorId.bind(this);
  this.retrieveTutorials = this.retrieveTutorials.bind(this);
  this.retrieveClienti=this.retrieveClienti.bind(this);
  this.retrieveMedic=this.retrieveMedic.bind(this);
  this.refreshList = this.refreshList.bind(this);
  this.setActiveTutorial = this.setActiveTutorial.bind(this);
  this.removeAllTutorials = this.removeAllTutorials.bind(this);
  this.searchTitle = this.searchTitle.bind(this);
  this.searchNumeMedic=this.searchNumeMedic.bind(this);
  this.searchJudet=this.searchJudet.bind(this);
  this.searchSpecialitate=this.searchSpecialitate.bind(this);
  this.searchData=this.searchData.bind(this);
  this.searchProgramareMedic=this.searchProgramareMedic.bind(this);
  this.searchProprietate=this.searchProprietate.bind(this);
  this.searchDate=this.searchDate.bind(this);
  this.searchDateSosire=this.searchDateSosire.bind(this);
  this.searchNrpersoane=this.searchNrpersoane.bind(this);
  this.searchNrCamere=this.searchNrCamere.bind(this);
  this.searchCompanie=this.searchCompanie.bind(this);
  this.searchLocatia=this.searchLocatia.bind(this);
  this.searchProgramare=this.searchProgramare.bind(this);
  this.searchDatsDatep=this.searchDatsDatep.bind(this);
  this.searchDestinatieDate=this.searchDestinatieDate.bind(this);
  this.searchNumere=this.searchNumere.bind(this);
  this.searchNumeClient=this.searchNumeClient.bind(this);
  this.searchEmailClient=this.searchEmailClient.bind(this);
  this.saveClient = this.saveClient.bind(this);
this.searchDataDisponibila=this.searchDataDisponibila.bind(this);


  this.state = {
    tutorials: [],
    currentTutorial: {
      calatorieId: null,
      destinatie: "",
      proprietate:"",
      dataDisponibila:"",
      locatie:"",
      costServiciu:"",
      oraDisponibila:"",
      numeConsult:"",
      pret: null,
      dataPlecare: "",
      dataSosire:"",
      numarPersoane:null,
      numarCamere:0,
      numeCompanie:"",
      stare:"disponibil",
      numeClient:"",
      telefonClient:"",
      emailClient:"",
      utilizatorId:null,
      currentUser: undefined,
      rezervari:0,
      message1:"",
      numeMedic:"",  
      saveCount: 0,
     
        errors:{}
      
    },
    currentIndex: -1,
    searchTitle: '',
    searchNumeMedic:'',
    searchJudet: '',
    searchSpecialitate:'',
    searchData:'',

    searchProprietate:'',
    searchNumeConsult:'',
    searchDate:'',
    searchLocatie:'',
    searchLocatia:'',
    searchDateSosire:'',
    searchNrpersoane:'',
    searchNrCamere:'',
    searchCompanie:'',
   // searchTotal:'',
   searchDataDisponibila:'',
    searchProgramare:'',
    searchDatsDatep:'',
    searchDestinatieDate:'',
    searchNumere:'',
    searchNumeClient:'',
    searchEmailClient:'',
    searchProgramareMedic:'',
    searchUtilizatorId:'',
    currentLat: '',
    currentLng: '',
    
    showModeratorBoard: false,
    showAdminBoard: false
  };
  }

   
  // saveClient() {
    
  //     var data = {
  //       utilizatorId:this.state.utilizatorId,
  //       numeClient: this.state.numeClient,
  //       telefonClient:this.state.telefonClient,
  //       emailClient:this.state.emailClient,
      
        
  //     };
  // TutorialDataService.createclient(data)
  //   .then(response => {
  //     this.setState({
  //       numeClient:response.data.numeClient,
  //       telefonClient:response.data.telefonClient,
  //       emailClient:response.data.emailClient,
  //       submitted: true,

  //     });

  //     this.updatePublished();

  //     console.log(response.data);

  //   })
  //   .catch(e => {
  //     console.log(e);
  //   });
  // }



  // saveClient() {
  //   var data = {
  //     utilizatorId: this.state.utilizatorId,
  //     numeClient: this.state.numeClient,
  //     telefonClient: this.state.telefonClient,
  //     emailClient: this.state.emailClient,
  //   };
  
  //   TutorialDataService.createclient(data)
  //     .then(response => {
  //       this.setState({
  //         numeClient: response.data.numeClient,
  //         telefonClient: response.data.telefonClient,
  //         emailClient: response.data.emailClient,
  //         submitted: true,
  //         successful: true, // Actualizeaza starea pentru a indica succesul
  //       });
  
  //       this.updatePublished();
  
  //       console.log(response.data);
  
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       // În caz de eroare, poți trata și afișa un mesaj de eroare aici
  //       this.setState({
  //         successful: false,
  //         message: "A apărut o eroare la salvarea rezervării."
  //       });
  //     });
  // }


  // saveClient() {
  //   var data = {
  //     utilizatorId: this.state.utilizatorId,
  //     numeClient: this.state.numeClient,
  //     telefonClient: this.state.telefonClient,
  //     emailClient: this.state.emailClient,
  //   };
  
  //   TutorialDataService.createclient(data)
  //     .then(response => {
  //       // Actualizează starea clientului pentru a indica succesul
  //       this.setState({
  //         numeClient: response.data.numeClient,
  //         telefonClient: response.data.telefonClient,
  //         emailClient: response.data.emailClient,
  //         submitted: true,
  //         successful: true,
  //       });
  
  //       // Actualizează medicul pentru a-l face indisponibil
  //       this.updateTutorial();
  
  //       console.log(response.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       // În caz de eroare, poți trata și afișa un mesaj de eroare aici
  //       this.setState({
  //         successful: false,
  //         message: "A apărut o eroare la salvarea rezervării."
  //       });
  //     });
  // }
  
  // updateTutorial() {
  //   const { medicId } = this.props.match.params;
  //   const { currentTutorial } = this.state;
  
  //   // Setează starea medicului ca indisponibil
  //   const updatedTutorial = { ...currentTutorial, stare: "indisponibil" };
  
  //   TutorialDataService.updateMedic(medicId, updatedTutorial)
  //     .then(response => {
  //       console.log(response.data);
  //       this.props.history.push('/afisareInfo'); // Redirecționează către pagina de afișare info
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }
  
  saveClient() {
    var data = {
      utilizatorId: this.state.utilizatorId,
      numeClient: this.state.numeClient,
      telefonClient: this.state.telefonClient,
      emailClient: this.state.emailClient,
    };

    TutorialDataService.createclient(data)
      .then(response => {
        // Actualizează starea clientului pentru a indica succesul
        this.setState(prevState => ({
          numeClient: response.data.numeClient,
          telefonClient: response.data.telefonClient,
          emailClient: response.data.emailClient,
          submitted: true,
          successful: true,
          saveCount: prevState.saveCount + 1 // Incrementarea numărului de salvări
        }));

        // Actualizează medicul pentru a-l face indisponibil
       // this.updateTutorial();

        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
        // În caz de eroare, poți trata și afișa un mesaj de eroare aici
        this.setState({
          successful: false,
          message: "A apărut o eroare la salvarea rezervării."
        });
      });
  }




//aseta 2 sunt bune
//   saveClient() {
//     var data = {
//       utilizatorId: this.state.utilizatorId,
//       numeClient: this.state.numeClient,
//       telefonClient: this.state.telefonClient,
//       emailClient: this.state.emailClient,
//     };
  
//     TutorialDataService.createclient(data)
//       .then(response => {
//         this.setState({
//           numeClient: response.data.numeClient,
//           telefonClient: response.data.telefonClient,
//           emailClient: response.data.emailClient,
//           submitted: true,
//           successful: true, // Update the state to indicate success
//         });
  
//         console.log(response.data);
  
//         // Call the function to update the medic's status
//         //this.updateMedic(this.state.currentTutorial.medicId, 'indisponibil');
//       })
//       .catch(e => {
//         console.log(e);
//         // Handle and display an error message
//         this.setState({
//           successful: false,
//           message: "A apărut o eroare la salvarea rezervării."
//         });
//       });
//   }
  

//   // Function to update the medic's status
// // updateMedicStatus(medicId, stare) {
// //   TutorialDataService.updateMedic(this.state.currentTutorial.medicId, data)
// //   .then(response => {
// //     // Modificarea stării medicului în 'indisponibil'
// //     const updatedTutorial = {
// //       ...this.state.currentTutorial,
// //       published: status,
// //       stare: 'indisponibil' // modificarea stării aici
// //     };

// //     this.setState({
// //       currentTutorial: updatedTutorial
// //     });

// //     console.log(response.data);
// //   })
// //   .catch(e => {
// //     console.log(e);
// //   });

// // }



// updatePublished(status) {
//   var data = {
//     medicId: this.state.currentTutorial.medicId,
//     numeMedic: this.state.currentTutorial.numeMedic,
//     numeConsult:this.state.currentTutorial.numeConsult,
//     locatie: this.state.currentTutorial.locatie,
//     costServiciu: this.state.currentTutorial.costServiciu,
//     durata:this.state.currentTutorial.durata,
//     dataDisponibila:this.state.currentTutorial.dataDisponibila,
//     oraDisponibila:this.state.currentTutorial.oraDisponibila,
//     stare:this.state.currentTutorial.stare


 
//   };

//   TutorialDataService.updateMedic(this.state.currentTutorial.medicId, data)
//   .then(response => {
//     // Modificarea stării medicului în 'indisponibil'
//     const updatedTutorial = {
//       ...this.state.currentTutorial,
//       published: status,
//       stare: 'indisponibil' // modificarea stării aici
//     };

//     this.setState({
//       currentTutorial: updatedTutorial
//     });

//     console.log(response.data);
//   })
//   .catch(e => {
//     console.log(e);
//   });

// }





// updatePublished(status, stare) {
//   var data = {
//     medicId: this.state.currentTutorial.medicId,
//     numeMedic: this.state.currentTutorial.numeMedic,
//     numeConsult: this.state.currentTutorial.numeConsult,
//     locatie: this.state.currentTutorial.locatie,
//     costServiciu: this.state.currentTutorial.costServiciu,
//     durata: this.state.currentTutorial.durata,
//     dataDisponibila: this.state.currentTutorial.dataDisponibila,
//     oraDisponibila: this.state.currentTutorial.oraDisponibila,
//     stare: stare // setează starea la parametrul 'stare' primit
//   };

//   TutorialDataService.updateMedic(this.state.currentTutorial.medicId, data)
//     .then(response => {
//       // Verifică dacă actualizarea a fost reușită
//       if (response.status === 200) {
//         // Actualizează starea componentei cu starea nouă a medicului
//         const updatedTutorial = {
//           ...this.state.currentTutorial,
//           published: status,
//           stare: stare // modificarea stării aici
//         };

//         this.setState({
//           currentTutorial: updatedTutorial
//         });

//         console.log("Medic status updated:", response.data);
//       } else {
//         console.error("Failed to update medic status.");
//       }
//     })
//     .catch(error => {
//       console.error("Error updating medic status:", error);
//     });
// }
// saveClient() {
//   var data = {
//     utilizatorId: this.state.utilizatorId,
//     numeClient: this.state.numeClient,
//     telefonClient: this.state.telefonClient,
//     emailClient: this.state.emailClient,
//   };

//   TutorialDataService.createclient(data)
//     .then(response => {
//       this.setState({
//         numeClient: response.data.numeClient,
//         telefonClient: response.data.telefonClient,
//         emailClient: response.data.emailClient,
//         submitted: true,
//         successful: true, // Update the state to indicate success
//       });

//       console.log(response.data);

//       // Apelarea funcției pentru a actualiza starea medicului la "indisponibil"
//       this.updatePublished('published', 'indisponibil');
//     })
//     .catch(e => {
//       console.log(e);
//       // Handle and display an error message
//       this.setState({
//         successful: false,
//         message: "A apărut o eroare la salvarea rezervării."
//       });
//     });
// }

  
  // DecreaseItem = () => {
  // this.setState({ numarCamere: this.currentTutorial.numarCamere - 1 });
  // }

  componentDidMount() {
  Geocode.setApiKey("AIzaSyCIkreFREuvmp_DMV3790H-JQK2hHSFPgs");

  // set response region. Its optional.
  // A Geocoding request with region=es (Spain) will return the Spanish city.
  Geocode.setRegion("ro");
  const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("USER"),
        showAdminBoard: user.roles.includes("ADMIN"),
        utilizatorId:user.id
      });
    }
    console.log(this.state.utilizatorId+"ASDADASDASDAS"+user.id);
  this.retrieveTutorials();
  this.retrieveMedic();
  }

  onChangeSearchTitle(e) {
  const searchTitle = e.target.value;

  this.setState({
    searchTitle: searchTitle
  });
  }

  onChangeNumeMedic(e) {
    const searchNumeMedic = e.target.value;
  
    this.setState({
      searchNumeMedic: searchNumeMedic
    });
    }


    onChangeSearchByLocatie(e) {
      const searchLocatia = e.target.value;
    
      this.setState({
        searchLocatia: searchLocatia
      });
      }

    onChangeSearchByDataDisponibila = (e) => {
      const searchDataDisponibila = e.target.value;
      this.setState({
        searchDataDisponibila: searchDataDisponibila
      });
    }
    
    
  

  onChangeSearchBySpecialitate(e){
    const searchSpecialitate=e.target.value;

    this.setState({searchSpecialitate:searchSpecialitate});
  }

  onChangeSearchByJudet(e){
    const searchJudet=e.target.value;

    this.setState({
      searchJudet:searchJudet
    });
  }

  onChangeSearchByLocatia(e){
    const searchLocatia=e.target.value;

    this.setState({
      searchLocatia:searchLocatia
    });
  }

  onChangeSearchByZiuaProgramarii(e){
    const searchZiuaProgramarii=e.target.value;

    this.setState({
      searchZiuaProgramarii:searchZiuaProgramarii
    });
  }

  onChangeSearchByCostServiciu(e){
    const searchCostServiciu=e.target.value;

    this.setState({
      searchCostServiciu:searchCostServiciu
    });
  }

  onChangeSearchByLocuriDisponibile(e){
    const searchLocuriDisponibile=e.target.value;

    this.setState({
      searchLocuriDisponibile:searchLocuriDisponibile
    });
  }


  onChangeSearchByNumeConsult(e){
    const searchNumeConsult=e.target.value;

    this.setState({
      searchNumeConsult:searchNumeConsult
    });
  }


  onChangeSearchByData(e){
    const searchData=e.target.value;

    this.setState({
      searchData:searchData
    });
  }

  onChangeutilizatorId(e) {
  const searchUtilizatorId = e.target.value;

  this.setState({
    searchUtilizatorId: searchUtilizatorId
  });
  }

  onChangeSearchProprietate(e) {
  const searchProprietate = e.target.value;

  this.setState({
    searchProprietate: searchProprietate
  });
  }
  onChangeSearchByCompanie(e) {
  const searchCompanie = e.target.value;

  this.setState({
    searchCompanie: searchCompanie
  });
  }
  onChangeSearchByNumarCamera(e) {
  const searchNrCamere = e.target.value;

  this.setState({
    searchNrCamere: searchNrCamere
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
  onChangeSearchByStare(e){
  const searchStare=e.target.value;

  this.setState({
    searchStare:searchStare
  });
  }

  onChangeSearchByNumeClient(e) {
  const searchNumeClient = e.target.value;

  this.setState({
    searchNumeClient: searchNumeClient
  });
  }

  onChangeEmailClient(e) {
  const searchEmailClient = e.target.value;

  this.setState({
    searchEmailClient: searchEmailClient
  });
  }
 




  onChangeSearchProgramare(e){
    const searchProgramare=e.target.value;
  
    this.setState({
      searchProgramare:searchProgramare
    });
    }

  onChangeSearchNumere(e){
  const searchNumere=e.target.value;

  this.setState({
    searchNumere:searchNumere
  });
  }

  onChangeSearchDatsDatep(e){
  const searchDatsDatep=e.target.value;

  this.setState({
    searchDatsDatep:searchDatsDatep
  });
  }







  onChangeSearchDestinatieDate(e){
  const searchDestinatieDate=e.target.value;

  this.setState({
    searchDestinatieDate:searchDestinatieDate
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
    .catch(e => {
      console.log(e);
    });
  }
  retrieveClienti() {
    TutorialDataService.getAllClienti()
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

    retrieveMedic() {
      TutorialDataService.getAllMedici()
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
  

  refreshList() {
  this.retrieveTutorials();
  this.setState({
    currentTutorial: null,
    currentIndex: -1,
    // message: "Clientul "+this.state.numeClient+" a  rezervat cu succes "+ " "+this.state.numarCamere+" camere"

  });
  
  }

  setActiveTutorial(tutorial, index) {
    // Geocode.fromAddress("Brasov").then(
    //   (response) => {
    //      [this.currentLat, this.currentLng] = response.results[0].geometry.location;
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );
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

  
  searchNumeMedic() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  
  
  
    TutorialDataService.findByNumeMedic(this.state.searchNumeMedic)
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


  searchSpecialitate() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  
  
  
    TutorialDataService.findBySpecialitate(this.state.searchSpecialitate)
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

    searchDataDisponibila() {
      this.setState({
        currentTutorial: null,
        currentIndex: -1
      });
    
    
    
      TutorialDataService.findByDataDisponibila(this.state.searchDataDisponibila)
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

    searchNumeConsult() {
      this.setState({
        currentTutorial: null,
        currentIndex: -1
      });
    
    
    
      TutorialDataService.findByNumeConsult(this.state.searchNumeConsult)
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
  

      searchLocatia() {
        this.setState({
          currentTutorial: null,
          currentIndex: -1
        });
      
      
      
        TutorialDataService.findByLocatieMedic(this.state.searchLocatia)
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



    searchData() {
      this.setState({
        currentTutorial: null,
        currentIndex: -1
      });
    
    
      TutorialDataService.findByData(this.state.searchData)
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
 

  searchNumeClient() {
  this.setState({
    currentTutorial: null,
    currentIndex: -1
  });



  TutorialDataService.findByNumeClinet(this.state.searchNumeClient)
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






  searchEmailClient() {
  this.setState({
    currentTutorial: null,
    currentIndex: -1
  });



  TutorialDataService.findByEmail(this.state.searchEmailClient)
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

  searchTitlu() {
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

  searchDatsDatep(){
  this.setState({
    currentTutorial: null,
    currentIndex: -1
  });

  TutorialDataService.findByDatsDatap(this.state.searchDate, this.state.searchDateSosire)
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

  searchDestinatieDate(){
  this.setState({
    currentTutorial: null,
    currentIndex: -1
  });

  TutorialDataService.findByDestinatieDat(this.state.searchTitle,this.state.searchJudet,this.state.searchDate, this.state.searchDateSosire)
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
   searchProgramare(){
  this.setState({
    currentTutorial:null,
    currentIndex:-1
  });

  TutorialDataService.findByProgramare(this.state.searchSpecialitate,this.state.searchJudet,this.state.searchData)
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

  searchProgramareMedic(){
    this.setState({
      currentTutorial:null,
      currentIndex:-1
    });
  
    TutorialDataService.findByMedicCautare(this.state.searchNumeConsult,this.state.searchLocatia,this.state.searchDataDisponibila)
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



  searchNumere(){
  this.setState({
    currentTutorial:null,
    currentIndex:-1
  });

  TutorialDataService.findByNumere(this.state.searchNrpersoane,this.state.searchNrCamere)
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

  updatePublished() {
  var data = {

    calatorieId: this.state.currentTutorial.calatorieId,
    destinatie: this.state.currentTutorial.destinatie,
    proprietate:this.state.currentTutorial.proprietate,
    numeConsult:this.state.currentTutorial.numeConsult,
    locatie:this.state.currentTutorial.locatie,
    costServiciu:this.state.currentTutorial.costServiciu,
    oraDisponibila:this.state.currentTutorial.oraDisponibila,
    dataDisponibila:this.state.currentTutorial.dataDisponibila,
    pret: this.state.currentTutorial.pret,
    dataPlecare: this.state.currentTutorial.dataPlecare,
    dataSosire:this.state.currentTutorial.dataSosire,
    numarPersoane:this.state.currentTutorial.numarPersoane,
    numarCamere:this.state.currentTutorial.numarCamere-this.state.numarCamere,

    stare: this.state.currentTutorial.stare,
    rezervari: ++this.state.currentTutorial.rezervari
    
  };
  // this.setState({
  //   message: "Clientul "+this.state.numeClient+" a  rezervat cu succes "+ " "+this.state.numarCamere+" camere"});
  TutorialDataService.update(this.state.currentTutorial.calatorieId, data)
    .then(response => {
      this.setState(prevState => ({
        currentTutorial: {
          ...prevState.currentTutorial
        }
        
      }));
      
      console.log(response.data);
      // this.setState({
      //   message: "Clientul "+this.state.numeClient+" a  rezervat cu succes "+ " "+this.state.numarCamere+" camere"});
      this.refreshList();
      //window.location.reload();
      this.props.history.push(
        {
          pathname:"/clientpagina",
          state:{
            key:this.state.numeClient
          }
        }
      );

      
    })
    .catch(e => {
      console.log(e);
      
    });
    
    
  }

  onChangeNumeClient(e) {
    this.setState({
      numeClient: e.target.value
    });
  }
  onChangeEmailClient(e) {
    this.setState({
      emailClient: e.target.value
    });
  }
  onChangeNumarCamere(e) {
    this.setState({
      numarCamere: e.target.value,
      
    });
  }

  
  onChangeTelefonClient(e) {
    this.setState({
      telefonClient: e.target.value
    });
  }
  salvareSejur() {
  var data = {
    destinatie: this.state.destinatie,
    proprietate:this.state.proprietate,
    costServiciu:this.state.costServiciu,
    oraDisponibila:this.state.oraDisponibila,
    dataDisponibila:this.state.dataDisponibila,
    numeConsult:this.state.numeConsult,
    pret: this.state.pret,
    dataPlecare: this.state.dataPlecare,
    dataSosire:this.state.dataSosire,
    numarPersoane:this.state.numarPersoane,

    numarCamere:this.state.numarCamere,

    stare:this.state.stare
  };

  TutorialDataService.create(data)
    .then(response => {
      this.setState({
        calatorieId: response.data.calatorieId,
        destinatie: response.data.destinatie,
        proprietate:response.data.proprietate,
        costServiciu:response.data.costServiciu,
        oraDisponibila:response.data.oraDisponibila,
        dataDisponibila:response.data.dataDisponibila,
        numeConsult:response.data.numeConsult,
        pret: response.data.pret,
        dataPlecare: response.data.dataPlecare,
        dataSosire:response.data.dataSosire,
        numarPersoane:response.data.numarPersoane,

        numarCamere:response.data.numarCamere,
        stare:response.data.stare,
        

        submitted: true
        
      });

      console.log(response.data);

    })
    .catch(e => {
      console.log(e);
    });
  }

 

  handleSubmit(e)  {
    e.preventDefault();
    this.setState({
      message1: "email already used",
      successful: false
    })
    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      TutorialDataService.createclient(
        this.state.numeClient,
        this.state.emailClient,
        this.state.telefonClient
      ).then(
        () => {
          //this.props.history.push("/login");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message1) ||
            error.message1 ||
            error.toString();
          this.setState({
            successful: false,
            message1: resMessage
          });
        }
      );
    }
  };
 





render() {
  const { searchNumeConsult, searchLocatia, searchDataDisponibila, showAdminBoard, showModeratorBoard, tutorials, currentTutorial, currentIndex } = this.state;

  // Filtrarea tutorialelor după criteriile de căutare
  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSpeciality = searchNumeConsult ? tutorial.numeConsult.toLowerCase().includes(searchNumeConsult.toLowerCase()) : true;
    const matchesLocation = searchLocatia ? tutorial.locatie.toLowerCase().includes(searchLocatia.toLowerCase()) : true;
    const matchesDate = searchDataDisponibila ? tutorial.dataDisponibila === searchDataDisponibila : true;
    return matchesSpeciality && matchesLocation && matchesDate;
  });

  // Gruparea tutorialelor filtrate după numele medicului
  const groupedTutorials = filteredTutorials.reduce((acc, tutorial) => {
    acc[tutorial.numeMedic] = acc[tutorial.numeMedic] || [];
    acc[tutorial.numeMedic].push(tutorial);
    return acc;
  }, {});

  const groupedDoctorNames = Object.keys(groupedTutorials);

  // Verificare dacă există criterii de căutare introduse
  const hasSearchCriteria = searchNumeConsult || searchLocatia || searchDataDisponibila;

  return (
    <div className="list row">
      <div className="container">
        <div className="col-sm-6">
          <div className="email-signature">
            <div className="signature-icon">
              <p className="Icon" style={{marginLeft:"400px",marginTop:"-20px"}}>   <IconName.BiClipboard /></p>
                      <p className="programare" style={{ fontFamily: "URW Chancery L" , marginLeft: "480px",  marginTop:"-90px" }} > Programare</p>
     <p className="fa fa-globe" style={{ fontFamily: "URW Chancery L",marginLeft: "-500px" }}>
                {hasSearchCriteria && (
                  <ul className="signature-content">
                    <div>
                      {groupedDoctorNames.map((doctorName, index) => (
                        <li
                          className={`l${index === currentIndex ? " active" : ""}`}
                          onClick={() => this.setActiveTutorial(groupedTutorials[doctorName], index)}
                          key={index}
                        >
                          <IconName4.TbPoint />
                          {doctorName}
                        </li>
                      ))}
                    </div>
                  </ul>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-8">
        <div className="c">
          <div className="input-group mb-3">
            <div className="casute">
              <input
                style={{ color: "black", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)", fontFamily: "URW Chancery L", alignItems: "center", marginLeft: "-300px", marginBottom: "20px", width: "150px" }}
                type="text"
                className="form-control"
                placeholder="Specialitatea"
                value={searchNumeConsult}
                onChange={this.onChangeSearchByNumeConsult}
              />
            </div>
            <div className="casutaj">
              <input
                type="text"
                style={{ color: "black", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)", fontFamily: "URW Chancery L", marginLeft: "-150px", marginBottom: "20px", width: "150px" }}
                className="form-control"
                placeholder="Locatie"
                value={searchLocatia}
                onChange={this.onChangeSearchByLocatie}
              />
            </div>
            <div className="casutad">
              <input
                type="date"
                style={{ color: "black", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)" }}
                className="form-control"
                placeholder="data plecare"
                value={searchDataDisponibila}
                onChange={this.onChangeSearchByDataDisponibila}
              />
            </div>

            <div className="input-group-append">
              <button
                id="search-button"
                type="button"
                className="btn btn-primary2"
                style={{ color: "black", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)" }}
                size="sm"
                onClick={(e) => {
                  this.searchNumeConsult(e);
                  this.searchDataDisponibila(e);
                  this.searchLocatia(e);
                  this.searchProgramareMedic(e);
                }}
              >
                <IconName3.AiOutlineSearch />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xs-6">
        <ul className="list-group"></ul>
      </div>

      {Array.isArray(currentTutorial) && (
        <div className="d-flex flex-wrap">
          {currentTutorial.map((tutorial, idx) => (
            <div className="col-lg-3 card" style={{ marginRight: "-10px", marginLeft: "90px", marginBottom: "20px" }} key={idx}>
              <img className="card-img-top" src={Maa} style={{ maxWidth: "100%", height: "auto" }} />
              <div className="card-body">
                <div>
                  <label>
                    <strong style={{ color: "black", fontFamily: "URW Chancery L" }}>Locatia: </strong>
                    {tutorial.locatie}
                  </label>
                </div>
                <div>
                  <label>
                    <strong style={{ color: "black", fontFamily: "URW Chancery L" }}>Ziua programarii: </strong>
                    {tutorial.dataDisponibila}
                  </label>
                </div>
                {tutorial.costServiciu && (
                  <div>
                    <label>
                      <strong style={{ color: "black", fontFamily: "URW Chancery L" }}>Cost serviciu: </strong>
                      {tutorial.costServiciu} RON
                    </label>
                  </div>
                )}
                <div>
                  <label>
                    <strong style={{ color: "black", fontFamily: "URW Chancery L" }}>Nume consult:</strong> {tutorial.numeConsult}
                  </label>
                </div>
                <div>
                  <label>
                    <strong style={{ color: "black", fontFamily: "URW Chancery L" }}>Ora disponibila: </strong>
                    {tutorial.oraDisponibila && tutorial.oraDisponibila.split(":")[0]}:
                    {tutorial.oraDisponibila && tutorial.oraDisponibila.split(":")[1]}
                  </label>
                </div>
                <form>
                  <div className="form-group">
                    <label>
                      <strong style={{ color: "black", fontFamily: "URW Chancery L" }}>Status:</strong> {tutorial.stare }
                    </label>
                  </div>
                </form>
                <div>
                  
                  {showModeratorBoard && (
                    <Popup
                      trigger={<Button style={{ color: "light", marginTop: "10px", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)" }} className="btn btn-dark btn-circle">Programeaza-te</Button>}
                      position="left center"
                    >
                      <div className="card">
                        <div className="card-title"></div>
                        {!this.state.successful && (
                          <div>
                            <Form
                              onSubmit={this.handleSubmit}
                              ref={(c) => { this.form = c; }}
                            >
                              {!this.state.successful && (
                                <div>
                                  <div className="form-group">
                                    <label htmlFor="numeClient">
                                      <IconName7.IoMdPerson /> Nume Client
                                    </label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="numeClient"
                                      required
                                      value={this.state.numeClient}
                                      onChange={this.onChangeNumeClient}
                                      name="numeClient"
                                      validations={[required, name]}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="email">
                                      <IconName6.MdEmail /> Email
                                    </label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="email"
                                      required
                                      value={this.state.emailClient}
                                      onChange={this.onChangeEmailClient}
                                      name="email"
                                      validations={[required, email]}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="telefon">
                                      <IconName3.AiFillPhone /> Telefon
                                    </label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="telefon"
                                      required
                                      value={this.state.telefonClient}
                                      onChange={this.onChangeTelefonClient}
                                      name="telefon"
                                      validations={[required, tel]}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="nrCamere">
                                      <IconName3.AiOutlineFieldNumber /> Numar Camere
                                    </label>
                                    <Input
                                      type="number"
                                      className="form-control"
                                      id="numarCamere"
                                      required
                                      value={this.state.numarCamere}
                                      onChange={this.onChangeNumarCamere}
                                      name="numarCamere"
                                      validations={[required]}
                                    />
                                  </div>
                                  <button
                                    style={{ color: "white", margin: "5%", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)" }}
                                    onClick={(e) => { this.saveClient(e); }}
                                    className="btn btn-dark"
                                  >
                                    Salvare
                                  </button>
                                  {/* <p>{this.state.message}</p> */}
                                  {this.state.successful && ( // Afiseaza mesajul de succes daca programarea a fost realizata cu succes
                    // <div>
                    //   <p style={{ color: "green" }}>Programare a fost realizată cu succes!</p>
                    // </div>
                    
                      <div>
                        <p style={{ color: "green" }}>Programare a fost realizată cu succes!</p>
                      </div>)}
                                </div>
                              )}
                              
                              <CheckButton style={{ display: "none" }} ref={(c) => { this.checkBtn = c; }} />
                            </Form>
                          </div>
                        )}

{this.state.successful && ( // Afiseaza mesajul de succes daca programarea a fost realizata cu succes
                    // <div>
                    //   <p style={{ color: "green" }}>Programare a fost realizată cu succes!</p>
                    // </div>
                    
                      <div>
                        <p style={{ color: "green" }}>Programare a fost realizată cu succes!</p>
                      </div>
                    
                    
                  )}
                      </div>
                    </Popup>
                  )}
                   <div>
        <p>Numărul de salvări: {this.state.saveCount}</p>
        {/* Restul codului tău pentru componenta */}
      </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

                                     

  }
  export default GoogleApiWrapper({
    apiKey: 'AIzaSyCIkreFREuvmp_DMV3790H-JQK2hHSFPgs'
  })(TutorialsList);