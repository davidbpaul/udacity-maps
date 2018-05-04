import React, { Component } from 'react';
import '../css/Main.css';
// components
import Navigation from './Navigation';
import MapContainer from './MapContainer';

class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="main">
        {/* NavBar */}
        <Navigation handleToggle={this.props.handleToggle} />
        {/* Content */}
        <MapContainer  getLocations={this.props.getLocations} />
      </div>
    );
  }
}

export default Main;
