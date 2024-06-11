import React from 'react';
import { Link } from "react-router-dom";
import TutorialDataService from "../services/tutorial.service";
import { Button } from 'react-bootstrap';

class AfisareInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clinici: [],
      medici: [],
      detaliiServicii: [],
      searchMedic: '',
      searchClinic: '',
      searchServiciu: '',
    };
  }

  componentDidMount() {
    this.retrieveClinici();
    this.retrieveMedici();
    this.retrieveDetaliiServicii();
  }

  // Metoda pentru a prelua toate clinicile
  retrieveClinici() {
    TutorialDataService.getAllClinici()
      .then(response => {
        this.setState({ clinici: response.data });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  // Metoda pentru a prelua toți medicii
  retrieveMedici() {
    TutorialDataService.getAllPersonal()
      .then(response => {
        this.setState({ medici: response.data });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  // Metoda pentru a prelua toate detaliile serviciilor
  retrieveDetaliiServicii() {
    TutorialDataService.getAllDetaliiServicii()
      .then(response => {
        this.setState({ detaliiServicii: response.data });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleSearchMedic = () => {
    const { searchMedic } = this.state;
    TutorialDataService.getAllPersonal()
      .then(response => {
        const filteredMedici = response.data.filter(medic => medic.numeMedic.toLowerCase().startsWith(searchMedic.toLowerCase()));
        this.setState({ medici: filteredMedici });
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleSearchClinic = () => {
    const { searchClinic } = this.state;
    TutorialDataService.getAllClinici()
      .then(response => {
        const filteredClinici = response.data.filter(clinic => clinic.numeClinica.toLowerCase().startsWith(searchClinic.toLowerCase()));
        this.setState({ clinici: filteredClinici });
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleSearchServiciu = () => {
    const { searchServiciu } = this.state;
    TutorialDataService.getAllDetaliiServicii()
      .then(response => {
        const filteredDetalii = response.data.filter(serviciu => serviciu.numeConsult.toLowerCase().startsWith(searchServiciu.toLowerCase()));
        this.setState({ detaliiServicii: filteredDetalii });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteClinic(clinicaId) {
    TutorialDataService.deleteClinica(clinicaId)
      .then(response => {
        console.log(response.data);
        this.retrieveClinici(); // Reîncărcați lista de clinici după deletere
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteMedic(medicId) {
    TutorialDataService.deleteMedic(medicId)
      .then(response => {
        console.log(response.data);
        this.retrieveMedici(); // Reîncărcați lista de medici după deletere
        this.retrieveDetaliiServicii();
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteServiciu(detaliiId) {
    TutorialDataService.deleteDetaliiServiciu(detaliiId)
      .then(response => {
        console.log(response.data);
        this.retrieveDetaliiServicii(); // Reîncărcați lista de detalii servicii după deletere
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { clinici, medici, detaliiServicii } = this.state;

    return (
      <div>
        <h3><b>Informații EMedic</b></h3>
        
        {/* Clinic Information */}
        <div className="card">
          <div className="container">
            <h4>Clinici</h4>
            <input
              type="text"
              placeholder="Caută Clinic"
              value={this.state.searchClinic}
              onChange={(e) => this.setState({ searchClinic: e.target.value })}
            />
            <Button variant="dark" style={{ marginLeft: "10px" }} onClick={this.handleSearchClinic}>
              Caută
            </Button>
            <table>
              <thead>
                <tr>
                  <th>Nume clinica</th>
                  <th>Locatie</th>
                  <th>Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {clinici.length === 0 ? (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center" }}>Nu există informații</td>
                  </tr>
                ) : (
                  clinici.map((clinic, index) => (
                    <tr key={index}>
                      <td>{clinic.numeClinica}</td>
                      <td>{clinic.locatie}</td>
                      <td>
                        <Link to={`/editClinica/${clinic.clinicaId}`} className="btn btn-dark">Editează</Link>
                        <button className="btn btn-danger" onClick={() => this.deleteClinic(clinic.clinicaId)}>Șterge</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <Button variant="dark" style={{ marginTop: "10px" }} onClick={() => this.props.history.push('/clinica')}>
              Adaugă clinică
            </Button>
          </div>
        </div>

        {/* Medic Information */}
        <div className="card">
          <div className="container">
            <h4>Medici</h4>
            <input
              type="text"
              placeholder="Caută Medic"
              value={this.state.searchMedic}
              onChange={(e) => this.setState({ searchMedic: e.target.value })}
            />
            <Button variant="dark" style={{ marginLeft: "10px" }} onClick={this.handleSearchMedic}>
              Caută
            </Button>
            <table>
              <thead>
                <tr>
                  <th>Nume medic</th>
                  <th>Clinica</th>
                  <th>Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {medici.length === 0 ? (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center" }}>Nu există informații</td>
                  </tr>
                ) : (
                  medici.map((medic, index) => (
                    <tr key={index}>
                      <td>{medic.numeMedic}</td>
                      <td>{medic.clinica ? medic.clinica.numeClinica : 'No Clinic'}</td>
                      <td>
                        <Link to={`/editMedic/${medic.medicId}`} className="btn btn-dark">Editează</Link>
                        <button className="btn btn-danger" onClick={() => this.deleteMedic(medic.medicId)}>Șterge</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <Button variant="dark" style={{ marginTop: "10px" }} onClick={() => this.props.history.push('/medici')}>
              Adaugă medic
            </Button>
          </div>
        </div>

        {/* Servicii Information */}
        <div className="card">
          <div className="container">
            <h4>Servicii</h4>
            <input
              type="text"
              placeholder="Caută Serviciu"
              value={this.state.searchServiciu}
              onChange={(e) => this.setState({ searchServiciu: e.target.value })}
            />
            <Button variant="dark" style={{ marginLeft: "10px" }} onClick={this.handleSearchServiciu}>
              Caută
            </Button>
            <table>
              <thead>
                <tr>
                  <th>Nume consult</th>
                  <th>Medic</th>
                  <th>Locatie</th>
                  <th>Cost serviciu</th>
                  <th>Durata</th>
                  <th>Data disponibila</th>
                  <th>Ora disponibila</th>
                  <th>Stare</th>
                  <th>Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {detaliiServicii.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center" }}>Nu există informații</td>
                  </tr>
                ) : (
                  detaliiServicii.map((detaliu, index) => (
                    <tr key={index}>
                      <td>{detaliu.numeConsult}</td>
                      <td>{detaliu.medic ? detaliu.medic.numeMedic : 'No Medic'}</td>
                      <td>{detaliu.medic.clinica.numeClinica}</td>
                      <td>{detaliu.costServiciu + " RON"}</td>
                      <td>{detaliu.durata}</td>
                      <td>{new Date(detaliu.dataDisponibila).toLocaleDateString()}</td>
                      <td>{detaliu.oraDisponibila}</td>
                      <td>{detaliu.stare}</td>
                      <td>
                        <Link to={`/detaliiServicii/${detaliu.detaliiId}`} className="btn btn-dark">Editează</Link>
                        <button className="btn btn-danger" onClick={() => this.deleteServiciu(detaliu.detaliiId)}>Șterge</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <Button variant="dark" style={{ marginTop: "10px" }} onClick={() => this.props.history.push('/detaliiServicii')}>
              Adaugă serviciu
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default AfisareInfo;
