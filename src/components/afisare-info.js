// import React from 'react';
// import { Link } from "react-router-dom";
// import TutorialDataService from "../services/tutorial.service";
// import { Button } from 'react-bootstrap'

// class AfisareInfo extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       tutorials: [],
//       currentTutorial: null, // setăm tutorialul curent ca null inițial
//       clinici: [],
//       searchMedic: '',
//       currentClinic: null,
//     };
//   }

//   componentDidMount() {
//     this.retrieveTutorials();
//     this.retrieveClinici();  

// }

//   // Metoda pentru a prelua toate tutorialele
//   retrieveTutorials() {
//     TutorialDataService.getAllPersonal()
//       .then(response => {
//         this.setState({
//           tutorials: response.data,
//           currentTutorial: response.data[0] // Setăm primul tutorial din listă ca fiind tutorialul curent
//         });
//         console.log(response.data);
//       })
//       .catch(e => {
//         console.log(e);
//       });
//     }
//       retrieveClinici() {
//         TutorialDataService.getAllClinici()
//           .then(response => {
//             this.setState({
//               clinici: response.data,
//               currentClinic: response.data[0]
//             });
//             console.log(response.data);
//           })
//           .catch(e => {
//             console.log(e);
//           });
//       }
//   render() {
//     const { tutorials, currentTutorial, clinici, currentClinic } = this.state;

//     return (
//       <div>
//         <h3><b>Clinic Information</b></h3>
//         {/* <div className="card">
//           <div className="container">
//             <div className="info-table">
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Full Name</th>
//                     <th>Job Position</th>
//                     <th>Gender</th>
//                     <th>Date Of Birth</th>
//                     <th>Age</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>{currentTutorial && currentTutorial.fullName}</td>
//                     <td>{currentTutorial && currentTutorial.positionJob}</td>
//                     <td>{currentTutorial && currentTutorial.gender}</td>
//                     <td>{currentTutorial && currentTutorial.dateOfBirth}</td>
//                     <td>{currentTutorial && currentTutorial.age}</td>
//                     <td>
//                       <Link to="/addpersonal" className="btn btn-dark">Add</Link>
//                       <Link to="/editpersonal" className="btn btn-dark">Edit</Link>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div> */}

//         {/* Afișăm lista tuturor numelor */}
//         {/* <div className="card">
//           <div className="container">
//             <div className="info-table">
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Full Name</th>
//                     <th>Job Position</th>
//                     <th>Gender</th>
//                     <th>Date Of Birth</th>
//                     <th>Age</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>{currentTutorial && currentTutorial.fullName}</td>
//                     <td>{currentTutorial && currentTutorial.positionJob}</td>
//                     <td>{currentTutorial && currentTutorial.gender}</td>
//                     <td>{currentTutorial && currentTutorial.dateOfBirth}</td>
//                     <td>{currentTutorial && currentTutorial.age}</td>
//                     <td>
//                       <Link to="/addpersonal" className="btn btn-dark">Add</Link>
//                       <Link to="/editpersonal" className="btn btn-dark">Edit</Link>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div> */}

//         {/* Afișăm lista tuturor detaliilor */}
//         <div className="card">
//           <div className="container">
//             <h4>Medic Information</h4>
//             <input type="text" placeholder="Search Medic" onChange={(e) => this.setState({ searchMedic: e.target.value })} />

//             <table>
//               <thead>
//                 <tr>
//                   <th>Nume medic</th>
//                   <th>Nume consult</th>
//                   <th>Cost serviciu</th>
//                   <th>Durata</th>
//                   <th>Data disponibila</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {/* {tutorials.map((tutorial, index) => ( */}
//                 {tutorials.filter((tutorial) => tutorial.numeMedic.toLowerCase().includes(this.state.searchMedic.toLowerCase())).map((tutorial, index) => (

//                   <tr key={index}>
//                     <td>{tutorial.numeMedic}</td>
//                     <td>{tutorial.numeConsult}</td>
//                     <td>{tutorial.costServiciu+" RON"}</td>
//                     <td>{tutorial.durata}</td>
//                     <td>{new Date(tutorial.dataDisponibila).toLocaleDateString()}</td>
//                     <td>
//                       <Link to="/editpersonal" className="btn btn-dark">Edit</Link>
                 
//                       <Link to="/deletepersonal" className="btn btn-dark" style={{marginLeft:"10px"}}>  Delete</Link>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
      

//         <div className="card">
//           <div className="container">
//             <h4>Clinic Information</h4>
//             <p>
//               <table>
//                 <tr>
//                   <th className="fixed-width">Nume clinica</th>
//                   <th className="fixed-width">Locatie</th>
                  
//                 </tr>
//                 {/* <tr>
//                   <td className="fixed-width"></td>
//                   <td className="fixed-width"></td>
//                   <td className="fixed-width"></td>
//                   <td className="fixed-width"></td>

//                 </tr> */}

// <tbody>
//                 {clinici.map((tutorial, index) => (
//                   <tr key={index}>
//                     <td>{tutorial.numeClinica}</td>
//                     <td>{tutorial.locatie}</td>
                   
//                     <td>
//                       <Link to="/editpersonal" className="btn btn-dark">Edit</Link>
                 
//                       <Link to="/deletepersonal" className="btn btn-dark" style={{marginLeft:"10px"}}>  Delete</Link>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//               </table>
//             </p>
//           </div>
//         </div>

//         <div className="card">
//           <div className="container">
//             <h4>My Emergency Contacts</h4>
//             <p>
//               <table>
//                 <tr>
//                   <th className="fixed-width">Name</th>
//                   <th className="fixed-width">Contact</th>
//                   <th className="fixed-width">Relationship</th>
//                   <th className="fixed-width">Action</th>
//                 </tr>
//                 <tr>
//                   <td className="fixed-width"></td>
//                   <td className="fixed-width"></td>
//                   <td className="fixed-width"></td>
//                   <td className="fixed-width"></td>
//                 </tr>
//               </table>
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default AfisareInfo;


import React from 'react';
import { Link } from "react-router-dom";
import TutorialDataService from "../services/tutorial.service";
import { Button } from 'react-bootstrap'

class AfisareInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorials: [],
      currentTutorial: null, // setăm tutorialul curent ca null inițial
      clinici: [],
      searchMedic: '',
      searchClinic: '',
      currentClinic: null,
    };
  }

  componentDidMount() {
    this.retrieveTutorials();
    this.retrieveClinici();  
  }

  // Metoda pentru a prelua toate tutorialele
  retrieveTutorials() {
    TutorialDataService.getAllPersonal()
      .then(response => {
        this.setState({
          tutorials: response.data,
          currentTutorial: response.data[0] // Setăm primul tutorial din listă ca fiind tutorialul curent
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  retrieveClinici() {
    TutorialDataService.getAllClinici()
      .then(response => {
        this.setState({
          clinici: response.data,
          currentClinic: response.data[0]
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleSearchMedic = () => {
    // Caută medici cu numele care începe cu litera specificată în câmpul de căutare
    const { searchMedic } = this.state;
    TutorialDataService.getAllPersonal()
      .then(response => {
        const filteredTutorials = response.data.filter(tutorial => tutorial.numeMedic.toLowerCase().startsWith(searchMedic.toLowerCase()));
        this.setState({
          tutorials: filteredTutorials
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleSearchClinic = () => {
    // Caută clinici cu numele care începe cu litera specificată în câmpul de căutare
    const { searchClinic } = this.state;
    TutorialDataService.getAllClinici()
      .then(response => {
        const filteredClinici = response.data.filter(clinic => clinic.numeClinica.toLowerCase().startsWith(searchClinic.toLowerCase()));
        this.setState({
          clinici: filteredClinici
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  deleteTutorial(medicId) {
    TutorialDataService.deleteMedic(medicId)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/afisareInfo');
        // Reîncărcați lista de medici după ștergere
        this.retrieveTutorials();
      })
      .catch(e => {
        console.log(e);
      });
  }

  
  // deleteTutorialClinica(clinicaId) {
  //   TutorialDataService.deleteClinica(clinicaId)
  //     .then(response => {
  //       console.log(response.data);
  //       this.props.history.push('/afisareInfo');
  //       // Reîncărcați lista de medici după ștergere
  //       this.retrieveTutorials();
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }

  deleteTutorialClinica = (clinicaId) => {
    TutorialDataService.deleteClinica(clinicaId)
      .then(response => {
        console.log(response.data);
        // Reîncărcați lista de clinici după ștergere
        this.retrieveClinici();
      })
      .catch(e => {
        console.log(e);
      });
  }
  

  render() {
    const { tutorials, currentTutorial, clinici, currentClinic } = this.state;

    return (
//       <div>
//         <h3><b>Clinic Information</b></h3>

//         <div className="card">
//           <div className="container">
//             <h4>Medic Information</h4>
//             <input type="text" placeholder="Search Medic" value={this.state.searchMedic} onChange={(e) => this.setState({ searchMedic: e.target.value })} />
//             <Button variant="dark" style={{marginLeft:"10px"}}onClick={this.handleSearchMedic}>Search</Button>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Nume medic</th>
//                   <th>Nume consult</th>
//                   <th>Locatia</th>
//                   <th>Cost serviciu</th>
//                   <th>Durata</th>
//                   <th>Data disponibila</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tutorials.map((tutorial, index) => (
//                   <tr key={index}>
//                     <td>{tutorial.numeMedic}</td>
//                     <td>{tutorial.numeConsult}</td>
//                     <td>{tutorial.locatie}</td>
//                     <td>{tutorial.costServiciu+" RON"}</td>
//                     <td>{tutorial.durata}</td>
//                     <td>{new Date(tutorial.dataDisponibila).toLocaleDateString()}</td>
//                     <td>
//                       {/* <Link to="/editpersonal" className="btn btn-dark">Edit</Link> */}
//                       <Link to={`/editMedic/${tutorial.medicId}`} className="btn btn-dark">Edit</Link>
//                       {/* <Link to="/deletepersonal" className="btn btn-dark" style={{marginLeft:"10px"}}>  Delete</Link> */}
// <button className="btn btn-danger" onClick={() => this.deleteTutorial(tutorial.medicId)}>Delete</button>

//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <div className="card">
//           <div className="container">
//             <h4>Clinic Information</h4>
//             <input type="text" placeholder="Search Clinic" value={this.state.searchClinic} onChange={(e) => this.setState({ searchClinic: e.target.value })} />
//             <Button variant="dark" style={{marginLeft:"10px"}}onClick={this.handleSearchClinic}>Search</Button>
//             <table>
//               <thead>
//                 <tr>
//                   <th>Nume clinica</th>
//                   <th>Locatie</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {clinici.map((clinic, index) => (
//                   <tr key={index}>
//                     <td>{clinic.numeClinica}</td>
//                     <td>{clinic.locatie}</td>
//                     <td>
//                     <Link to={`/editClinica/${clinic.clinicaId}`} className="btn btn-dark">Edit</Link>
//                     <button className="btn btn-danger" onClick={() => this.deleteTutorialClinica(clinic.clinicaId)}>Delete</button>

                     
//                        </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* <div className="card">
//           <div className="container">
//             <h4>My Emergency Contacts</h4>
//             <p>
//               <table>
//                 <tr>
//                   <th className="fixed-width">Name</th>
//                   <th className="fixed-width">Contact</th>
//                   <th className="fixed-width">Relationship</th>
//                   <th className="fixed-width">Action</th>
//                 </tr>
//                 <tr>
//                   <td className="fixed-width"></td>
//                   <td className="fixed-width"></td>
//                   <td className="fixed-width"></td>
//                   <td className="fixed-width"></td>
//                 </tr>
//               </table>
//             </p>
//           </div> */}
//         {/* </div> */}
//       </div>

<div>
        <h3><b>Information EMedic</b></h3>

        <div className="card">
          <div className="container">
            <h4>Medic Information</h4>
            <input
              type="text"
              placeholder="Search Medic"
              value={this.state.searchMedic}
              onChange={(e) => this.setState({ searchMedic: e.target.value })}
            />
            <Button variant="dark" style={{ marginLeft: "10px" }} onClick={this.handleSearchMedic}>
              Search
            </Button>
            <table>
              <thead>
                <tr>
                  <th>Nume medic</th>
                  <th>Nume consult</th>
                  <th>Locatia</th>
                  <th>Cost serviciu</th>
                  <th>Durata</th>
                  <th>Data disponibila</th>
                  <th>Stare</th>

                </tr>
              </thead>
              <tbody>
                {tutorials.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>No information available</td>
                  </tr>
                ) : (
                  tutorials.map((tutorial, index) => (
                    <tr key={index}>
                      <td>{tutorial.numeMedic}</td>
                      <td>{tutorial.numeConsult}</td>
                      <td>{tutorial.locatie}</td>
                      <td>{tutorial.costServiciu + " RON"}</td>
                      <td>{tutorial.durata}</td>
                      <td>{new Date(tutorial.dataDisponibila).toLocaleDateString()}</td>
                      <td>{tutorial.stare}</td>

                      <td>
                        <Link to={`/editMedic/${tutorial.medicId}`} className="btn btn-dark">Edit</Link>
                        <button className="btn btn-danger" onClick={() => this.deleteTutorial(tutorial.medicId)}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <Button variant="dark" style={{ marginTop: "10px" }} onClick={() => this.props.history.push('/medici')}>
              Add Medic
            </Button>
          </div>
        </div>

        <div className="card">
          <div className="container">
            <h4>Clinic Information</h4>
            <input
              type="text"
              placeholder="Search Clinic"
              value={this.state.searchClinic}
              onChange={(e) => this.setState({ searchClinic: e.target.value })}
            />
            <Button variant="dark" style={{ marginLeft: "10px" }} onClick={this.handleSearchClinic}>
              Search
            </Button>
            <table>
              <thead>
                <tr>
                  <th>Nume clinica</th>
                  <th>Locatie</th>
                </tr>
              </thead>
              <tbody>
                {clinici.length === 0 ? (
                  <tr>
                    <td colSpan="2" style={{ textAlign: "center" }}>No information available</td>
                  </tr>
                ) : (
                  clinici.map((clinic, index) => (
                    <tr key={index}>
                      <td>{clinic.numeClinica}</td>
                      <td>{clinic.locatie}</td>
                      <td>
                        <Link to={`/editClinica/${clinic.clinicaId}`} className="btn btn-dark">Edit</Link>
                        <button className="btn btn-danger" onClick={() => this.deleteTutorialClinica(clinic.clinicaId)}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <Button variant="dark" style={{ marginTop: "10px" }} onClick={() => this.props.history.push('/clinica')}>
              Add Clinica
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default AfisareInfo;
