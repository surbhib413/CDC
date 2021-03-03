import React from "react";
import { compose, withProps } from "recompose";
import GoogleMapComponent from "./GoogleMapComponent";
import { withGoogleMap, withScriptjs } from "react-google-maps";
//Marker, withHandlers

const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyARqnA7S2JnKjSvsikuOdYCMvoOf7Dv_lI&region=IN`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,

  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <div>
    <GoogleMapComponent
      handleRegionDropdown={props.handleRegionDropdown}
      mapOf={props.mapOf}
      mapCenter={props.mapCenter}
      mapZoom={props.mapZoom}
      activeTab={props.activeTab}
    />
  </div>
));

export default Map;
