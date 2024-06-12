import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddSejur from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component";
import AuthService from "./services/auth.service";
import Login from "./components/Log";
import Register from "./components/register.component";

import BoardUser from "./components/board-use.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import SejurDispn from "./components/SejurDisp";
import PrivateRoutes from "./auth/PrivateRoutes";
import Grafic from "./components/Grafic";
import sejurultau from "./components/sejurultau";
import Client from "./components/client.component";
import CLientiDate from "./components/clientiDate"
import AddClinica from "./components/add-clinica";
import AboutUs from "./components/about-us";
import AddMedici from "./components/add-medici";
import AfisareInfo from "./components/afisare-info";
import EditMedic from "./components/edit-medic";
import EditClinica from "./components/edit-clinica";
import AddServicii from "./components/add-servicii";
import Programari from "./components/programari-user";
class App extends Component {

  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("USER"),
        showAdminBoard: user.roles.includes("ADMIN")
      });
    }
  }
  logOut() {
    AuthService.logout();
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    return (



      <div>

        <div id="mySidenav" class="sidenav">
          <a href="#" className="closebtn" onClick={this.closeNav}>&times;</a>
          <a href="#"><Link to={"/paginadestart"}>Acasă </Link></a>
          <a href="#"> <Link to={"/about-us"}>Despre noi</Link></a>
          <a href="#"><Link to={"/calatorie"}> Programare </Link></a>
          {showModeratorBoard && <a href="#"><Link to={"/programari"}> Programările mele </Link></a>}
          {showAdminBoard && (<a href="#"> <Link to={"/afisareInfo"}>Informații clinică</Link></a>)}
          {showAdminBoard && (<a href="#"> <Link to={"/clientiDate"}>Clienți</Link></a>)}
          {showAdminBoard && (<a href="#"> <Link to={"/grafic"}> Grafic </Link></a>)}

        </div>
        <nav className="navbar navbar-expand " style={{ backgroundColor: "black", background: "#111 ", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)" }}
        >


          <div id="main">
            <span style={{ fontSize: '25px', cursor: 'pointer', color: 'white' }} onClick={this.openNav}>&#9776; </span>

          </div>
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.numeUtilizator}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>




            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <PrivateRoutes exact path={["/", "/calatorie"]} component={TutorialsList} />
            <PrivateRoutes exact path="/add" component={AddSejur} />
            <PrivateRoutes path="/calatorie/:id" component={Tutorial} />
            <PrivateRoutes path="/programari" component={Programari} />
            <PrivateRoutes path="/clinica" component={AddClinica} />
            <PrivateRoutes path="/medici" component={AddMedici} />
            <PrivateRoutes path="/detaliiServicii" component={AddServicii} />
            <Route path="/detaliiServicii/:id" component={AddServicii} />
            <PrivateRoutes path="/afisareInfo" component={AfisareInfo} />

            <Route path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/about-us" component={AboutUs} />
            <PrivateRoutes path="/user" component={BoardUser} />
            <PrivateRoutes path="/mod" component={BoardModerator} />
            <PrivateRoutes path="/admin" component={BoardAdmin} />
            <PrivateRoutes path="/doaradmin" component={SejurDispn} />
            <PrivateRoutes path="/grafic" component={Grafic} />
            <PrivateRoutes path="/paginadestart" component={sejurultau} />
            <PrivateRoutes path="/clientpagina" component={Client} />
            <PrivateRoutes path="/clientiDate" component={CLientiDate} />
            <Route path="/editMedic/:medicId" component={EditMedic} />
            <Route path="/editClinica/:clinicaId" component={EditClinica} />



          </Switch>
        </div>
      </div>
    );
  }
}

export default App;