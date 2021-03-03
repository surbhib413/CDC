import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
// import 'chartjs-plugin-datalabels';
import styles from "./BuOperatingCostBarGraph.module.scss";
// import {inrFormat, usdFormat} from "../../utility/utility"

Chart.defaults.global.defaultFontFamily = "Titillium Web";

function BuOperatingCostBarGraph(props) {

  const chartContainer = useRef("barGraph");
  const [chartInstance, setChartInstance] = useState(null);

  
  useEffect(() => {
    let staffCostArray = [];
    let rmArray = [];
    let rentalArray = [];
    let thirdPartyArray = [];
    let salesProArray = [];
    let othersArray = [];
  
    const xLabels = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]
    // let xTicks = [];
    // let avgValue = 0;
  
    function prepareGraphData(apiGraphData) {
      apiGraphData.forEach((item, index) => {
        if (props.staffCostVar) {
          if (item.staff_cost) {
            staffCostArray.push(item.staff_cost);
          }
        }
  
        if (props.rmVar) {
          if (item.rm) {
            rmArray.push(item.rm);
          }
        }
  
        if (props.rentalVar) {
          if (item.rental) {
            rentalArray.push(item.rental);
          }
        }
  
        if (props.thirdPartyVar) {
          if (item.third_party) {
            thirdPartyArray.push(item.third_party);
          }
        }
  
        if (props.salesProVar) {
          if (item.sales_pro) {
            salesProArray.push(item.sales_pro);
          }
        }
  
        if (props.othersVar) {
          if (item.others) {
            othersArray.push(item.others);
          }
        }
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
            categoryPercentage: 1,
            barPercentage: 0.6,
            backgroundColor: "#00e0bc",
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
            data: rmArray,
            categoryPercentage: 1,
            barPercentage: 0.6,
            backgroundColor: "#00a8eb",
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
            data: rentalArray,
            categoryPercentage: 1,
            barPercentage: 0.6,
            backgroundColor: "#00e08b",
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
            data: thirdPartyArray,
            categoryPercentage: 1,
            barPercentage: 0.6,
            backgroundColor: "#fabd5a",
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
            data: salesProArray,
            categoryPercentage: 1,
            barPercentage: 0.6,
            backgroundColor: "#fd797c",
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
            categoryPercentage: 1,
            barPercentage: 0.6,
            backgroundColor: "#ff588b",
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
  }, [chartContainer, props.graphData, props.staffCostVar, props.allVar, props.rmVar, props.rentalVar, props.thirdPartyVar, props.salesProVar, props.othersVar]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`${styles.grmGraph}`}>
      <canvas
        ref={chartContainer}
      />
    </div>
  )
}
export default BuOperatingCostBarGraph;