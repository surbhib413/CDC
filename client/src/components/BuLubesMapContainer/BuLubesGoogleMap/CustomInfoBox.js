import React from "react"
import { OverlayView } from "react-google-maps";
import styles from "./CustomInfoBox.module.scss";
import { getColourFromRating } from "../../../utility/buMapUtility";

function CustomInfoBox(props) {
  const getPixelPositionOffset = pixelOffset => (width, height) => ({
    x: -(width / 2) + pixelOffset.x,
    y: -(height / 2) + pixelOffset.y
  });
  return (

    <OverlayView
      position={props.anchorPosition}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={getPixelPositionOffset(props.markerPixelOffset)}
    >
      <div className={`d-flex flex-column ${styles.infoWindowContainer}`}>
        <div className={`${styles.markerDot}`}></div>

        <div className={`${styles.infoWindowTitle}`}>
          {props.locationData.level === "state" ? props.locationData.state.toUpperCase() : props.locationData.region.toUpperCase()}
        </div>
        {(props.kpiSelection !== "depot") && <hr className={`${styles.titleLine}`} ></hr>}


        {/* SALES ANNOTATION */}
        {(props.kpiSelection === "sales" || props.kpiSelection === "all") && <div className={`${styles.infoWindowContent}`}>
          <span className={`${styles.contentTitle}`}>Sales</span>
          {/* <span style={{ color: `#ff5b4f` }}>{`${props.locationData.sales.actual}/${props.locationData.sales.target} TKL`}</span> */}
          <span style={{ color: `${getColourFromRating(props.locationData.sales.rating)}` }}>{`${props.locationData.sales.actual}/${props.locationData.sales.target}`}</span>
        </div>}
        {props.kpiSelection === "sales" && <div className={`${styles.infoWindowContent}`}>
          <span className={`${styles.contentTitle}`}>Contribution</span>
          {/* <span style={{ color: `#ff5b4f` }}>{`${props.locationData.sales.actual}/${props.locationData.sales.target} TKL`}</span> */}
          <span style={{ color: `${getColourFromRating(props.locationData.sales.rating)}` }}>{`${props.locationData.sales.contribution}%`}</span>
        </div>}


        {/* REVENUE ANNOTATION */}
        {(props.kpiSelection === "revenue" || props.kpiSelection === "all") && <div className={`${styles.infoWindowContent}`}>
          <span className={`${styles.contentTitle}`}>Revenue</span>
          <span style={{ color: `${getColourFromRating(props.locationData.revenue.rating)}` }}>{`${props.locationData.revenue.actual}/${props.locationData.revenue.target} Cr`}</span>
        </div>}
        {(props.kpiSelection === "revenue") && <div className={`${styles.infoWindowContent}`}>
          <span className={`${styles.contentTitle}`}>Contribution</span>
          <span style={{ color: `${getColourFromRating(props.locationData.revenue.rating)}` }}>{`${props.locationData.revenue.contribution} %`}</span>
        </div>}


        {/* MARKET SHARE ANNOTATION */}
        {(props.kpiSelection === "market share" || props.kpiSelection === "all") && <div className={`${styles.infoWindowContent}`}>
          <span className={`${styles.contentTitle}`}>Market Share</span>
          <span style={{ color: `${getColourFromRating(props.locationData.mkt_share.rating)}` }}>{`${props.locationData.mkt_share.actual}%`}</span>
        </div>}


        {/* HSSE ANNOTATION */}
        {(props.kpiSelection === "all") && <div className={`${styles.infoWindowContent}`}>
          <span className={`${styles.contentTitle}`}>HSSE</span>
          <span style={{ color: `${getColourFromRating(props.locationData.hsse.rating)}` }}>{props.locationData.hsse.lost_man_hours + props.locationData.hsse.incidents}</span>
        </div>}
        {(props.kpiSelection === "hsse") && <div className={`${styles.infoWindowContent}`}>
          <span className={`${styles.contentTitle}`}>Lost man hours</span>
          <span style={{ color: `${getColourFromRating(props.locationData.hsse.rating)}` }}>{props.locationData.hsse.lost_man_hours}</span>
        </div>}
        {(props.kpiSelection === "hsse") && <div className={`${styles.infoWindowContent}`}>
          <span className={`${styles.contentTitle}`}>Incidents</span>
          <span style={{ color: `${getColourFromRating(props.locationData.hsse.rating)}` }}>{props.locationData.hsse.incidents}</span>
        </div>}


        {/* {DEPOT ANNOTATION} */}
        {(props.kpiSelection === "depot") &&
          <div className={`${styles.depotInfoWindow}`}>
            <div className={`d-flex align-item-center justify-content-between py-2 ${styles.contentTableTitle}`}>
              Total Depot
            <span>{props.locationData.depot.below + props.locationData.depot.above}</span>
            </div>
          </div>}
        {(props.kpiSelection === "depot") && <div className={`${styles.depotInfoWindow}`}>
          <div className={`d-flex align-item-center justify-content-between ${styles.contentTitle}`}>
            Below
            <span style={{ color: `#ff5b4f` }}>{props.locationData.depot.below}</span>
          </div>
          <div className={`d-flex align-item-center justify-content-between ${styles.contentTitle}`}>
            Above
            <span style={{ color: `#7df289` }}>{props.locationData.depot.above}</span>
          </div>
        </div>}




      </div>
    </OverlayView>
  )
}
export default CustomInfoBox