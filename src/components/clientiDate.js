import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import 'bootstrap/dist/css/bootstrap.min.css'
import Maa from "../components/pep.jpg"


import '../components/custom.css'
import * as IconName3  from "react-icons/ai";


import AuthService from "../services/auth.service";
import { Map, GoogleApiWrapper,Marker  } from 'google-maps-react';
import Geocode from "react-geocode";





export class CLientiDate extends Component {
constructor(props) {
super(props);
this.handleSubmit = this.handleSubmit.bind(this);

this.onChangeSearchNumeClient = this.onChangeSearchNumeClient.bind(this);
this.onChangeSearchEmailClient = this.onChangeSearchEmailClient.bind(this);

this.onChangeTelefon = this.onChangeTelefon.bind(this);
this.onChangeSearchRezervari=this.onChangeSearchRezervari.bind(this);
this.removeAllTutorials = this.removeAllTutorials.bind(this);

this.retrieveClienti = this.retrieveClienti.bind(this);
this.refreshList = this.refreshList.bind(this);
this.setActiveTutorial = this.setActiveTutorial.bind(this);
this.searchNumeClient = this.searchNumeClient.bind(this);
this.searchEmailClient= this.searchEmailClient.bind(this);
this.searchTelefon=this.searchTelefon.bind(this);
this.searchRezervari=this.searchRezervari.bind(this);
this.deleteClient = this.deleteClient.bind(this);




this.state = {
  tutorials: [],
  currentTutorial: {
    idClient:0,
    numeClient: "",
    emailClient:"",
    telefon:"",
    rezervari:0,
       
   
      errors:{}
    
  },
  currentIndex: -1,
  searchNumeClient: '',
 searchTelefon:'',
 searchEmailClient:'',
 searchRezervari:''
};
}

 
saveClient() {
  
    var data = {
      utilizatorId:this.state.utilizatorId,
      numeClient: this.state.numeClient,
      telefon:this.state.telefon,
      emailClient:this.state.emailClient,
      rezervari:this.state.rezervari
    
      
    };
TutorialDataService.createclient(data)
  .then(response => {
    this.setState({
      numeClient:response.data.numeClient,
      telefon:response.data.telefon,
      emailClient:response.data.emailClient,
      rezervari:response.data.rezervari,
      submitted: true,

    });

    this.updatePublished();

    console.log(response.data);

  })
  .catch(e => {
    console.log(e);
  });
}



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
this.retrieveClienti();
}

onChangeSearchNumeClient(e) {
const searchNumeClient = e.target.value;

this.setState({
    searchNumeClient: searchNumeClient
});
}
onChangeSearchRezervari(e) {
  const searchRezervari = e.target.value;
  
  this.setState({
    searchRezervari: searchRezervari
  });
  }

onChangeTelefon(e) {
    const searchTelefon = e.target.value;
    
    this.setState({
        searchTelefon: searchTelefon
    });
    }

onChangeSearchEmailClient(e) {
    const searchEmailClient = e.target.value;
    
    this.setState({
        searchEmailClient: searchEmailClient
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

refreshList() {
this.retrieveClienti();
this.setState({
  currentTutorial: null,
  currentIndex: -1,
  message: "Clientul "+this.state.numeClient+" a  rezervat cu succes "+ " "+this.state.numarCamere+" camere"

});

}

setActiveTutorial(tutorial, index) {

this.setState({
  currentTutorial: tutorial,
  currentIndex: index
});
console.log("BAAA");
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

searchRezervari() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
    
    TutorialDataService.findByRezervari(this.state.rezervari)
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


    




searchTelefon() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
    
    TutorialDataService.findByTelefon(this.state.searchTelefon)
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
  
  
};

}




salvareSejur() {
var data = {
  destinatie: this.state.destinatie,
 
};

TutorialDataService.create(data)
  .then(response => {
    this.setState({
      calatorieId: response.data.calatorieId,
      destinatie: response.data.destinatie,
    
      

      submitted: true
      
    });

    console.log(response.data);

  })
  .catch(e => {
    console.log(e);
  });
}

removeAllTutorials() {
  TutorialDataService.deleteClienti()
    .then(response => {
      console.log(response.data);
      this.refreshList();
    })
    .catch(e => {
      console.log(e);
    });
}
deleteClient() {    
  TutorialDataService.deleteCli(this.state.currentTutorial.idClient)
    .then(response => {
      console.log(response.data);
      //this.props.history.push('/clientiDate')
      window.location.reload();
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
const { tutorials, currentTutorial, currentIndex ,searchNumeClient} = this.state;



return (

    <div className="list row">

  
      <div class="cointainer">
        
          <div class="col-sm-6">
            <div class="email-signature">
               <div class="signature-icon">
              
                  < h2  style={{ fontFamily:"URW Chancery L "}}> Pagina Clienti
                  </h2>
                  

                  <p class="fa fa-globe" style={{ fontFamily:"URW Chancery L "}}>
                  <ul class="signature-content">
                   <li>
        
        
                   {tutorials &&
                  tutorials.map((tutorial, index) => (
                   <li
                   className={
                     "l" +
                  
                     (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveTutorial(tutorial, index)}
                    key={index}
                    > 
                   {tutorial.numeClient}
                
                     </li>
                     ))}
                    </li>
                    </ul>
                   </p>
                   
          
         
            
            <button
            className="btn  btn-dark"
            style={{ marginLeft:"20px",size:"60px",color: "white", border: "50px",fontFamily:"URW Chancery L ", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)"}}

            onClick={this.removeAllTutorials}
          >
            Remove All
          </button>
            
            </div>
            
            </div>
          </div>
        
      </div>
    

      
      <div className="col-md-8">
        
        <div class="c">
         <div className="input-group clienti mb-3" style={{marginLeft:"200px"}}>
          <div class="casute  ">
          <input 
            style={{ color: "black ", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)", fontFamily:"URW Chancery L "}}

            type="text"
            className="form-control"
            placeholder=" Nume Client"
            value={searchNumeClient}
            onChange={this.onChangeSearchNumeClient}
          />
          </div>
         

          
         
         
          
          <div className="input-group-append">
            <button id="search-button" type="button" class="btn btn-primary"
            
            style={{ color: "black ", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)",marginLeft:"-10px"}}
            size="sm"
              className="btn btn-light "
              
              
              onClick={(e) => {
                this.searchNumeClient(e);
                

            }} 
            >
                <IconName3.AiOutlineSearch/> 
            </button>
            </div>
            
          </div>
  
        </div>
      </div>
      
      <div className="col-xs-6" >
        
        <ul className="list-group"  >
        
     
        </ul>

      
              </div>

             
              
       <div className="col-lg card "  style={{ Size:"2px"}}>
       <img class="card-img-top" src={Maa}  style={{ Size:"2px"}}/>

        {currentTutorial ? (
            
          <div className="card-body">
            
            
            <div>
              <div>
              <label>
                <  strong  style={{color:"black  ", fontFamily:"URW Chancery L "}}>Nume Client: </strong>              {currentTutorial.numeClient}

              </label>{" "}

             
            </div>
              
            </div>
            
            
            <div>
              <label>
                <strong >Email: </strong>                {currentTutorial.emailClient}

                                            
              </label>{""}
              </div>
              <div>
              
              <label>
                <strong    style={{color:"black  ",  fontFamily:"URW Chancery L "}}>Telefon:</strong>                 {currentTutorial.telefonClient}

              </label>{" "}

            </div>
            <div>
              
              <label>
                <strong    style={{color:"black  ",  fontFamily:"URW Chancery L "}}>Numar Rezervari:</strong>                 {currentTutorial.rezervari}

              </label>{" "}

            </div>
            
            <button
              className="btn btn-dark"
              style={{ marginTop:"20px",marginLeft:"120px",maxWidth:"75px",color: "white", border: "50px",fontFamily:"URW Chancery L ", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)"}}

              onClick={this.deleteClient}
            >
              Delete
            </button>
            
            
            
            
            
       </div>
          
        ) : (
          
          <div>
            <br />
            <p>    Apasa pe client pentru mai multe detalii!</p>
          </div>
          
        )}
        
        
      </div>
      
      </div>)
}

}
export default(CLientiDate);