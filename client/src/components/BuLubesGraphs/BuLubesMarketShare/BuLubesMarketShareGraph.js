import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
import 'chartjs-plugin-datalabels';
import styles from "./BuLubesMarketShareGraph.module.scss";


Chart.defaults.global.defaultFontFamily = "Titillium Web";

function BuLubesMarketShareGraph(props) {

    const chartContainer = useRef("barGraph");
    const [chartInstance, setChartInstance] = useState(null);

    
    useEffect(() => {
      let bpclArray = [];
      let hpclArray = [];
      let ioclArray = [];
      let shellArray = [];
      let bpclTargetArray = [];
  
    //   const xLabels = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
      let xTicks = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]
  
  
  
      function prepareGraphData(apiGraphData) {
          apiGraphData.forEach((item, index) => {
              ioclArray.push(item.iocl);
              hpclArray.push(item.hpcl);
              shellArray.push(item.shell);
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
                        // data: [60, 70, 80, 90, 42, 39, 87, 55, 76, 30, 80, 50],
                        data: ioclArray,
                        pointBorderWidth: 4,
                        pointBackgroundColor: "#00f2bf",
                        pointBorderColor: "#00f2bf",
                        borderColor: "#00f2bf",
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
                        pointBackgroundColor: "#00d3f7",
                        pointBorderColor: "#00d3f7",
                        borderColor: "#00d3f7",
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
                        label: "Actual",
                        fillColor: "#b76df1",
                        data: shellArray,
                        pointBorderWidth: 4,
                        pointBackgroundColor: "#fd797c",
                        pointBorderColor: "#fd797c",
                        borderColor: "#fd797c",
                        borderWidth: 4,
                        datalabels: {
                            display: false,
                            align: 'top',
                            color: "#dee5ef",
                            font: {
                                size: 20
                            }
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
                    // {
                    //     label: "Actual",
                    //     data: [30,60,50,20, 60, 50, 90, 35,45,78, 29, 10],
                    //     pointBorderWidth: 4,
                    //     pointBackgroundColor: "#00a8ec",
                    //     pointBorderColor: "#00a8ec",
                    //     borderColor: "#00a8ec",
                    //     borderWidth: 3,
                    //     datalabels: {
                    //         align: 'top',
                    //         color: "#dee5ef",
                    //         font: {
                    //             size: 20
                    //         }
                    //     },
                    // },
                    // {
                    //     label: "Actual",
                    //     data: [30,60,50,20, 60, 50, 90, 35,45,78, 29, 10],
                    //     pointBorderWidth: 4,
                    //     pointBackgroundColor: "#00e0bc",
                    //     pointBorderColor: "#00e0bc",
                    //     borderColor: "#00e0bc",
                    //     borderWidth: 3,
                    //     datalabels: {
                    //         align: 'top',
                    //         color: "#dee5ef",
                    //         font: {
                    //             size: 20
                    //         }
                    //     },
                    // },
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
export default BuLubesMarketShareGraph;