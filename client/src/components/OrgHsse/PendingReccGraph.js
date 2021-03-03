import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js";
import "chartjs-plugin-datalabels";

const PendingRecGraph = (props) => {
  const chartContainer = useRef("barGraph");
  const [chartInstance, setChartInstance] = useState(null);
  // let dataset = [{}];
  // let aboveTargetArray = [];
  // let belowTargetArray = [];
  // let productNames = [];

  // const prepareGraphData = (graphData) => {
  //   graphData.map((item, index) => {
  //     aboveTargetArray.push(item.above_target);
  //     belowTargetArray.push(item.below_target);
  //     productNames.push(item.product);
  //     return;
  //   });
  // }

  useEffect(() => {
    // prepareGraphData(props.graphData);
    let fy17 = [150, 150, 100, 100];
    let fy18 = [100, 90, 150, 120];
    let fy19 = [130, 110, 150, 140];
    let totalData = fy17.map((item, index) => {
      return item + fy18[index] + fy19[index];
    })

    if (chartInstance) {
      chartInstance.destroy();
    }

    const ctx = chartContainer.current.getContext("2d");
    let chartConfig = {
      type: 'bar',
      data: {
        // labels: productNames,
        labels: ["ESA", "ESA", "ISA", "ISA",],
        datasets: [
          {
            label: "FY17",
            backgroundColor: ["#019577", "#0279e0", "#019577", "#0279e0"],
            data: fy17,
            // data: aboveTargetArray,
            categoryPercentage: 1,
            barPercentage: 0.7,
            datalabels: {
              color: "#fafafa",
              anchor: "center",
              fontSize: "22",
              formatter: function (value, context) {
                return `FY 17`
              },
            }
          },
          {
            label: "FY18",
            backgroundColor: ["#04caa6", "#00b0e2", "#04caa6", "#00b0e2"],
            data: fy18,
            // data: belowTargetArray,
            categoryPercentage: 1,
            barPercentage: 0.7,
            datalabels: {
              color: "#fafafa",
              anchor: "center",
              fontSize: "22",
              formatter: function (value, context) {
                return `FY 18`
              },
            }
          },
          {
            label: "FY19",
            backgroundColor: ["#63e1cb", "#69d5f5", "#63e1cb", "#69d5f5"],
            data: fy19,
            // data: belowTargetArray,
            categoryPercentage: 1,
            barPercentage: 0.7,
            datalabels: {
              color: "#fafafa",
              anchor: "center",
              fontSize: "22",
              formatter: function (value, context) {
                return `FY 19`
              },
            }
          },
          {
            label: "Total",
            backgroundColor: "transparent",
            data: totalData,
            datalabels: {
              color: "#fafafa",
              anchor: 'start',
              align : 'end',
              font : {
                size : 18,
              },
            },
          },

        ],
      },
      options: {
        legend: {
          display: false,
          // align: "start",
          // labels: {
          //   fontSize: 22,
          //   fontColor: "#8fa9db",
          //   boxWidth: 24
          // }
        },
        layout: {
          padding: {
            left: 20
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              stacked: true,
              gridLines: {
                display: false,
              },
              ticks: {
                fontColor: "#dee5ef",
                fontSize: "22",
              }
            }
          ],
          yAxes: [
            {
              stacked: true,
              gridLines: {
                display: false,
              },
              ticks: {
                padding: 5,
                fontColor: "#dee5ef",
                fontSize: "22",
                min : 0,
                max : 500,
                stepSize : 100
              }

            }
          ]
        },
        /*animation: {
          duration: 1,
          onComplete: function() {
            var chartInstancee = this.chart,
              ctx = chartInstancee.ctx;
    
            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
    
            this.data.datasets.forEach(function(dataset, i) {
              var meta = chartInstancee.controller.getDatasetMeta(i);
              meta.data.forEach(function(bar, index) {
                if (dataset.data[index] > 0) {
                  var data = dataset.data[index];
                  ctx.font = "14px Arial";
                  ctx.fillText(data, bar._model.x, bar._model.y);
                  ctx.fillStyle = '#fff';
                }
              });
            });
          }
        }*/
      },
    };

    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(ctx, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer, props.graphData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <canvas
      ref={chartContainer}
    />
  );
}

export default PendingRecGraph;
