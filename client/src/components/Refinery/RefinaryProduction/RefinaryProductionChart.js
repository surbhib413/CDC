import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
import 'chartjs-plugin-datalabels';
import styles from "./RefinaryProductionChart.module.scss";

Chart.defaults.global.defaultFontFamily = "Titillium Web";

function RefinaryProductionChart(props) {

  const chartContainer = useRef("barGraph");
  const [chartInstance, setChartInstance] = useState(null);

  const [lastItem, setLastItem] = useState({});
  
  useEffect(() => {
    let actualArray = [];
    let targetArray = []
    let targetLabelArray = []
  
    const xLabels = ["MS", "Diesel", "LPG", "ATF", "LOBS", "Petchem"]
    let xTicks = [];
  
  
    function prepareGraphData(apiGraphData) {
  
      apiGraphData.forEach((item, index) => {
        actualArray.push(item.actual);
        targetArray.push(item.target);
        // targetArray.push(((item.target - item.actual) < 0) ? 0 : (item.target - item.actual));
        targetLabelArray.push(item.target)
  
      })
      xTicks = xLabels.slice(0, apiGraphData.length)
      let lastItem = apiGraphData[apiGraphData.length - 1]
      lastItem && setLastItem(lastItem);
    }

    prepareGraphData(props.graphData);
    if (chartInstance) {
      chartInstance.destroy()
    }

    const ctx = chartContainer.current.getContext("2d");
    let gradientMumbai = ctx.createLinearGradient(0, 0, 500, 0);
    gradientMumbai.addColorStop(0, '#1f47ac');
    gradientMumbai.addColorStop(1, '#0897c9');

    let gradientKochi = ctx.createLinearGradient(-100, 0, 500, 0);
    gradientKochi.addColorStop(1, '#9150c8');
    gradientKochi.addColorStop(0, '#28104e');

    let gradientGrm = ""
    let targetBackgroundColor = "";

    ////SET COLORS ACCORDING TO LOCATION
    if (props.location === "mumbai") {
      gradientGrm = gradientMumbai;
      targetBackgroundColor = "rgb(13, 105, 172, 0.4)";
    }
    if (props.location === "kochi") {
      gradientGrm = gradientKochi
      targetBackgroundColor = "rgb(98, 55, 160, 0.4)";
    }


    // const ctx = chartContainer.current.getContext("2d");

    // let gradientMumbai1 = ctx.createLinearGradient(0, 0, 400, 0);
    // gradientMumbai1.addColorStop(0, '#1f47ac');
    // gradientMumbai1.addColorStop(1, '#0897c9');

    // let gradient2 = ctx.createLinearGradient(300, 0, 400, 0);
    // gradient2.addColorStop(1, '#a2a2a2');
    // gradient2.addColorStop(0, '#646363');

    // let gradientKochi1 = ctx.createLinearGradient(0, 0, 400, 0);
    // gradientKochi1.addColorStop(1, '#b76df1');
    // gradientKochi1.addColorStop(0, '#28104e');

    // let gradient1 = ""
    // ////SET COLORS ACCORDING TO LOCATION
    // if (props.location === "mumbai") {
    //   gradient1 = gradientMumbai1;
    // }
    // if (props.location === "kochi") {
    //   gradient1 = gradientKochi1
    //   // gradient2 = gradientKochi2
    // }

    const chartConfig = {
      type: "horizontalBar",
      data: {
        labels: xTicks,
        datasets: [
          {
            yAxisID: "bar-x-axis1",
            categoryPercentage: 1,
            barPercentage: 0.2,
            label: "Actual",
            backgroundColor: gradientGrm,
            data: actualArray,
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
            yAxisID: "bar-x-axis2",
            categoryPercentage: 0.7,
            label: "Target",
            data: targetArray,
            backgroundColor: targetBackgroundColor,
            borderWidth: 0,
            datalabels: {
              display: false,
            },
          },
        ]
      },
      options: {
        layout: {
          padding: {
            right: 30,
          }
        },
        // barRoundness: 1,
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              beginAtZero: true,
              ticks: {
                beginAtZero: true,
                display: false,
                padding: 20,
                fontColor: "#dee5ef",
                fontSize: "20",
              },
              gridLines: {

                color: "transparent",
                tickMarkLength: 0,
                zeroLineColor: "#67758d",
                zeroLineWidth: 1
              }
            },
          ],

          yAxes: [

            {

              id: "bar-x-axis1",
              // stacked: true,
              display: true,
              offset: true,
              type: 'category',
              // stacked: true,
              // offset: true,
              // type: 'category',
              gridLines: {
                display: false,
                drawBorder: true,
                color: "#67758d",
                // offsetGidLines: true,
                tickMarkLength: 0,
                borderDash: [3],
              },
              ticks: {

                padding: 9,
                fontColor: "#dee5ef",
                fontSize: "22",
              },
            },
            {
              display: false,
              offset: true,
              id: "bar-x-axis2",
              type: 'category',
              // stacked: true,
              // offset: true,
              // type: 'category',
              gridLines: {
                drawBorder: true,
                color: "#67758d",
                // offsetGidLines: true,
                tickMarkLength: 0,
                borderDash: [3],
              },
              ticks: {
                padding: 9,
                fontColor: "#dee5ef",
                fontSize: "22",
              },
            },
          ]

        },
        legend: {
          display: false
        }
      },
      // plugins: [{
      //   afterUpdate: function (chart) {
      //     for (let i in chart.config.data.datasets) {
      //       let dataset = chart.config.data.datasets[i];
      //       if (dataset.label === "Actual") {
      //         for (let j = chart.config.data.datasets[i].data.length - 1; j >= 0; --j) {
      //           let model = chart.getDatasetMeta(i).data[j]._model;
      //           let start = model.x;
      //           let end = model.x + dataset.data[0];
      //           let gradient = ctx.createLinearGradient(start + 10, 0, end - 150, 0);
      //           gradient.addColorStop(1, "#1f47ac");
      //           gradient.addColorStop(0, "#0897c9");

      //           let gradientKochi = ctx.createLinearGradient(start + 200, 0, end - 350, 0);
      //           gradientKochi.addColorStop(0, "#b76df1");
      //           gradientKochi.addColorStop(1, "#28104e");

      //           if (props.location === "mumbai") {
      //             model.backgroundColor = gradient;
      //           } else if (props.location === "kochi") {
      //             model.backgroundColor = gradientKochi;
      //           }
      //         }
      //       }
      //       else {
      //         for (let j = chart.config.data.datasets[i].data.length - 1; j >= 0; --j) {
      //           let model = chart.getDatasetMeta(i).data[j]._model;
      //           // console.log("MODEL", model);
      //           let start = model.x;
      //           let end = model.x;
      //           let gradient = ctx.createLinearGradient(start, 0, end - 120, 0);
      //           gradient.addColorStop(0, "#a2a2a2");
      //           gradient.addColorStop(1, "#646363");
      //           //console.log("dataset.backgroundColor[j]",model.backgroundColor);
      //           model.backgroundColor = gradient;
      //         }
      //       }
      //     }
      //   }


      // }]
    }

    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(ctx, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer, props.graphData, props.location]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`flex-grow-1 ${styles.graphContainer}`}>
      <div className={`d-flex justify-content-between align-items-center ${styles.legendsContainer}`}>
        <div className={`${styles.leftLegend}`} >
          <div className={`d-flex align-items-center mt-1 ${styles.actual}`}>
            <span className={`mr-2 ${props.location === "mumbai" ? styles.actualMumbaiDot : styles.actualKochiDot}`} ></span>Actual: {lastItem.actual} {lastItem.unit}
          </div>
          <div className={`d-flex align-items-center mt-3 ${styles.target}`}>
            <span className={`mr-2 ${props.location === "mumbai" ? styles.targetMumbaiDot : styles.targetKochiDot}`} ></span>Target: {lastItem.target} {lastItem.unit}
          </div>
        </div>
      </div>

      <div className={`${styles.grmGraph}`}>
        <canvas
          ref={chartContainer}
        />
      </div>
    </div>
  )
}
export default RefinaryProductionChart;