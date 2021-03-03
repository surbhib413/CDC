import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
import 'chartjs-plugin-datalabels';
import styles from "./BuIncCcs.module.scss";

Chart.defaults.global.defaultFontFamily = "Titillium Web";

function BuIncCcsPieChart(props) {

  const chartContainer = useRef("barGraph");
  const [chartInstance, setChartInstance] = useState(null);


  useEffect(() => {
    let actualArray = [];

    function prepareGraphData(apiGraphData) {
      apiGraphData.forEach((item, index) => {
        actualArray.push(item.resolved_cases);
      });
    }
    prepareGraphData(props.graphData);

    if (chartInstance) {
      chartInstance.destroy()
    }

    const ctx = chartContainer.current.getContext("2d");

    let lessThanTwoGrad = ctx.createLinearGradient(0, 0, 0, 500);
    lessThanTwoGrad.addColorStop(1, '#00a8ec');//dark blue
    lessThanTwoGrad.addColorStop(0, '#00e0bc');

    let twoToFiveGrad = ctx.createLinearGradient(0, 0, 0, 500);
    twoToFiveGrad.addColorStop(0, '#ffbf45');//green
    twoToFiveGrad.addColorStop(1, '#ff8309');

    let sixToTenGrad = ctx.createLinearGradient(0, 0, 0, 500);
    sixToTenGrad.addColorStop(0, '#ff7bda');//purple
    sixToTenGrad.addColorStop(1, '#e640b7');

    let moreThanTenGrad = ctx.createLinearGradient(0, 0, 0, 500);
    moreThanTenGrad.addColorStop(0, '#ff588c');//pink
    moreThanTenGrad.addColorStop(1, '#fac159');

    const chartConfig = {
      type: "pie",
      data: {
        datasets: [
          // {
          //   label: ["One", "two", "three"],
          //   data: [125, 80, 80, 110],
          //   datalabels: {
          //     display: false,
          //     // font: {
          //     //   size: 25,
          //     // },
          //     // color: "white"
          //   },
          //   backgroundColor: ["#a241f7", "transparent", "transparent", "transparent"],
          //   borderWidth: [0, 2, 2, 2],
          //   borderColor: ["a241f7", "#202c3f", "#202c3f", "#202c3f"],

          //   // borderColor: "#a241f7",
          //   hoverBorderWidth: 0,
          //   hoverBorderColor: ["#a241f7", "transparent", "transparent", "transparent"],

          //   hoverBackgroundColor: ["#a241f7", "transparent", "transparent", "transparent"],
          // },
          {
            label: ["One", "two", "three"],
            data: actualArray,
            datalabels: {
              anchor: "center",
              align: 'center',
              font: {
                size: 25,
              },
              color: "white"
            },
            //backgroundColor: ["#00a8ec", "#ffbf45", "#ff7bda", "#ff588c"],
            backgroundColor: [lessThanTwoGrad, twoToFiveGrad, sixToTenGrad, moreThanTenGrad],
            borderWidth: 0,
            // borderWidth: [0, 2, 2, 2],
            borderColor: "#202c3f",
            // borderColor: ["00e0bc", "#202c3f", "#202c3f", "#202c3f"],
            weight: 4,
            hoverBorderWidth: 0,
            hoverBorderColor: [lessThanTwoGrad, twoToFiveGrad, sixToTenGrad, moreThanTenGrad],
            hoverBackgroundColor: [lessThanTwoGrad, twoToFiveGrad, sixToTenGrad, moreThanTenGrad]
          },

        ]
      },
      options: {
        layout: {
          padding: {
            left: 30,
            right: 30,
            top: 30,
            bottom: 30
          }
        },
        elements: {
          arc: {
            borderWidth: 0
          }
        },
        rotation: -1,
        responsive: true,
        maintainAspectRatio: false,
      },
      plugins: [{
        afterUpdate: function (chart) {
          let maxNo = 0;
          let maxNoIndex = 0;
          for (let i in chart.config.data.datasets) {
            let dataset = chart.config.data.datasets[i];
            maxNo = Math.max(...dataset.data);
            maxNoIndex = dataset.data.indexOf(maxNo);

            for (let j = chart.config.data.datasets[i].data.length - 1; j >= 0; --j) {
              // let model = chart.getDatasetMeta(i).data[j]._model;
              if (j === maxNoIndex) {
                chart.getDatasetMeta(i).data[maxNoIndex]._model.outerRadius = chart.outerRadius + 30;
              }
            }
          }
        },
      }],
      legend: {
        display: false
      },
    }

    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(ctx, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer, props.graphData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`${styles.graph}`}>
      <canvas
        ref={chartContainer}
        height="450"
        width="450"
      />
    </div>
  )
}
export default BuIncCcsPieChart;