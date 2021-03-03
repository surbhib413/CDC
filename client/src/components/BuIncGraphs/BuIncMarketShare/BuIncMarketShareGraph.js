import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
import 'chartjs-plugin-datalabels';
import styles from "./BuIncMarketShare.module.scss";

Chart.defaults.global.defaultFontFamily = "Titillium Web";

function BuIncMarketShareGraph(props) {
    const chartContainer = useRef("barGraph");
    const [chartInstance, setChartInstance] = useState(null);

    
    useEffect(() => {
      let bpclArray = [];
      let hpclArray = [];
      let ioclArray = [];
    //   let othersArray = [];
      let bpclTargetArray = [];
  
      let xTicks = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]
  
      function prepareGraphData(apiGraphData) {
          apiGraphData.forEach((item, index) => {
              ioclArray.push(item.iocl);
              hpclArray.push(item.hpcl);
              bpclTargetArray.push(item.bpcl_target);
              bpclArray.push(item.bpcl);
          });
      }
        prepareGraphData(props.graphData);
        if (chartInstance) {
            chartInstance.destroy()
        }

        const ctx = chartContainer.current.getContext("2d");
        let gradient = ctx.createLinearGradient(0, 0, 0, 450);
        gradient.addColorStop(1, 'rgba(0, 168, 236,0.3)');
        gradient.addColorStop(0, 'rgba(0, 224, 188,0.3)');

        const chartConfig = {
            type: "line",
            data: {
                fill: false,
                labels: xTicks,
                datasets: [
                    {
                        label: "Target",
                        data: ioclArray,
                        pointBorderWidth: 4,
                        pointBackgroundColor: "#ff91bf",
                        pointBorderColor: "#ff91bf",
                        borderColor: "#ff91bf",
                        borderWidth: 4,
                        // borderDash: [4],
                        datalabels: {
                            display: false,
                            // align: 'bottom',
                            // color: "rgb(161, 173, 187)",
                            // font: {
                            //   size: 20
                            // }
                        },
                    },

                    {
                        label: "Target",
                        // data: [60, 70, 80, 90, 42, 39, 87, 55, 76, 30, 80, 50],
                        data: hpclArray,
                        pointBorderWidth: 4,
                        pointBackgroundColor: "#fde093",
                        pointBorderColor: "#fde093",
                        borderColor: "#fde093",
                        borderWidth: 4,
                        //borderDash: [4],
                        datalabels: {
                            display: false,
                            // align: 'bottom',
                            // color: "rgb(161, 173, 187)",
                            // font: {
                            //   size: 20
                            // }
                        },
                    },
                    {
                        label: "Target",
                        // data: [60, 70, 80, 90, 42, 39, 87, 55, 76, 30, 80, 50],
                        data: bpclTargetArray,
                        pointBorderWidth: 4,
                        pointBackgroundColor: "white",
                        pointBorderColor: "white",
                        borderColor: "white",
                        borderWidth: 4,
                        borderDash: [4],
                        datalabels: {
                            display: false,
                            // align: 'bottom',
                            // color: "rgb(161, 173, 187)",
                            // font: {
                            //   size: 20
                            // }
                        },
                    },
                    {
                        label: "Actual",
                        data: bpclArray,
                        pointBorderWidth: 4,
                        backgroundColor: gradient,
                        pointBackgroundColor: gradient,
                        pointBorderColor: gradient,
                        borderColor: gradient,
                        borderWidth: 3,
                        datalabels: {
                            align: 'top',
                            color: "#dee5ef",
                            font: {
                                size: 20
                            }
                        },
                    },
                ]
            },
            options: {
                elements: {
                    line: {
                        tension: 0.5
                    }
                },
                layout: {
                    padding: {
                        top: 30,
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [
                        {
                            type: 'category',
                            gridLines: {
                                color: "#67758d",
                                offsetGidLines: true,
                                tickMarkLength: 0,
                                zeroLineBorderDash: [3],
                                zeroLineColor: "#67758d",
                                zeroLineWidth: 1,
                                borderDash: [3],
                            },
                            ticks: {
                                padding: 9,
                                fontColor: "#dee5ef",
                                fontSize: "22",
                            },
                        },
                    ],

                    yAxes: [{
                        ticks: {
                            display: true,
                            padding: 20,
                            fontColor: "#dee5ef",
                            fontSize: "20",
                        },
                        gridLines: {
                            tickMarkLength: 0,
                            color: "transparent",
                            zeroLineColor: "#67758d",
                            zeroLineWidth: 2
                        }
                    },
                    ]

                },
                legend: {
                    display: false
                }
            }
        }
        if (chartContainer && chartContainer.current) {
            const newChartInstance = new Chart(ctx, chartConfig);
            setChartInstance(newChartInstance);
        }
    }, [props.graphData]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={`${styles.grmGraph}`}>
            <canvas
                ref={chartContainer}
            />
        </div>
    )
}
export default BuIncMarketShareGraph;