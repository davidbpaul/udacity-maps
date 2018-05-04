import React, { Component } from 'react';
import ReactDOM from 'react-dom';

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
    zoom: 10,
    // San Francisco, by default
    initialCenter: {
      lat: 45.01809,
      lng: -74.72815
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
      locations: this.props.getLocations(lat, lng),
      markersArray: []
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
     this.recenterMap();
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
                    locations: this.props.getLocations(coords.latitude, coords.longitude)
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
    this.state.locations.forEach( location => { // iterate through locations saved in state
      const marker = new this.props.google.maps.Marker({ // creates a new Google maps Marker object.
        position: {lat: location.location.lat, lng: location.location.lng}, // sets position of marker to specified location
        map: this.map, // sets markers to appear on the map we just created on line 35
        title: location.name // the title of the marker is set to the name of the location
      });
      this.state.markersArray.push(marker);
      marker.addListener("click", function() {
        self.openInfoWindow(marker);
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(function() {
          marker.setAnimation(null);
        }, 2100);
      });
    })
  }
  openInfoWindow(marker){
    var InfoWindow = new window.google.maps.InfoWindow({});

    window.google.maps.event.addListener(InfoWindow, "closeclick", function() {
      InfoWindow.close(this.map, marker);
    });
    InfoWindow.setContent(marker.title);
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
