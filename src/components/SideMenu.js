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
          <small className="sideHeader">NYC Schools</small>
        </PageHeader>
        <SearchBar  setMenu={this.props.setMenu} menuItem={this.props.menuItem} filtered={this.props.filtered} getSearch={this.props.getSearch} getLocations={this.props.getLocations} />

      </div>
    );
  }
}

export default Sidebar;
