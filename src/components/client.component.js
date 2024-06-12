import React, { Component } from "react";
import '../components/custom.css'
import Logo from "../components/harta.jpg"
import TutorialDataService from "../services/tutorial.service";



export default class Client extends Component {


  constructor(props) {
    super(props);
    this.onChangeSearchNumeClient = this.onChangeSearchNumeClient.bind(this);

    this.onChangeSearchByDestinatie = this.onChangeSearchByDestinatie.bind(this);
    this.retrieveClienti = this.retrieveClienti.bind(this);

    this.searchNumeClient = this.searchNumeClient.bind(this);
    this.searchDestinatie = this.searchDestinatie.bind(this);

    this.state = {
      tutorials: [],
      currentTutorial: {

        numeClient: "",
        destinatie: ""



      },
      currentIndex: -1,

      searchNumeClient: '',


      refreshList() {
        this.retrieveTutorials();
        this.setState({
          currentTutorial: null,
          currentIndex: -1
        });
      }
    };


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
  onChangeSearchNumeClient(e) {
    const searchNumeClient = e.target.value;

    this.setState({
      searchNumeClient: searchNumeClient
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


  setActiveTutorial(tutorial, index) {

    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
    console.log("BAAA");
  }


  searchDestinatie() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });



    TutorialDataService.findByTitle(this.state.searchDestinatie)
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
  onChangeSearchByDestinatie(e) {
    const searchDestinatie = e.target.value;

    this.setState({
      searchDestinatie: searchDestinatie
    });
  }

  setActiveTutorial(tutorial, index) {

    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
    console.log("BAAA");
  }
  render() {



    const { tutorials, currentTutorial, currentIndex, searchDestinatie } = this.state;

    return (

      <div className="row">
        <h4 strong style={{ marginLeft: "470px", marginTop: "200px", fontFamily: "URW Chancery L " }} >
          Sejur rezervat cu succes!
        </h4>
        <h5 class="light" style={{ marginLeft: "370px", marginTop: "80px", fontFamily: "URW Chancery L " }}> Accesati pagina Sejur pentru a realiza o noua rezervare! </h5>
        <div class="cointainer">
          <div>


          </div>
          <div class="col-sm-6">
            <div class="email-signature">
              <div class="signature-icon1">

                <p class="fa fa-globe" style={{ color: "black  ", fontFamily: "URW Chancery L " }}>
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

              </div>

            </div>
          </div>
          <div>
            <div>



            </div>

          </div>


        </div>




      </div>





    );
  }
}


