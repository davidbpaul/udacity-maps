import React, { Component } from 'react';
import '../css/Main.css';
// components
import Map from './Map';
// import Marker from './Marker';
// google api
import {GoogleApiWrapper} from 'google-maps-react'

export class MapContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mapContainer">
        <Map aria-role="application" setMenu={this.props.setMenu} menuItem={this.props.menuItem} filtered={this.props.filtered} getSearch={this.props.getSearch} google={this.props.google}>
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyB7znwU735MdtbPIV3y6u4KvBPxfVXK86w'
 })(MapContainer)
