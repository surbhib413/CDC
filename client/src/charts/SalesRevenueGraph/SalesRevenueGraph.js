import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
// import styles from "./SalesRevenueGraph.module.scss";

function SalesRevenueGraph(props) {
  const chartContainer = useRef("barGraph");
  const [chartInstance, setChartInstance] = useState(null);
  
  
  useEffect(() => {
    let actualArray = [];
    let targetArray = [];
    let labelPosition = "";
    let labelAlign = "";
    let paddingRight = 0;
    let paddingLeft = 0;
  
    function prepareGraphData(apiGraphData) {
      apiGraphData.forEach((item, index) => {
        if (item.kpi_name === 'sales') {
          actualArray.push(item.actual * -1);
          targetArray.push(item.target * -1);
          labelPosition = "start";
          labelAlign = "start";
          paddingRight = 0;
          paddingLeft = 60;
        }
        else if (item.kpi_name === 'revenue') {
          actualArray.push(item.actual);
          targetArray.push(item.target);
          labelPosition = "end";
          labelAlign = "end";
          paddingRight = 60;
          paddingLeft = 0;
        }
      });
    }
    prepareGraphData(props.graphData)

    if (chartInstance) {
      chartInstance.destroy()
    }

    const ctx = chartContainer.current.getContext("2d");
    const chartConfig = {
      type: "horizontalBar",
      data: {
        labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
        datasets: [
          {
            yAxisID: "bar-x-axis1",
            categoryPercentage: 1,
            barPercentage: 0.3,
            label: "Actual",
            backgroundColor: "#a241f7",
            // data: [-10, -20, -30, -40, -50, -60, -70, -80, -90, -10, -40, -50],
            data: actualArray,
            borderWidth: 0,
            datalabels: {
              display: false,
            },
            // datalabels: {
            //     //display:false,
            //     anchor: labelPosition,
            //     align: 'start',
            //     color: "#dee5ef",
            //     font: {
            //         size: 20
            //     },
            //     formatter: function (value, context) {
            //         if (props.graphData[0].kpi_name === "sales")
            //             return value * -1;
            //     }
            // },
          },
          {
            yAxisID: "bar-x-axis2",
            categoryPercentage: 0.8,

            label: "Target",
            // data: [-60, -70, -80, -90, -90, -90, -90, -90, -90, -90, -90, -90],
            data: targetArray,
            backgroundColor: "#2f3b51",
            datalabels: {
              //display:false,
              anchor: labelPosition,
              align: labelAlign,
              color: "#dee5ef",
              font: {
                size: 12
              },
              formatter: function (value, context) {
                // console.log(context.dataIndex)
                if (props.graphData[0].kpi_name === "sales")
                  return `${actualArray[context.dataIndex] * -1} | ${value * -1}`
                else if (props.graphData[0].kpi_name === "revenue")
                  return `${actualArray[context.dataIndex]} | ${value}`
              }
            },
            borderWidth: 0,
            // datalabels: {
            //     display: false,
            // },
          },
        ]
      },
      options: {
        layout: {
          padding: {
            right: paddingRight,
            left: paddingLeft,
            // top: 20,
            // bottom: 20,
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              display: true,
              beginAtZero: true,
              ticks: {
                beginAtZero: true,
                display: true,
                padding: 10,
                fontColor: "#dee5ef",
                fontSize: "16",
                callback: function (value) {
                  if (props.graphData[0].kpi_name === "sales")
                    return (value * -1);
                  else if (props.graphData[0].kpi_name === "revenue")
                    return value;
                },
              },
              gridLines: {
                display: true,
                color: "#67758d",
                // display: true,
                drawBorder: true,
                // offsetGridLines: true,
                tickMarkLength: 0,
                // color: "grey",
                // tickMarkLength: 0,
                borderDash: [3],

                // tickMarkLength: 0,
                zeroLineColor: "#67758d",
                zeroLineWidth: 1,
                zeroLineBorderDash: [3],
              }
            },
          ],

          yAxes: [
            {
              id: "bar-x-axis1",
              // beginAtZero: true,
              display: true,
              offset: true,
              type: 'category',
              gridLines: {
                // display: true,
                // drawBorder: true,
                // color: "grey",
                // tickMarkLength: 0,
                // borderDash: [3],

                display: true,
                color: "#67758d",
                tickMarkLength: 0,
                zeroLineColor: "#67758d",
                zeroLineWidth: 1,
                zeroLineBorderDash: [3],
                // tickMarkLength: 0,
                // zeroLineColor: "#67758d",
                // zeroLineWidth: 1
              },
              ticks: {
                display: false,
                padding: 9,
                fontColor: "#dee5ef",
                fontSize: "22"
              },
            },
            {
              display: false,
              offset: true,
              id: "bar-x-axis2",
              type: 'category',
              gridLines: {
                display: true,
                color: "grey",
                // drawBorder: true,
                // tickMarkLength: 0,
                // borderDash: [3],
              },
              ticks: {
                padding: 9,
                fontColor: "#dee5ef",
                fontSize: "22"
              },
            },
          ]

        },
        legend: {
          display: false
        }
      },
      plugins: [{
        afterUpdate: function (chart) {
          for (let i in chart.config.data.datasets) {
            let dataset = chart.config.data.datasets[i];
            if (dataset.label === "Actual") {
              for (let j = chart.config.data.datasets[i].data.length - 1; j >= 0; --j) {
                let model = chart.getDatasetMeta(i).data[j]._model;
                let start = model.x;
                // let end = model.x + dataset.data[0];
                let end = model.x;
                if (props.graphData[0].kpi_name === 'sales') {
                  let gradient = ctx.createLinearGradient(start + 10, 0, end + 200, 0);
                  gradient.addColorStop(0, 'rgb(0, 168, 236)');
                  gradient.addColorStop(1, 'rgb(0, 224, 188)');
                  model.backgroundColor = gradient;
                }
                else {
                  let gradient = ctx.createLinearGradient(start + 10, 0, end - 200, 0);
                  gradient.addColorStop(0, 'rgb(0, 168, 236)');
                  gradient.addColorStop(1, 'rgb(0, 224, 188)');
                  model.backgroundColor = gradient;
                }
              }
            }
            else {
              for (let j = chart.config.data.datasets[i].data.length - 1; j >= 0; --j) {
                let model = chart.getDatasetMeta(i).data[j]._model;
                let start = model.x;
                let end = model.x;
                if (props.graphData[0].kpi_name === 'sales') {
                  let gradient = ctx.createLinearGradient(start - 100, 0, end + 300, 0);
                  gradient.addColorStop(0, 'rgba(0, 168, 236,0.3)');
                  gradient.addColorStop(1, 'rgba(0, 224, 188,0.3)');
                  model.backgroundColor = gradient;
                }
                else {
                  let gradient = ctx.createLinearGradient(start + 100, 0, end - 300, 0);
                  gradient.addColorStop(0, 'rgba(0, 168, 236,0.3)');
                  gradient.addColorStop(1, 'rgba(0, 224, 188,0.3)');
                  model.backgroundColor = gradient;
                }
              }
            }
          }
        }
      }]
    }
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(ctx, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer, props.graphData]) // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <canvas ref={chartContainer} />
  )
}

export default SalesRevenueGraph;