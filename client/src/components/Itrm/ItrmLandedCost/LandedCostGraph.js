import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
import 'chartjs-plugin-datalabels';
import styles from "./LandedCostGraph.module.scss";
// import {inrFormat, usdFormat} from "../../utility/utility"

Chart.defaults.global.defaultFontFamily = "Titillium Web";

function LandedCostGraph(props) {

  const chartContainer = useRef("barGraph");
  const [chartInstance, setChartInstance] = useState(null);

  
  useEffect(() => {
    let crudeActualArray = [];
    let freightActualArray = [];
    let taxesActualArray = [];
    let targetArray = [];
  
    const xLabels = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]
    let avgValue = 0;
  
    function prepareGraphData(apiGraphData) {
      let count = apiGraphData.length;
      let total = 0;
      apiGraphData.forEach((item, index) => {
        let targetValue = 0;
        let actualAvgValue = 0;
        if (props.crudeBox) {
          crudeActualArray.push(item.crude_cost_actual);
          if (item.crude_cost_actual) {
            targetValue += item.crude_cost_target;
            actualAvgValue += item.crude_cost_actual;
          }
        }
  
        if (props.freightBox) {
          freightActualArray.push(item.freight_cost_actual);
          if (item.freight_cost_actual) {
            targetValue += item.freight_cost_target;
            actualAvgValue += item.freight_cost_actual;
          }
        }
  
        if (props.taxesBox) {
          taxesActualArray.push(item.taxes_actual);
          if (item.taxes_actual) {
            targetValue += item.taxes_target;
            actualAvgValue += item.taxes_actual;
          }
        }
  
        targetArray.push(targetValue);
        total += actualAvgValue;
        return;
      })
      avgValue = total / count;
    }
    prepareGraphData(props.landedCostData);
    let avgColor = "";
    if (props.location === "mumbai") {
      avgColor = "#06bee1";
    }
    if (props.location === "kochi") {
      avgColor = "#b76df1";
    }

    if (chartInstance) {
      chartInstance.destroy()
    }

    const ctx = chartContainer.current.getContext("2d");
    let crudeGradientMumbai = ctx.createLinearGradient(0, 0, 0, 500);
    crudeGradientMumbai.addColorStop(1, '#0340bd');
    crudeGradientMumbai.addColorStop(0, '#007aff');

    let crudeGradientKochi = ctx.createLinearGradient(0, 0, 0, 500);
    crudeGradientKochi.addColorStop(1, '#632897');
    crudeGradientKochi.addColorStop(0, '#a241f7');

    let freightGradientMumbai = ctx.createLinearGradient(0, 0, 0, 500);
    freightGradientMumbai.addColorStop(1, '#5eff91');
    freightGradientMumbai.addColorStop(0, '#02d345');

    let freightGradientKochi = ctx.createLinearGradient(0, 0, 0, 500);
    freightGradientKochi.addColorStop(1, '#e640b7');
    freightGradientKochi.addColorStop(0, '#ff7bda');

    let taxGradientMumbai = ctx.createLinearGradient(0, 0, 0, 500);
    taxGradientMumbai.addColorStop(1, '#00c7ec');
    taxGradientMumbai.addColorStop(0, '#c1f5ff');

    let taxGradientKochi = ctx.createLinearGradient(0, 0, 0, 500);
    taxGradientKochi.addColorStop(1, '#d883ff');
    taxGradientKochi.addColorStop(0, '#f4dbff');

    let crudeGradient = "";
    let freightGradient = "";
    let taxGradient = ""

    ////SET COLORS ACCORDING TO LOCATION
    if (props.location === "mumbai") {
      crudeGradient = crudeGradientMumbai;
      freightGradient = freightGradientMumbai;
      taxGradient = taxGradientMumbai;
    }
    if (props.location === "kochi") {
      crudeGradient = crudeGradientKochi;
      freightGradient = freightGradientKochi;
      taxGradient = taxGradientKochi;
    }

    const chartConfig = {
      type: "bar",
      data: {
        labels: xLabels,
        datasets: [
          {
            yAxisID: "bar-y-axis1",
            xAxisID: "bar-x-axis1",
            categoryPercentage: 1,
            barPercentage: 0.2,
            label: "Actual",
            data: crudeActualArray,
            backgroundColor: crudeGradient,
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
            yAxisID: "bar-y-axis1",
            xAxisID: "bar-x-axis1",
            categoryPercentage: 1,
            barPercentage: 0.2,
            label: "Actual",
            data: freightActualArray,
            backgroundColor: freightGradient,
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
            yAxisID: "bar-y-axis1",
            xAxisID: "bar-x-axis1",
            label: "Actual",
            categoryPercentage: 1,
            barPercentage: 0.2,
            data: taxesActualArray,
            backgroundColor: taxGradient,
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

          //X-AXIS 2 WITH TARGET DATA AND ONLY ONE DATASET
          {
            yAxisID: "bar-y-axis2",
            xAxisID: "bar-x-axis2",
            categoryPercentage: 0.6,
            label: "Target",
            backgroundColor: "#2f3b51",
            data: targetArray,
            borderWidth: 0,
            pointRadius: 0,
            datalabels: {
              anchor: "end",
              offset: 0,
              align: 'top',
              color: "#dee5ef",
              font: {
                size: 20
              },
              formatter: function (value, context) {
                if (value === 0) {
                  value = "";
                }
                return value;
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
          annotations: [{
            type: 'line',
            mode: 'horizontal',
            scaleID: 'bar-y-axis1',
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
              id: "bar-x-axis1",
              stacked: true,
              type: 'category',
              display: true,
              offset: true,
              gridLines: {
                color: "transparent",
                offsetGidLines: true,
                tickMarkLength: 0,
                borderDash: [3],
              },
              ticks: {
                display: true,
                padding: 9,
                fontColor: "#dee5ef",
                fontSize: "20",
              },
            },
            {
              id: "bar-x-axis2",
              // barPercentage: 1,
              display: false,
              offset: true,
              type: 'category',
              gridLines: {
                color: "transparent",
                offsetGidLines: true,
                tickMarkLength: 0,
                borderDash: [3],
              },
              ticks: {
                padding: 9,
                fontColor: "#dee5ef",
                fontSize: "22",
              },
            },
          ],

          yAxes: [
            {
              display: false,
              id: "bar-y-axis1",
              stacked: true,
              beginAtZero: true,
              ticks: {
                max: 40,
                min: 0,
                stepSize: 10,
                beginAtZero: true,
                display: true,
                padding: 20,
                fontColor: "#dee5ef",
                fontSize: "20",
              },
              gridLines: {
                color: "#2f3b51",
                tickMarkLength: 0,
                zeroLineColor: "#67758d",
                zeroLineWidth: 1
              }
            },
            {
              // display: false,
              id: "bar-y-axis2",
              beginAtZero: true,
              ticks: {
                max: 40,
                min: 0,
                stepSize: 10,
                beginAtZero: true,
                display: true,
                padding: 20,
                fontColor: "#dee5ef",
                fontSize: "20",
              },
              gridLines: {
                color: "#2f3b51",
                tickMarkLength: 0,
                zeroLineColor: "#2f3b51",
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
  }, [chartContainer, props.landedCostData, props.location, props.crudeBox, props.freightBox, props.taxesBox]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`${styles.grmGraph}`}>
      <canvas
        ref={chartContainer}
      />
    </div>
  )
}
export default LandedCostGraph;