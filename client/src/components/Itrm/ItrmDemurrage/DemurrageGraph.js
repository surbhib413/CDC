import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
// import 'chartjs-plugin-datalabels';
import styles from "./DemurrageGraph.module.scss";
// import {inrFormat, usdFormat} from "../../utility/utility"

Chart.defaults.global.defaultFontFamily = "Titillium Web";

function DemurrageGraph(props) {

  const chartContainer = useRef("barGraph");
  const [chartInstance, setChartInstance] = useState(null);

  
  useEffect(() => {
    let lpArray = [];
    let dpArray = [];
    let targetArrayLabels = [];
    let targetArrayData = []; 
  
    const xLabels = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]
    let avgValue = 0;
  
    function prepareGraphData(apiGraphData) {
      let total = 0;
      let count = apiGraphData.length;
      apiGraphData.forEach((item, index) => {
        lpArray.push(item.lp);
        dpArray.push(item.dp);
        targetArrayLabels.push(item.lp + item.dp);
        targetArrayData.push(0);
        total += item.lp + item.dp;
        return;
      }); 
      avgValue = total / count;
    }
    prepareGraphData(props.demurrageData);
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

    if (chartInstance) {
      chartInstance.destroy()
    }

    const ctx = chartContainer.current.getContext("2d");
    let lpGradientMumbai = ctx.createLinearGradient(0, 0, 0, 500);
    lpGradientMumbai.addColorStop(1, '#0340bd');//dark blue
    lpGradientMumbai.addColorStop(0, '#007aff');

    let dpGradientMumbai = ctx.createLinearGradient(0, 0, 0, 500);
    dpGradientMumbai.addColorStop(1, '#02d345');//green
    dpGradientMumbai.addColorStop(0, '#5eff91');

    let lpGradientKochi = ctx.createLinearGradient(0, 0, 0, 500);
    lpGradientKochi.addColorStop(0, '#632897');//purple
    lpGradientKochi.addColorStop(1, '#a241f7');

    let dpGradientKochi = ctx.createLinearGradient(0, 0, 0, 500);
    dpGradientKochi.addColorStop(1, '#e640b7');//pink
    dpGradientKochi.addColorStop(0, '#ff7bda');

    let dpGradient = "";
    let lpGradient = "";
    //SET COLORS ACCORDING TO LOCATION
    if (props.location === "mumbai") {
      lpGradient = lpGradientMumbai;
      dpGradient = dpGradientMumbai;
    }
    if (props.location === "kochi") {
      lpGradient = lpGradientKochi;
      dpGradient = dpGradientKochi;
    }

    const chartConfig = {
      type: "bar",
      data: {
        labels: xLabels,
        datasets: [
          {
            label: "LP",
            data: lpArray,
            categoryPercentage: 0.8,
            barPercentage: 0.5,
            backgroundColor: lpGradient,
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
            data: dpArray,
            categoryPercentage: 0.8,
            barPercentage: 0.5,
            backgroundColor: dpGradient,
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
            label: targetArrayLabels,
            data: targetArrayData,
            backgroundColor: "transparent",
            borderWidth: 0,
            datalabels: {
              anchor: "end",
              align: 'top',
              color: "#dee5ef",
              font: {
                size: 20,
              },
              formatter: function (value, context) {
                value = context.dataset.label[context.dataIndex]
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
          ],

          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Hours',
                fontColor: "#64779c",
                fontSize: 24,
              },
              stacked: true,
              beginAtZero: true,
              ticks: {
                beginAtZero: true,
                min: 0,
                max: 60,
                stepSize: 10,
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
            {
              scaleLabel: {
                display: false,//currently not required
                labelString: 'INR Cr',
                fontColor: "#64779c",
                fontSize: 24,
              },
              stacked: true,
              display: false,//currently not required
              position: "right",
              // beginAtZero: true,
              ticks: {
                //Configure these options depending on the conversion factor btwn Hours and Cr.
                 max: 60,
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
  }, [chartContainer, props.demurrageData, props.location]) //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`${styles.grmGraph}`}>
      <canvas
        ref={chartContainer}
      />
    </div>
  )
}
export default DemurrageGraph;