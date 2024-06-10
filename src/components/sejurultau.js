import React, { Component } from "react";
import '../components/custom.css'
import Logo from "../components/disertatie.jpg"
import AuthService from '../services/auth.service'
import *as IconName5 from "react-icons/md";




 export default class sejurultau extends Component {


    constructor(props) {
        super(props);
       
        this.state = {
          name:"kapil",
          age: 22,
          username:null
        };
       }

       componentDidMount() {
 
        
        const user = AuthService.getCurrentUser();
         if (user) {
           this.setState({ 
            currentUser: user,
            showModeratorBoard: user.roles.includes("USER"),
            showAdminBoard: user.roles.includes("ADMIN"),
            username: user.username });
          }
     }
      

       render() {
        const {tutorials, currentIndex ,username} = this.state;
    
        return (
         

            <div class="bine">
              <h5></h5>
              <br></br>
              <h5 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Bine ati venit, {username}! </h5>
              <h5></h5>
              <h5></h5>
              <h5 style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >Clinica virtuala EMedic</h5>
              <div class="card card-container ">
              <img src={Logo}/>
              <div class='text-on-image'>
        
              <div class="content">
              <p class="font-italic">Aici, sanatatea este pe primul loc!</p>
            
              </div>
              </div>
            </div>
            </div>
            
            
          
        );
      }
  }



