import { ResponsiveTreeMap } from '@nivo/treemap'
import React from "react";

const CostCompositionTreeMap = (props) => {
  const root = {
    "name": "Costs",
    "color": "#466188",
    "children": [
      {
        "name": "Salary",
        "color": "#04caa6",
        "loc": 230000000
      },
      {
        "name": "Recruitment",
        "color": "#2281e8",
        "loc": 100000000
      },
      {
        "name": "Contract Labor",
        "color": "#00aedd",
        "loc": 150000000
      },
      {
        "name": "Overtime",
        "color": "#00aedd",
        "loc": 70000000
      },
      {
        "name": "Benefits",
        "color": "#699cb6",
        "loc": 200000000
      },
      {
        "name": "Others",
        "color": "#82c3e4",
        "loc": 250000000
      }
    ]
  };


  return (
    <div style={{ height: "283px", width: "393px" }}>
        {/* labelFormat=".0s" */}
      <ResponsiveTreeMap
        root={root}
        identity="name"
        value="loc"
        innerPadding={4}
        outerPadding={4}
        label="name"
        labelSkipSize={12}
        labelTextColor="white"
        colors={x => { return x.color }}
        margin={{left: 32}}
      />
    </div>)
}
export default CostCompositionTreeMap;