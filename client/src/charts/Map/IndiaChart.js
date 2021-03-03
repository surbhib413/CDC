import React, { Component } from "react";
import Chart from "react-google-charts";

class IndiaChart extends Component {
  state = {
    options: {
      region: "IN",
      displayMode: "regions",
      resolution: "provinces"
    },

    chartType: "GeoChart",
    data: [
      ["State", "Population"],
      ["IN-1", 19581477],
      ["IN-2", 19581477],
      ["IN-3", 19581477],
      ["IN-8", 15181477],
      ["IN-9", 11581477],
      ["IN-4", 19581477],
      ["IN-5", 19581477],
      ["IN-6", 19581477],
      ["IN-7", 19581477]
    ]
  };
  render() {
    return (
      <div>
        <Chart
          options={this.state.options}
          chartType='GeoChart'
          data={this.state.data}
        />
      </div>
    );
  }
}
export default IndiaChart;
