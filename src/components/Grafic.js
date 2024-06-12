import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2'; // Importăm componenta Bar
import 'chart.js/auto'; // Importăm auto pentru configurarea Chart.js
import TutorialDataService from "../services/tutorial.service";

export default class Grafic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      programariPeMedic: {
        labels: [],
        datasets: [
          {
            label: 'Număr programări pe medic',
            backgroundColor: 'rgba(75,192,192,0.6)', // Culoare pentru barele din grafic
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: []
          }
        ]
      }
    };
  }

  componentDidMount() {
    // Fetch data for the number of appointments per doctor
    TutorialDataService.getGraficProgramariPeMedic()
      .then(response => {
        const medicNume = Object.keys(response.data);
        const programariCount = Object.values(response.data);

        this.setState({
          programariPeMedic: {
            labels: medicNume,
            datasets: [
              {
                label: 'Număr programări pe medic',
                backgroundColor: [
                  '#fadadd',
                  '#ad4379',
                  '#894852',
                  '#a75b78',
                  '#6800B4'
                ],
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: programariCount
              }
            ]
          }
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { programariPeMedic } = this.state;

    return (
      <div style={{ color: "black", position: 'absolute', top: "10vh", right: "5vw", width: "70vw", height: "90vh", left: "5vw" }}>
        <div>
          <div className='card-title' style={{ marginLeft: "130px" }}>
            Număr programări pe medic
          </div>
          <Bar
            data={programariPeMedic} // Datele pentru grafic
            options={{
              title: {
                display: true,
                text: 'Număr programări pe medic',
                fontSize: 26
              },
              legend: {
                display: true,
                position: 'top' // Poziționarea legendei
              },
              scales: {
                y: {
                  beginAtZero: true // Asigură că axa Y începe de la 0
                }
              }
            }}
          />
        </div>
      </div>
    );
  }
}
