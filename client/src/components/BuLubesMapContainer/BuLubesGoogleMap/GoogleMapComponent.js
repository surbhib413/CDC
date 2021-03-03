import React, { Component } from "react";
import mapStyles from "./mapStyles";
import styles from "./GoogleMapComponent.module.scss";
import {
  GoogleMap,
  Polygon,
  Polyline
} from "react-google-maps";
import CustomInfoBox from "./CustomInfoBox";
import BuAtfMapTable from "../BuLubesMapTable/BuLubesMapTable"
import statesJson from "./indiaRegions.json";
import StateMap from "./StateMap";
import { getColourFromRating } from "../../../utility/buMapUtility";
import { Spinner } from "react-bootstrap";
import environment from "../../../environment";
//Marker


class GoogleMapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKpi: "all",
      responseData: [],
      loading: true
    };
    this.onRegionClick = this.onRegionClick.bind(this)
  }
  componentDidMount() {
    let url = `${environment.BU_KPI_URL}/overall/data?data_type=ytm&level=region&business_unit=lubes`;
    fetch(url, { method: "GET" })
      .then(res => res.json())
      .then(response => {
        this.setState({
          responseData: response.data,
          loading: false
        })
      })
      .catch(error => console.log(error));
  }

  onRegionClick(e, region) {
    console.log(e);
    this.props.handleRegionDropdown(region.name, e.latLng, 6.2);
  }

  onKpiTabChange(kpiToShow) {
    this.setState({
      activeKpi: kpiToShow
    })
  }
  render() {
    return (
      this.state.loading
        ?
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
        :
        <GoogleMap
          className={`${styles.noCloseButton}`}
          center={this.props.mapCenter}
          zoom={this.props.mapZoom}
          defaultOptions={{
            styles: mapStyles,
            mapTypeControl: false,
            disableDoubleClickZoom: true,
            zoomControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false
          }}
          ref={this.props.onMapMounted}
          onClick={(e) => { console.log("FROM MAP", e.latLng) }}

        >
          <div className={`${styles.mapKpiSelectorContainer}`}>
            <div onClick={() => this.onKpiTabChange("all")} className={`d-flex align-items-center justify-content-center flex-column ${styles.mapKpiSelector} ${this.state.activeKpi === "all" ? styles.active : ""}`}>ALL</div>
            <div onClick={() => this.onKpiTabChange("sales")} className={`d-flex align-items-center justify-content-center flex-column ${styles.mapKpiSelector} ${this.state.activeKpi === "sales" ? styles.active : ""}`}>SALES</div>
            <div onClick={() => this.onKpiTabChange("revenue")} className={`d-flex align-items-center justify-content-center flex-column ${styles.mapKpiSelector} ${this.state.activeKpi === "revenue" ? styles.active : ""}`}>REVENUE</div>
            <div onClick={() => this.onKpiTabChange("market share")} className={`d-flex align-items-center justify-content-center flex-column ${styles.mapKpiSelector} ${this.state.activeKpi === "market share" ? styles.active : ""}`}>MARKET SHARE</div>
            <div onClick={() => this.onKpiTabChange("hsse")} className={`d-flex align-items-center justify-content-center flex-column ${styles.mapKpiSelector} ${this.state.activeKpi === "hsse" ? styles.active : ""}`}>HSSE</div>
            <div onClick={() => this.onKpiTabChange("plant")} className={`d-flex align-items-center justify-content-center flex-column ${styles.mapKpiSelector} ${this.state.activeKpi === "plant" ? styles.active : ""}`}>PLANT</div>
          </div>
          <div className={`d-flex align-items-center justify-content-around p-2 ${styles.tabLabelsContainer}`}>
            <div className="d-flex align-items-center"><span className={`mr-2 ${styles.poorDot}`}></span>Poor</div>
            <div className="d-flex align-items-center"><span className={`mr-2 ${styles.fairDot}`}></span>Fair</div>
            <div className="d-flex align-items-center"><span className={`mr-2 ${styles.goodDot}`}></span>Good</div>
            <div className="d-flex align-items-center"><span className={`mr-2 ${styles.excellentDot}`}></span>Excellent</div>
          </div>

          <div className={`${styles.mapTableContainer}`}>
            <BuAtfMapTable activeKpi={this.state.activeKpi}></BuAtfMapTable>
          </div>
          {
            (this.props.mapOf === "all regions" && this.props.activeTab === "lubes_tab")
              ?
              statesJson.regions.map((regionItem, index) => {
                let responseRegion = this.state.responseData.find((responseDataItem) => {
                  return responseDataItem.region === regionItem.name
                })
                return (
                  <React.Fragment key={index}>
                    <CustomInfoBox
                      kpiSelection={this.state.activeKpi}
                      locationData={responseRegion}
                      anchorPosition={regionItem.data.markers[0].coordinates.slice(-1)[0]}
                      markerPixelOffset={{ x: 135, y: 120 }}
                    ></CustomInfoBox>
                    {regionItem.data.polygons.map((polygon, index) => {
                      return (
                        <Polygon
                          key={index}
                          path={polygon.coordinates}
                          options={{
                            fillColor: `${getColourFromRating(responseRegion.rating)}`,
                            fillOpacity: 1,
                            strokeColor: "#141923",
                            strokeOpacity: 1,
                            strokeWeight: 0.5,
                          }}
                          onClick={(e) => this.onRegionClick(e, regionItem)}
                        >
                        </Polygon>)
                    })}
                    <Polyline
                      path={
                        regionItem.data.markers[0].coordinates
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
              :
              this.props.activeTab === "lubes_tab" && <StateMap
                activeTab={this.props.activeTab}
                kpiSelection={this.state.activeKpi} 
                regionName={this.props.mapOf}>
              </StateMap>
          }
        </GoogleMap>
    );
  }
}

export default GoogleMapComponent;
