import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
import 'chartjs-plugin-datalabels';
import styles from "./BuLpgCustPopulationGraph.module.scss";


Chart.defaults.global.defaultFontFamily = "Titillium Web";

function BuLpgCustPopulationGraph(props) {

    const chartContainer = useRef("barGraph");
    const [chartInstance, setChartInstance] = useState(null);
    
    useEffect(() => {
      let bpclArray = [];
      let hpclArray = [];
      let ioclArray = [];
      let xTicks = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]
  
      const prepareGraphData = (apiGraphData) => {
          apiGraphData.forEach((item, index) => {
              ioclArray.push(item.iocl);
              hpclArray.push(item.hpcl);
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
                        pointBackgroundColor: "#ff588b",
                        pointBorderColor: "#ff588b",
                        borderColor: "#ff588b",
                        borderWidth: 2,
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
                        data: hpclArray,
                        pointBorderWidth: 4,
                        pointBackgroundColor: "#fabd5a",
                        pointBorderColor: "#fabd5a",
                        borderColor: "#fabd5a",
                        borderWidth: 2,
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
                        data: bpclArray,
                        pointBorderWidth: 4,
                        pointBackgroundColor: gradient,
                        pointBorderColor: gradient,
                        borderColor: gradient,
                        backgroundColor: gradient,
                        borderWidth: 2,
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
                ]
            },
            options: {
                // annotation: {
                //     annotations: [{
                //         type: 'line',
                //         mode: 'horizontal',
                //         scaleID: 'y-axis-0',
                //         value: 40,
                //         borderColor: "white",
                //         borderWidth: 2,
                //         borderDash: [3],
                //         label: {
                //             enabled: true,
                //             content: ''
                //         }
                //     }]
                // },
                elements: {
                    line: {
                        tension: 0
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
                            // tickMarkLength: 0,
                            // color: "transparent",
                            // zeroLineColor: "#67758d",
                            // zeroLineWidth: 2

                            color: "#67758d",
                            offsetGidLines: true,
                            tickMarkLength: 0,
                            zeroLineBorderDash: [3],
                            zeroLineColor: "#67758d",
                            zeroLineWidth: 1,
                            borderDash: [3],
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
export default BuLpgCustPopulationGraph;