import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
// import 'chartjs-plugin-datalabels';
import styles from "./BuLpgOperatingCostGraph.module.scss";
// import {inrFormat, usdFormat} from "../../utility/utility"

Chart.defaults.global.defaultFontFamily = "Titillium Web";

function BuLpgOperatingCostBarGraph(props) {

  const chartContainer = useRef("barGraph");
  const [chartInstance, setChartInstance] = useState(null);

  
  useEffect(() => {
    let staffCostArray = [];
    let bottlingArray = [];
    let transportsArray = [];
    let rentalsArray = [];
    let othersArray = [];
  
    const xLabels = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]
    // let xTicks = [];
    // let avgValue = 0;
  
    function prepareGraphData(apiGraphData) {
      apiGraphData.forEach((item, index) => {
        staffCostArray.push(item.staff_cost);
        bottlingArray.push(item.bottling);
        transportsArray.push(item.transport);
        rentalsArray.push(item.rental);
        othersArray.push(item.others);
      });
    }
    prepareGraphData(props.graphData);

    if (chartInstance) {
      chartInstance.destroy()
    }

    const ctx = chartContainer.current.getContext("2d");
    let lpGradient = ctx.createLinearGradient(0, 0, 0, 500);
    lpGradient.addColorStop(1, '#00a8ec');//dark blue
    lpGradient.addColorStop(0, '#00e0bc');

    let dpGradient = ctx.createLinearGradient(0, 0, 0, 500);
    dpGradient.addColorStop(1, '#ff588c');//green
    dpGradient.addColorStop(0, '#fac159');

    // let lpGradientKochi = ctx.createLinearGradient(0, 0, 0, 500);
    // lpGradientKochi.addColorStop(0, '#632897');//purple
    // lpGradientKochi.addColorStop(1, '#a241f7');

    // let dpGradientKochi = ctx.createLinearGradient(0, 0, 0, 500);
    // dpGradientKochi.addColorStop(1, '#e640b7');//pink
    // dpGradientKochi.addColorStop(0, '#ff7bda');

    // let dpGradient = "";
    // let lpGradient = "";
    // //SET COLORS ACCORDING TO LOCATION
    // if (props.location === "mumbai") {
    //   lpGradient = lpGradientMumbai;
    //   dpGradient = dpGradientMumbai;
    // }
    // if (props.location === "kochi") {
    //   lpGradient = lpGradientKochi;
    //   dpGradient = dpGradientKochi;
    // }

    const chartConfig = {
      type: "bar",
      data: {
        labels: xLabels,
        datasets: [
          {
            label: "LP",
            data: staffCostArray,
            backgroundColor: "#00e0bc",
            categoryPercentage: 1,
              barPercentage: 0.6,
            borderWidth: 0,
            datalabels: {
              anchor: "end",
              align: 'start',
              color: "#dee5ef",
              font: {
                size: 20
              }
            },
          },
          {
            label: "DP",
            data: bottlingArray,
            backgroundColor: "#00a8eb",
            categoryPercentage: 1,
              barPercentage: 0.6,
            borderWidth: 0,
            datalabels: {
              anchor: "end",
              align: 'start',
              color: "#dee5ef",
              font: {
                size: 20
              }
            },
          },
          {
            label: "DP",
            data: transportsArray,
            backgroundColor: "#00e08b",
            categoryPercentage: 1,
              barPercentage: 0.6,
            borderWidth: 0,
            datalabels: {
              anchor: "end",
              align: 'start',
              color: "#dee5ef",
              font: {
                size: 20
              }
            },
          },
          {
            label: "DP",
            data: rentalsArray,
            backgroundColor: "#fabd5a",
            categoryPercentage: 1,
              barPercentage: 0.6,
            borderWidth: 0,
            datalabels: {
              anchor: "end",
              align: 'start',
              color: "#dee5ef",
              font: {
                size: 20
              }
            },
          },
          {
            label: "DP",
            data: othersArray,
            backgroundColor: "#ff588b",
            categoryPercentage: 1,
              barPercentage: 0.6,
            borderWidth: 0,
            datalabels: {
              anchor: "end",
              align: 'start',
              color: "#dee5ef",
              font: {
                size: 20
              }
            },
          },
        ]
      },
      options: {
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 30,
            bottom: 0
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        annotation: {
          // annotations: [{
          //   type: 'line',
          //   mode: 'horizontal',
          //   scaleID: 'y-axis-0',
          //   value: avgValue,
          //   borderColor: avgColor,
          //   borderWidth: 2,
          //   borderDash: [3],
          //   label: {
          //     enabled: true,
          //     content: ''
          //   }
          // }]
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              type: 'category',
              
              display: true,
              offset: true,
              gridLines: {
                color: "#35425c",
                offsetGidLines: true,
                tickMarkLength: 0,
                borderDash: [3],
                lineWidth: 3,
                zeroLineBorderDash: [3]
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
              stacked: true,
              ticks: {
                display: true,
                padding: 20,
                fontColor: "#dee5ef",
                fontSize: "20",
              },
              gridLines: {
                color: "#35425c",
                tickMarkLength: 0,
                zeroLineColor: "#35425c",
                zeroLineWidth: 1,
                lineWidth: 3
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
  }, [chartContainer, props.graphData, props.staffCostVar, props.allVar, props.bottlingVar, props.transportsVar, props.rentalsVar, props.othersVar]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`${styles.grmGraph}`}>
      <canvas
        ref={chartContainer}
      />
    </div>
  )
}
export default BuLpgOperatingCostBarGraph;