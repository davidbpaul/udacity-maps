import React, { Component } from 'react';
import '../css/SideMenu.css';
//components
import SearchBar from './SearchBar'

//bootstrap
import {PageHeader} from 'react-bootstrap';

class Sidebar extends Component {

  render() {
    return (
      <div className="sideBar">
        <div className="space">

        </div>
        <PageHeader className="sideHeader">
          <small className="sideHeader">David Locations</small>
        </PageHeader>
        <SearchBar   getPlaces={this.props.getPlaces} getLocations={this.props.getLocations} />

      </div>
    );
  }
}

export default Sidebar;
