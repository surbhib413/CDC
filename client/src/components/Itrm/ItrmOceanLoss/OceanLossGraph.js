import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
// import 'chartjs-plugin-datalabels';
import styles from "./OceanLossGraph.module.scss";
// import {inrFormat, usdFormat} from "../../utility/utility"

Chart.defaults.global.defaultFontFamily = "Titillium Web";

function LandedCostGraph(props) {
  const chartContainer = useRef("barGraph");
  const [chartInstance, setChartInstance] = useState(null);

  
  useEffect(() => {
    const xLabels = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]
    let avgValue = 0;
  
    function prepareGraphData(apiGraphData) {
      let count = apiGraphData.length;
      let total = 0;
      apiGraphData.forEach((item, index) => {
        total += item;
      })
      avgValue = total / count;
    }
    prepareGraphData(props.oceanLossData);
    if (chartInstance) {
      chartInstance.destroy()
    }

    const ctx = chartContainer.current.getContext("2d");

    let avgColor = "";
    //SET COLORS ACCORDING TO LOCATION
    if (props.location === "mumbai") {
      avgColor = "#06bee1";
    }
    if (props.location === "kochi") {
      avgColor = "#b76df1";
    }

    const chartConfig = {
      type: "line",
      data: {
        labels: xLabels,
        datasets: [
          {
            borderColor: "#dee5ef",
            pointBorderWidth: 0,
            pointBackgroundColor: "transparent",
            pointBorderColor: "transparent",
            borderWidth: 0,
            label: "Actual",
            data: props.oceanLossData,
            fill: false,
            // backgroundColor: "rgb(222, 172, 245)",
            datalabels: {
              display: false,
            },
          },
        ]
      },
      options: {
        // barRoundness: 1,
        responsive: true,
        maintainAspectRatio: false,
        annotation: {
          annotations: [{
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: avgValue,
            borderColor: avgColor,
            borderWidth: 2,
            borderDash: [3],
            label: {
              enabled: true,
              content: ''
            }
          }]
        },
        scales: {
          xAxes: [
            {
              display: true,
              gridLines: {
                color: "#2f3b51",
                offsetGidLines: true,
                tickMarkLength: 0,
              },
              ticks: {
                display: true,
                padding: 9,
                fontColor: "#dee5ef",
                fontSize: "20",
              },
            },
          ],

          yAxes: [
            {
              beginAtZero: true,
              ticks: {
                max: 1,
                min: 0,
                stepSize: 0.2,
                beginAtZero: true,
                display: true,
                padding: 20,
                fontColor: "#dee5ef",
                fontSize: "20",
              },
              gridLines: {
                color: "#2f3b51",
                tickMarkLength: 0,
                // zeroLineColor: "#67758d",
                zeroLineWidth: 1
              }
            },
          ]
        },
        legend: {
          display: false
        },
      }
    }

    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(ctx, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer, props.oceanLossData, props.location]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`${styles.grmGraph}`}>
      <canvas
        ref={chartContainer}
      />
    </div>
  )
}
export default LandedCostGraph;