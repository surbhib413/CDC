import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js";
import "chartjs-plugin-datalabels";
import styles from "./DistillateYieldChart.module.scss";

function DistillateYieldChart(props) {
  const chartContainer = useRef("barGraph");
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    let ytmArray = [];
  let mtdArray = [];

  function prepareYtmGraphData(data) {
    data.forEach((item, index) => {
      ytmArray.push(item.actual);
      ytmArray.push(item.target - item.actual);
      ytmArray.push(100 - item.target);
    });
  }

  function prepareMtdGraphData(data) {
    data.forEach((item, index) => {
      mtdArray.push(item.actual);
      mtdArray.push(item.target - item.actual);
      mtdArray.push(100 - item.target);
    });
  }
    // console.log("graph data monthly", props.ytmGraphData);
    // console.log("graph data day", props.mtdGraphData);

    prepareYtmGraphData(props.ytmGraphData);
    prepareMtdGraphData(props.mtdGraphData);

    if (chartInstance) {
      chartInstance.destroy();
    }

    const ctx = chartContainer.current.getContext("2d");

    const radialGradientMumbai1 = ctx.createRadialGradient(
      115,
      95,
      30,
      270,
      80,
      280
    );
    radialGradientMumbai1.addColorStop(1, "#18c3cf");
    radialGradientMumbai1.addColorStop(0, "#0394ae");
    const radialGradientMumbai2 = ctx.createRadialGradient(
      115,
      95,
      30,
      250,
      100,
      280
    );
    radialGradientMumbai2.addColorStop(1, "#007fff");
    radialGradientMumbai2.addColorStop(0, "#003087");

    const radialGradientGray = ctx.createRadialGradient(
      115,
      95,
      30,
      270,
      100,
      280
    );
    radialGradientGray.addColorStop(1, "#565454");
    radialGradientGray.addColorStop(0, "#d0cfcf");

    const radialGradientKochi1 = ctx.createRadialGradient(
      115,
      95,
      30,
      240,
      100,
      280
    );
    radialGradientKochi1.addColorStop(1, "#deacf5");
    radialGradientKochi1.addColorStop(0, "#9952d1");
    const radialGradientKochi2 = ctx.createRadialGradient(
      115,
      95,
      30,
      210,
      100,
      280
    );
    radialGradientKochi2.addColorStop(1, "#b76df1");
    radialGradientKochi2.addColorStop(0, "#4f2f89");

    let radialGradient1 = "";
    let radialGradient2 = "";
    if (props.location === "mumbai") {
      radialGradient1 = radialGradientMumbai1;
      radialGradient2 = radialGradientMumbai2;
    }
    if (props.location === "kochi") {
      radialGradient1 = radialGradientKochi1;
      radialGradient2 = radialGradientKochi2;
    }

    const chartConfig = {
      type: "doughnut",
      data: {
        datasets: [
          {
            datalabels: {
              color: ["white", "white", "rgba(0,0,0,0)"],
              anchor: "center",
              align: "center",
              font: {
                weight: "bold",
                size: 20
              },
              formatter: function(value, context) {
                if (context.dataIndex === 1) {
                  value =
                    context.dataset.data[context.dataIndex - 1] +
                    context.dataset.data[context.dataIndex];
                }
                return value;
              }
            },
            pointRadius: 0,
            //data: [60, 25, 20],
            data: ytmArray,
            label: ["First", "Second", "Third"],
            backgroundColor: [
              radialGradient1,
              radialGradientGray,
              "rgba(1,1,1,0)"
            ],
            borderWidth: 0
          },
          {
            datalabels: {
              display: false
            },
            data: [56, 15],
            backgroundColor: ["rgba(0,0,0,0)", "rgba(0,0,0,0)"],
            borderWidth: [0, 0]
          },
          {
            datalabels: {
              color: ["white", "white", "rgba(0,0,0,0)"],
              anchor: "center",
              align: "center",
              font: {
                weight: "bold",
                size: 20
              },
              formatter: function(value, context) {
                if (context.dataIndex === 1) {
                  value =
                    context.dataset.data[context.dataIndex - 1] +
                    context.dataset.data[context.dataIndex];
                }
                return value;
              }
            },
            data: mtdArray,
            backgroundColor: [
              radialGradient2,
              radialGradientGray,
              "rgba(1,1,1,0)"
            ],
            borderWidth: 0
          }
        ],
        labels: ["Africa", "Asia"]
      },
      options: {
        maintainAspectRatio: false,
        rotation: 135,
        gridLines: {
          display: true,
          circular: true,
          // lineWidth: 2,
          color: "white"
        },
        scales: [{}],
        responsive: true,
        elements: {
          arc: {
            borderWidth: 0
          }
        },
        cutoutPercentage: 50,
        animation: {
          animationRotate: false,
          duration: 3000
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      },
      plugins: [
        {
          datalabels: {
            color: "blue",
            labels: {
              title: {
                font: {
                  weight: "bold"
                }
              },
              value: {
                color: "white"
              }
            }
          },

        //   afterUpdate: function(chart) {
        //     let a = chart.config.data.datasets.length - 1;
        //     for (let i in chart.config.data.datasets) {
        //       for (
        //         let j = chart.config.data.datasets[i].data.length - 1;
        //         j >= 0;
        //         --j
        //       ) {
        //         if (Number(j) === chart.config.data.datasets[i].data.length - 1)
        //           continue;
        //         let arc = chart.getDatasetMeta(i).data[j];
        //         arc.round = {
        //           x: (chart.chartArea.left + chart.chartArea.right) / 2,
        //           y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
        //           radius:
        //             chart.innerRadius +
        //             chart.radiusLength / 2 +
        //             a * chart.radiusLength,
        //           thickness: chart.radiusLength / 2 - 1,
        //           backgroundColor: arc._model.backgroundColor
        //         };
        //       }
        //       a--;
        //     }
        //   },

        //   afterDraw: function(chart) {
        //     let ctx = chart.chart.ctx;
        //     for (let i in chart.config.data.datasets) {
        //       for (
        //         let j = chart.config.data.datasets[i].data.length - 1;
        //         j >= 0;
        //         --j
        //       ) {
        //         if (Number(j) === chart.config.data.datasets[i].data.length - 1)
        //           continue;
        //         let arc = chart.getDatasetMeta(i).data[j];
        //         let startAngle = Math.PI / 2 - arc._view.startAngle;
        //         let endAngle = Math.PI / 2 - arc._view.endAngle;

        //         ctx.save();
        //         ctx.translate(arc.round.x, arc.round.y);
        //         ctx.fillStyle = arc.round.backgroundColor;
        //         ctx.beginPath();
        //         ctx.arc(
        //           arc.round.radius * Math.sin(startAngle),
        //           arc.round.radius * Math.cos(startAngle),
        //           arc.round.thickness,
        //           0,
        //           2 * Math.PI
        //         );
        //         ctx.arc(
        //           arc.round.radius * Math.sin(endAngle),
        //           arc.round.radius * Math.cos(endAngle),
        //           arc.round.thickness,
        //           0,
        //           2 * Math.PI
        //         );
        //         ctx.closePath();
        //         ctx.fill();
        //         ctx.restore();
        //       }
        //     }
        //   }
         }
      ]
    };
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(ctx, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [props.ytmGraphData, props.mtdGraphData, props.location]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`flex-grow-1 ${styles.graphContainer}`}>
      <div
        className={`d-flex justify-content-between align-items-center ${styles.legendsContainer}`}
      >
        <div className={`${styles.leftLegend}`}>
          <div
            className={`d-flex align-items-center mt-1 ${
              props.location === "mumbai"
                ? styles.actualMumbai
                : styles.actualKochi
            }`}
          >
            MTD: 72%
          </div>
          <div className={`d-flex align-items-center mt-3 ${styles.target}`}>
            Target MTD: 90%
          </div>
        </div>
        <div
          className={`d-flex flex-column align-items-end ${styles.rightLegend}`}
        >
          <span
            className={`d-flex align-items-center mt-1 ${
              props.location === "mumbai"
                ? styles.actualMumbai
                : styles.actualKochi
            }`}
          >
            YTM: 82%
          </span>
          <span className={`d-flex align-items-center mt-3 ${styles.target}`}>
            Target YTM: 95%
          </span>
        </div>
      </div>
      <div className={`my-4 ${styles.grmGraph}`}>
        {/* <canvas ref={chartContainer} /> */}
        <canvas ref={chartContainer} height='300'/>
      </div>
    </div>
  );
}

export default DistillateYieldChart;
