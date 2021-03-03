import React, { Component } from "react";
import mapStyles from "./mapStyles";
import styles from "./GoogleMapComponent.module.scss";
import { GoogleMap, Polygon } from "react-google-maps";

import states from "../BuIndiaMap/jsonData/states.json";
import andhraPradeshDistricts from "../BuIndiaMap/jsonData/AndhraPradeshDistricts.json";
import arunachalPradeshDistricts from "../BuIndiaMap/jsonData/ArunachalPradeshDistricts.json";
import biharDistricts from "../BuIndiaMap/jsonData/BiharDistricts.json";
import chattisgarhDistricts from "../BuIndiaMap/jsonData/ChattisgarhDistricts.json";
import goaDistricts from "../BuIndiaMap/jsonData/GoaDistricts.json";
import gujaratDistricts from "../BuIndiaMap/jsonData/GujaratDistricts.json";
import haryanaDistricts from "../BuIndiaMap/jsonData/HaryanaDistricts.json";
import himachalPradeshDistricts from "../BuIndiaMap/jsonData/HimachalPradeshDistricts.json";

class GoogleMapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonFile: states,
      center: {},
      zoom: 5.5
    };
  }

  renderDistricts(e, indianState) {
    //FIX THIS NEXT
    let lat = e.latLng.lat["Scopes"];
    console.log(lat);
    if (indianState === "Andhra Pradesh") {
      this.setState({
        jsonFile: andhraPradeshDistricts
      });
    }
    if (indianState === "Arunachal Pradesh") {
      this.setState({
        jsonFile: arunachalPradeshDistricts
      });
    }
    if (indianState === "Bihar") {
      this.setState({
        jsonFile: biharDistricts
      });
    }
    if (indianState === "Chattisgarh") {
      this.setState({
        jsonFile: chattisgarhDistricts
      });
    }
    if (indianState === "Goa") {
      this.setState({
        jsonFile: goaDistricts
      });
    }
    if (indianState === "Gujarat") {
      this.setState({
        jsonFile: gujaratDistricts
      });
    }
    if (indianState === "Haryana") {
      this.setState({
        jsonFile: haryanaDistricts
      });
    }
    if (indianState === "Himachalpradesh") {
      this.setState({
        jsonFile: himachalPradeshDistricts
      });
    }
    // console.log(e)
  }

  render() {
    return (
      <GoogleMap
        defaultZoom={5.5}
        defaultCenter={{ lat: 24, lng: 78 }}
        defaultOptions={{
          styles: mapStyles,
          mapTypeControl: false,
          disableDoubleClickZoom: true,
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false
        }}
        ref={this.props.onMapMounted}
      >
        <div
          onClick={e => {
            this.setState({
              jsonFile: states,
              center: {},
              zoom: 5.5
            });
          }}
          className={`${styles.resetZoomButton}`}
        >
          Go Back to India Level
        </div>
        {this.state.jsonFile.polygons.map((polygon, index) => {
          return (
            <Polygon
              key={index}
              path={polygon.coordinates}
              options={{
                strokeColor: "#fc1e0d",
                strokeOpacity: 1,
                strokeWeight: 2
              }}
              onClick={e => {
                this.renderDistricts(e, polygon.name);
              }}
            ></Polygon>
          );
        })}
      </GoogleMap>
    );
  }
}

export default GoogleMapComponent;
