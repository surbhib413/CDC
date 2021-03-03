import React, {useState, useEffect } from "react";
import GoogleMap from "../../../charts/Map/index";
import styles from "./ItrmWorlMap.module.scss";
import GoogleChart from "../../../charts/Map/Charts";

const ItrmWorlMap = (props) => {
  const [location, setLocation] = useState("");
  const getRegionNameOnClick = (el) => {
    //alert();
    props.fetchRegionName(el);
  };

  useEffect(() => {
    console.log(props.location);
    setLocation(props.location);
  }, [props.location]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className={styles.mapContainer}>
      {/* <GoogleMap></GoogleMap> */}
      <GoogleChart
        getRegionNameOnClick={getRegionNameOnClick}
        location={props.location}
      ></GoogleChart>
    </div>
  );
};

export default ItrmWorlMap;
