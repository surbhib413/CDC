import React, { useState, useEffect } from "react";
import {
  Polygon,
  Polyline,
} from "react-google-maps";
import CustomInfoBox from "./CustomInfoBox";
import statesJson from "./indiaRegions.json";
import { getColourFromRating } from "../../../utility/buMapUtility";
import { Spinner } from "react-bootstrap";
import environment from "../../../environment";

function StateMap(props) {

  const [responseRegionData, setResponseRegionData] = useState([])
  const [loading, setLoading] = useState(true)

  let regionJson = statesJson.regions.find((regionFromJson) => {
    return regionFromJson.name === props.regionName
  })

  useEffect(() => {
    let url = `${environment.BU_KPI_URL}/overall/data?data_type=ytm&level=state&business_unit=lpg&region=${props.regionName}`;
    fetch(url, { method: "GET" })
      .then(res => res.json())
      .then(response => {
        // console.log(response);
        setResponseRegionData(response.data);
        setLoading(false);
      })
      .catch(error => console.log(error));
    // return () => {
    //   cleanup
    // }
  }, [props.regionName, props.activeTab])

  //Jugaad for top 5 states in North India
  // let topFiveStates = ["delhi", "punjab", "haryana", "uttar pradesh", "himachal pradesh"]

  return (
    loading
      ?
      <Spinner animation="border" role="status">
        ...Loading
      </Spinner>
      :
      regionJson.data.polygons.map((stateItem, index) => {
        let responseState = responseRegionData.find((responseDataItem) => {
          // console.log("State from JSON: ", stateItem.name);
          // console.log("State from Backend: ", responseDataItem.state);
          return (responseDataItem.state.toLowerCase() === stateItem.name.toLowerCase())
        })
        return (
          responseState && <React.Fragment key={index}>
            {
              <CustomInfoBox
                kpiSelection={props.kpiSelection}
                locationData={responseState}
                anchorPosition={stateItem.annotationMarkers[0].coordinates.slice(-1)[0]}
                markerPixelOffset={{ x: 135, y: 122 }}
              ></CustomInfoBox>
            }
            <Polygon
              path={stateItem.coordinates}
              options={{
                fillColor: `${getColourFromRating(responseState.rating)}`,
                fillOpacity: 1,
                strokeColor: "#141923",
                strokeOpacity: 0.5,
                strokeWeight: 0.5,
              }}
              onClick={(e) => { console.log("FROM component", e.latLng) }}
            >
            </Polygon>
            <Polyline
              path={
                stateItem.annotationMarkers[0].coordinates
              }
              options={{
                strokeColor: "#ffffff",
                strokeOpacity: 1,
                strokeWeight: 1,
              }}
            >
            </Polyline>
          </React.Fragment>
        )
      })
  )
}
export default StateMap;