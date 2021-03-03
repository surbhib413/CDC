import React from "react";

const PercentData = props => {
  console.log(props);
  return (
    <div
      style={{
        color: "#ffff",
        fontSize: "120px",
        position: "absolute",
        top: "35%",
        left: "10%",
        zIndex: 1000
      }}
    >
      <div>{props.dataWeight}</div>
      <div style={{ fontSize: "30px" }}>{props.regionName}</div>
    </div>
  );
};

export default PercentData;
