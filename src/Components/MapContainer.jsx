import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      google: this.props.google,
      showingInfoWindow: false,
      marker: {},
      activeMarker: {},
      selectedPlace: {}
    };
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };
  onMapClicked = (mapProps, map, event) => {
    const { markers } = this.state;
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    
    this.props.locationChanged({lat, lng});
    
    this.setState({
      marker: { lat, lng }
    });

  };

  render() {
    return (
      <>
        <Map
          google={this.state.google}
          zoom={15}
          onClick={this.onMapClicked}
          initialCenter={{ lat: 19.440057053713137, lng: -99.12704709742486 }}
        >
          <Marker
            onClick={this.onMarkerClick}
            position={this.state.marker}
            name="Posición inicial"
          />

          {this.props.data.map(restaurant => (
            <Marker
              key={restaurant.id}
              onClick={this.onMarkerClick}
              position={{
                lat: restaurant.address.location.lat,
                lng: restaurant.address.location.lng
              }}
              name={restaurant.name}
            />
          ))}

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCmjvkXB_DMnBUNwxQztLMStyQmA_szbNw"
})(MapContainer);
