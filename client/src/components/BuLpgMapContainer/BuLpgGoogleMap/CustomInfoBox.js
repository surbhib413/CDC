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

        {/* PLANT ANNOTATION */}
        {(props.kpiSelection === "plant") && <div className={`${styles.infoWindowContent}`}>
          <span className={`${styles.contentTitle}`}>Bottling No.</span>
          <span style={{ color: `${getColourFromRating(props.locationData.plant.rating)}` }}>{props.locationData.plant.bottling}</span>
        </div>}
        {(props.kpiSelection === "plant") && <div className={`${styles.infoWindowContent}`}>
          <span className={`${styles.contentTitle}`}>Bulk Inventory</span>
          <span style={{ color: `${getColourFromRating(props.locationData.plant.rating)}` }}>{props.locationData.plant.bulk_inventory}</span>
        </div>}
        {(props.kpiSelection === "plant") && <div className={`${styles.infoWindowContent}`}>
          <span className={`${styles.contentTitle}`}>Cylinder Inventory</span>
          <span style={{ color: `${getColourFromRating(props.locationData.plant.rating)}` }}>{props.locationData.plant.cylinder_inventory}</span>
        </div>}
        {(props.kpiSelection === "plant") && <div className={`${styles.infoWindowContent}`}>
          <span className={`${styles.contentTitle}`}>Lodd Gain</span>
          <span style={{ color: `${getColourFromRating(props.locationData.plant.rating)}` }}>{props.locationData.plant.loss_gain}</span>
        </div>}


        {/* SUPPLY ANNOTATION */}
        {(props.kpiSelection === "supply") && <div className={`${styles.infoWindowContent}`}>
          <span className={`${styles.contentTitle}`}>Incoming</span>
          <span style={{ color: `${getColourFromRating(props.locationData.supply.rating)}` }}>{props.locationData.supply.incoming}</span>
        </div>}
        {(props.kpiSelection === "supply") && <div className={`${styles.infoWindowContent}`}>
          <span className={`${styles.contentTitle}`}>Planned Demand</span>
          <span style={{ color: `${getColourFromRating(props.locationData.supply.rating)}` }}>{props.locationData.supply.planned_demand}</span>
        </div>}
        {(props.kpiSelection === "supply") && <div className={`${styles.infoWindowContent}`}>
          <span className={`${styles.contentTitle}`}>Actual Sales</span>
          <span style={{ color: `${getColourFromRating(props.locationData.supply.rating)}` }}>{props.locationData.supply.actual_sales}</span>
        </div>}
      </div>
    </OverlayView>
  )
}
export default CustomInfoBox