import React, { useState, useEffect } from "react";
import {
  Polygon,
  Polyline
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
    let url = `${environment.BU_KPI_URL}/overall/data?data_type=ytm&level=state&business_unit=inc&region=${props.regionName}`;
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
  // let topFiveStates = ["orissa", "west bengal", "bihar", "chhattisgarh", "assam", "jharkhand"]
  let topFiveStates = ["delhi", "punjab", "haryana", "uttar pradesh", "himachal pradesh"]


  return (
    loading
      ?
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
      :
      regionJson.data.polygons.map((stateItem, index) => {
        let responseState = responseRegionData.find((responseDataItem) => {
          return (responseDataItem.state.toLowerCase() === stateItem.name.toLowerCase())
        })
        console.log("State data that matched: ", responseState);
        return (
          responseState && <React.Fragment key={index}>
            {topFiveStates.includes(responseState.state) && <CustomInfoBox
              kpiSelection={props.kpiSelection}
              locationData={responseState}
              anchorPosition={stateItem.annotationMarkers[0].coordinates.slice(-1)[0]}
              markerPixelOffset={{ x: 135, y: 120 }}
            ></CustomInfoBox>}
            <Polygon
              path={stateItem.coordinates}
              options={{
                fillColor: `${getColourFromRating(responseState.rating)}`,
                fillOpacity: 1,
                strokeColor: "#141923",
                strokeOpacity: 1,
                strokeWeight: 0.5,
              }}
              onClick={(e) => { console.log("FROM component", e.latLng) }}
            >
            </Polygon>
            {topFiveStates.includes(responseState.state) && <Polyline
              path={
                stateItem.annotationMarkers[0].coordinates
              }
              options={{
                strokeColor: "#ffffff",
                strokeOpacity: 1,
                strokeWeight: 1,
              }}
            >
            </Polyline>}
          </React.Fragment>
        )
      })
  )
}
export default StateMap;