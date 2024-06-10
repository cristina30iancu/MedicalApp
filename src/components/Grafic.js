import React,{ Component } from 'react';
import {Pie, Doughnut} from 'react-chartjs-2';
import 'chart.js/auto';
import TutorialDataService from "../services/tutorial.service";


export default class Grafic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bilet: {
        labels: [],
        datasets: [
          {
            label: 'Rainfall',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: []
          }
        ]
      },
      rez: {
        labels: [],
        datasets: [
          {
            label: 'Rainfall',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: []
          }
        ]
      }
      
    }
  }

  componentDidMount() {
    TutorialDataService.getGrafic()
      .then(response => {
        this.setState({
          bilet: {
            labels: Object.keys(response.data),
            datasets: [
              {
                label: 'Rainfall',
                borderWidth: 2,
              
                backgroundColor: [
                  '#fadadd',
                  '#ad4379',
                  '#894852',
                  '#a75b78',
                  '#6800B4'
                ],
                hoverBackgroundColor: [
                '#6d956f',
                '#4B5000',
                '#175000',
                '#003350',
                '#35014F'
                ],
                data: Object.values(response.data)
              }
            ]
          }
        });
        Object.entries(response.data).map(([key, value]) => {
          console.log(key + "  asdf " + value);
        })
      })
      .catch(e => {
        console.log(e);
      });

      TutorialDataService.getGraficClient()
      .then(response => {
        this.setState({
          rez: {
            labels: Object.keys(response.data),
            datasets: [
              {
                label: 'Rainfall',
                borderWidth: 2,
              
                backgroundColor: [
                  '#fadadd',
                  '#800080',
                  '#894852',
                  '#a75b78',
                  '#BB8FCE'
                ],
                hoverBackgroundColor: [
                '#6d956f',
                '#4B5000',
                '#175000',
                '#003350',
                '#35014F'
                ],
                data: Object.values(response.data)
              }
            ]
          }
        });
        Object.entries(response.data).map(([key, value]) => {
          console.log(key + "  baaa " + value);
        })
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {

    const { bilet } = this.state;
    const{rez}=this.state;
    return (
      <div  style={{ color: "black ",  position:'absolute',top:"60px", right:"100px", width:"450px", height:"500px",left:"550px"}}>
        <div    >
          <div className='card-title '
                style={{  marginLeft :"130px"}}
                > Numar rezervari pe destinatii </div>
         < Pie 
          data={bilet}
          options={{
            title:{
              display:true,
             // text:'Average Rainfall per month',
              fontSize:10
              
            },
            
            legend:{
              display:true,
              position:'right'
            }
          }}
          strokeWidth={0.2} 
          outerRadius={30}
        />
       <div className='card-title '
                style={{  marginLeft :"150px", marginTop:"20px"}}
                > Numar rezervari clienti </div>
        <Doughnut
          data={rez}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:10
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
          // width={20}
          // height={20}
          strokeWidth={0.2} 
          outerRadius={30}
        />
      </div>
      </div>
    );
  }
}
