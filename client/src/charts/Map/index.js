import React from "react";
import { compose, withProps, withHandlers } from "recompose";

// import markersData from "./markersData";
import GoogleMapComponent from "./GoogleMapComponent";

import { withGoogleMap, withScriptjs } from "react-google-maps";
//Marker
import { MAP } from "react-google-maps/lib/constants";

const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyARqnA7S2JnKjSvsikuOdYCMvoOf7Dv_lI&region=IN`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    
  }),
  withHandlers(() => {
    const refs = {
      map: undefined,
      mapObject: undefined
    };

    return {
      onMapMounted: () => ref => {
        refs.map = ref;
        refs.mapObject = ref.context[MAP];
      },

      onClick: (e, obj) => (e, obj) => {
        // console.log("Getting location...", e.latLng);
        //console.log(refs);
        refs.mapObject.setZoom(3);

        //placeMarker(e.latLng);

        //debugger;
        //refs.map.props.disableDoubleClickZoom(true);
      }
    };
    // function placeMarker(location) {
    //   console.log(location);
    //   console.log(refs.map);

    //   return <Marker position={{ lat: 89.9999, lng: 56.072 }} />;
    // }
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <div>
    <GoogleMapComponent
      myref={props.onMapMounted}
      drawMarker={e => props.onClick(e)}
    />
  </div>
));

export default Map;
