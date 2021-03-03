import React, { Component } from "react";
import mapStyles from "./mapStyles";
import styles from "./GoogleMapComponent.module.scss";
import {
  GoogleMap,
  Marker,
  Polygon,
  Polyline
} from "react-google-maps";
import CustomInfoBox from "./CustomInfoBox";
import BuRetailMapTable from "../BuRetailMapTable/BuRetailMapTable"
import statesJson from "./indiaRegions.json";
import StateMap from "./StateMap";
import { getColourFromRating } from "../../../utility/buMapUtility";
import { Spinner } from "react-bootstrap";
import depotBlackIcon from "../../../assets/images/depot-alert-02.png";
import depotWhiteIcon from "../../../assets/images/depot-ok-02.png";
import environment from "../../../environment";


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
    let url = `${environment.BU_KPI_URL}/overall/data?data_type=ytm&level=region&product=ms&business_unit=retail`;
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
            <div onClick={() => this.onKpiTabChange("depot")} className={`d-flex align-items-center justify-content-center flex-column ${styles.mapKpiSelector} ${this.state.activeKpi === "depot" ? styles.active : ""}`}>DEPOT</div>
          </div>
          <div className={`d-flex align-items-center justify-content-around p-2 ${styles.tabLabelsContainer}`}>
            <div className="d-flex align-items-center"><span className={`mr-2 ${styles.poorDot}`}></span>Poor</div>
            <div className="d-flex align-items-center"><span className={`mr-2 ${styles.fairDot}`}></span>Fair</div>
            <div className="d-flex align-items-center"><span className={`mr-2 ${styles.goodDot}`}></span>Good</div>
            <div className="d-flex align-items-center"><span className={`mr-2 ${styles.excellentDot}`}></span>Excellent</div>
          </div>
          {(this.state.activeKpi === "depot") && <div className={`d-flex align-items-center justify-content-center p-2 ${styles.depotTabLabelContainer}`}>
            <div className="d-flex align-items-center mr-3"><img src={depotBlackIcon} alt="Below Target" className="mr-2" />Below</div>
            <div className="d-flex align-items-center ml-3"><img src={depotWhiteIcon} alt="Above Target" className="mr-2" />Above</div>
          </div>}

          <div className={`${this.state.activeKpi === "depot" ? styles.mapTableContainerDepot : styles.mapTableContainer}`}>
            <BuRetailMapTable activeKpi={this.state.activeKpi}></BuRetailMapTable>
          </div>
          {
            (this.props.mapOf === "all regions" && this.props.activeTab === "retail_tab")
              ?
              statesJson.regions.map((regionItem, index) => {
                let responseRegion = this.state.responseData.find((responseDataItem) => {
                  return responseDataItem.region === regionItem.name
                })
                return (
                  <React.Fragment key={index}>
                    {this.state.activeKpi === "depot" && <Marker position={{ lat: 18, lng: 80 }} icon={depotBlackIcon}></Marker>}
                    {this.state.activeKpi === "depot" && <Marker position={{ lat: 24.7, lng: 77.4 }} icon={depotWhiteIcon}></Marker>}
                    {this.state.activeKpi === "depot" && <Marker position={{ lat: 10.4, lng: 78.75 }} icon={depotBlackIcon}></Marker>}
                    {this.state.activeKpi === "depot" && <Marker position={{ lat: 20.0, lng: 84.5 }} icon={depotWhiteIcon}></Marker>}
                    {this.state.activeKpi === "depot" && <Marker position={{ lat: 19.9, lng: 74.7 }} icon={depotBlackIcon}></Marker>}
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
              this.props.activeTab === "retail_tab" && <StateMap
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
