import React, { Component } from "react";
import GoogleMap from "../../../charts/Map/index";
import styles from "./MapContainer.module.scss";
import GoogleCharts from "../../../charts/Map/Charts";
import data from "./polygonData";

class MapContainer extends Component {
  render() {
    const reversedCoords = data.map(ll => {
      return { lat: ll.lng, lng: ll.lat };
    });
    return (
      <div className={styles.mapContainer}>
        {/* <GoogleMap polygonData={reversedCoords}></GoogleMap> */}
        <GoogleCharts></GoogleCharts>
      </div>
    );
  }
}

export default MapContainer;
