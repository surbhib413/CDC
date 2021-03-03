import { ResponsiveWaffle } from '@nivo/waffle'
import React from "react";
function TankInventoryWaffleGraph(props) {
  // console.log(props.graphData);
  const data = [
    {
      "id": "above_norm",
      "label": "Above Norm",
      "value": props.graphData.above_norm,
      "color": "#7ec444"
    },
    {
      "id": "below_norm",
      "label": "Below Norm",
      "value": props.graphData.below_norm,
      "color": "#f15148"
    },
  ];


  return (
  <div style={{height:"inherit", width:"280px"}}>
    <ResponsiveWaffle
      data={data}
      total={props.graphData.above_norm + props.graphData.below_norm}
      rows={(props.graphData.above_norm + props.graphData.below_norm)/6}
      columns={6}
      padding={15}
      colors={x => { return x.color }}
      emptyColor={"#202c3f"}
      legends={[]}
    />
  </div>)
}
export default TankInventoryWaffleGraph;