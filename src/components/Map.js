import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from '../assets/four.png'

import '../css/Map.css';
import {Marker} from 'google-maps-react'
class Map extends Component {
  static propTypes = {
    google: React.PropTypes.object,
    zoom: React.PropTypes.number,
    initialCenter: React.PropTypes.object,
    centerAroundCurrentLocation: React.PropTypes.bool,
    onMove: React.PropTypes.func
  }
  static defaultProps = {
    zoom: 13,
    // San Francisco, by default
    initialCenter: {
      lat: 40.7143033,
      lng: -74.0036919
    },
    centerAroundCurrentLocation: false,
    onMove: function() {} // default prop
  }
  constructor(props) {
    super(props);

    const {lat, lng} = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      },
      markersArray: []
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.addMarkers();
    for(this.state.marker of this.state.markersArray){
      if(this.state.marker.title === this.props.menuItem){
        this.openInfoWindow(this.state.marker);
      }
    }
  }
  componentDidMount() {
    if (this.props.centerAroundCurrentLocation) {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const coords = pos.coords;
                this.setState({
                    currentLocation: {
                        lat: coords.latitude,
                        lng: coords.longitude
                    },
                    locations: this.props.filtered
                })

            })
        }
    }
    this.loadMap();
  }
  clearOverlays() {
    for (var i = 0; i < this.state.markersArray.length; i++ ) {
      this.state.markersArray[i].setMap(null);
    }
    this.state.markersArray.length = 0;
  }

  loadMap() {
    const evtNames = ['ready', 'click', 'dragend'];
    if (this.props && this.props.google) {
       // google is available
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let {initialCenter, zoom} = this.props;
      const {lat, lng} = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
       center: center,
       zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig);
      // load on drag
      evtNames.forEach(e => {
      this.map.addListener(e, this.handleEvent(e));
      });
      maps.event.trigger(this.map, 'ready');
    }
    this.addMarkers();

  }
  addMarkers(){
    const self = this;
    this.clearOverlays();
    this.props.filtered.forEach( location => { 
      const marker = new this.props.google.maps.Marker({
        position: {lat: location.location.lat, lng: location.location.lng},
        map: this.map,
        title: location.name,
        verified: location.verified,
        location: location.location.address
      });
      this.state.markersArray.push(marker);
      marker.addListener("click", function() {
        self.props.setMenu(marker.title);
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(function() {
          marker.setAnimation(null);
        }, 2100);
      });
    })
  }
  openInfoWindow(marker){

    var InfoWindow = new window.google.maps.InfoWindow({});
    const self = this;
    window.google.maps.event.addListener(InfoWindow, "closeclick", function() {
      InfoWindow.close(this.map, marker);
      self.props.setMenu(null);
    });
    InfoWindow.setContent(
      "<h6>" + marker.title + "<br /></h6>" +
      "<p>verified: " + marker.verified + "<br />" + "address:" + marker.location + "</p>"
      + "<hr />" + "<img style='width:100px; height:50px;' src='" + logo + "' alt='image in infowindow'>"

    );
    InfoWindow.open(this.map, marker);
  }


  handleEvent(evtName) {
    const camelize = function(str) {
      return str.split(' ').map(function(word){
        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join('');
    }
    let timeout;
    const handlerName = `on${camelize(evtName)}`;

    return (e) => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(() => {
        if (this.props[handlerName]) {
          this.props[handlerName](this.props, this.map, e);
        }
      }, 0);
    }
  }
  recenterMap() {
    const map = this.map;
    const curr = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
        let center = new maps.LatLng(curr.lat, curr.lng)
        map.panTo(center)
    }
  }

  render() {
    return (
      <div id="googleMap" ref='map'>
        Loading map...
      </div>
    );
  }
}

export default Map;
