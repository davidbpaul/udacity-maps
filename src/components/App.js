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
      locations: [],
      filtered:[],
      menuItem: null,
      loading: true
    }
  }
  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 1500); // simulates an async action, and hides the spinner
  }
  componentWillMount(){
    data.getFSLocations({lat: 40.7143033, lng: -74.0036919}).then(locations =>{
      this.setState({locations: locations})
    })
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


  //get search and create filter state
  getSearch = (query, e=false) => {
    console.log("API ", this.state.locations)
    const filtered = this.state.locations.filter(item => item.name.match(`^${query}.*$`));
    if(query == ""){
      this.setState({filtered: this.state.locations});
    }else{
      this.setState({filtered: filtered});
    }
    if(e){
      e.preventDefault();
    }
  }
  setMenu = (val) =>{
    this.setState({menuItem: val});
  }
  render() {
    if(this.state.loading) {
     return null;
    }

    return (
      <div className="App">
        <Grid bsClass="container-fluid" className="container">
          <Row className="row">
            <Col id="sideBar" hidden bsClass="col" className="shorten">
              <Sidebar setMenu={this.setMenu} menuItem={this.state.menuItem} filtered={this.state.filtered} getSearch={this.getSearch}/>
            </Col>
            <Col id="main" xs={12} bsClass="col" className="shorten">
              <Main setMenu={this.setMenu} menuItem={this.state.menuItem} filtered={this.state.filtered} getSearch={this.getSearch} handleToggle={this.handleToggle}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}


export default App;
