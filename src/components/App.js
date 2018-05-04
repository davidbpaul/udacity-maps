import React, { Component } from 'react';
import '../css/App.css';
import * as data from "../services/data";
//components
import Sidebar from './SideMenu';
import Main from './Main';

//bootstrap
import {Grid, Row, Col} from 'react-bootstrap'
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      locations: [{ name: "New York County Supreme Court", location: {lat: 40.7143033, lng: -74.0036919} },
                  { name: "Queens County Supreme Court", location: {lat: 40.7046946, lng: -73.8091145} },
                  { name: "Kings County Supreme Court", location: {lat: 40.6940226, lng: -73.9890967} },
                  { name: "Richmond County Supreme Court", location: {lat: 40.6412336, lng: -74.0768597} },
                  { name: "Bronx Supreme Court", location: {lat: 40.8262388, lng: -73.9235238} }
      ]
    }
    this.getLocations=this.getLocations.bind(this);
    this.getPlaces=this.getPlaces.bind(this);
  }

  handleToggle = () => {
    if(this.state.open === true){
      this.hidden();
    }else{
      this.view();
    }
    this.setState({open: !this.state.open});
  }
  hidden = ()=>{
    let sideBar = document.getElementById('sideBar');
    let main = document.getElementById('main');
    // side bar
    sideBar.classList.remove("col-md-4");
    sideBar.classList.remove("col-xs-8");
    sideBar.setAttribute("hidden", true );
    // main
    main.classList.remove("col-md-8");
    main.classList.remove("col-xs-4");
    main.classList.add("col-xs-12");
  }
  view = () => {
    let sideBar = document.getElementById('sideBar');
    let main = document.getElementById('main');
    // side bar
    sideBar.removeAttribute("hidden" );
    sideBar.classList.add("col-md-4");
    sideBar.classList.add("col-xs-8");
    // main
    main.classList.remove("col-xs-12");
    main.classList.add("col-md-8");
    main.classList.add("col-xs-4");
  }
  //return array of locations
  getLocations(){
    return this.state.locations;
  }

  getPlaces(markers){
    this.setState({locations: markers});
  }

  render() {
    return (
      <div className="App">
        <Grid bsClass="container-fluid" className="container">
          <Row className="row">
            <Col id="sideBar" hidden bsClass="col" className="shorten">
              <Sidebar getPlaces={this.getPlaces} getLocations={this.getLocations} />
            </Col>
            <Col id="main" xs={12} bsClass="col" className="shorten">
              <Main getLocations={this.getLocations} handleToggle={this.handleToggle}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}


export default App;
