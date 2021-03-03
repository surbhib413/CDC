import React, { useState } from "react";
import { Polygon, Polyline } from "react-google-maps";
import CustomInfoBox from "./CustomInfoBox";
import StateMap from "./StateMap";
// import states from "./jsonData/indiaRegions.json";

function RegionMap(props) {
  // const [allRegions, setAllRegions] = useState(true)
  // let allRegions = true;
  const [states, setStates] = useState({});

  function onRegionClick(region) {
    // allRegions = false;
    setStates(region.data.polygons);
  }

  return Object.keys(states).length === 0 && states.constructor === Object ? (
    <>
      <CustomInfoBox
        anchorPosition={props.region.data.markers[0].coordinates.slice(-1)[0]}
        markerPixelOffset={{ x: 140, y: 130 }}
      ></CustomInfoBox>
      {props.region.data.polygons.map((polygon, index) => {
        return (
          <Polygon
            key={index}
            path={polygon.coordinates}
            options={{
              fillColor: `${props.overallColor}`,
              fillOpacity: 1,
              strokeColor: "#141923",
              strokeOpacity: 1,
              strokeWeight: 0.5,
            }}
            onClick={(e) => onRegionClick(props.region)}
          ></Polygon>
        );
      })}
      <Polyline
        path={props.region.data.markers[0].coordinates}
        options={{
          strokeColor: "#ffffff",
          strokeOpacity: 1,
          strokeWeight: 5,
        }}
      ></Polyline>
    </>
  ) : (
    <>
      {states.map((state, index) => {
        //console.log(state)
        return (
          <Polygon
            key={index}
            path={state.coordinates}
            options={{
              fillColor: `#ffffff`,
              fillOpacity: 1,
              strokeColor: "#141923",
              strokeOpacity: 1,
              strokeWeight: 0.5,
            }}
            onClick={(e) => {
              console.log("FROM component", e.latLng);
            }}
          ></Polygon>
        );
      })}
    </>
  );
}
export default RegionMap;
