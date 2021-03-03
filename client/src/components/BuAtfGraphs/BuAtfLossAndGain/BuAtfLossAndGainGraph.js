import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
import 'chartjs-plugin-datalabels';
import styles from "./BuAtfLossAndGainGraph.module.scss";

Chart.defaults.global.defaultFontFamily = "Titillium Web";

function BuLossAndGainGraph(props) {

    const chartContainer = useRef("barGraph");
    const [chartInstance, setChartInstance] = useState(null);
    
    useEffect(() => {
      let actualArray = [];
      let xTicks = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]
  
      const prepareGraphData = (apiGraphData) => {
          apiGraphData.forEach((item, index) => {
              actualArray.push(item.actual);
          });
      }
        prepareGraphData(props.graphData);
        if (chartInstance) {
            chartInstance.destroy()
        }

        const ctx = chartContainer.current.getContext("2d");
        let blendingGradient = ctx.createLinearGradient(0, 0, 0, 20);
        blendingGradient.addColorStop(0, '#00a8ec');
        blendingGradient.addColorStop(1, '#00e0bc');

        let bulkGradient = ctx.createLinearGradient(0, 0, 0, 20);
        bulkGradient.addColorStop(0, '#fde093');
        bulkGradient.addColorStop(1, '#fabd5a');

        let financialGradient = ctx.createLinearGradient(0, 0, 0, 20);
        financialGradient.addColorStop(0, '#ff91bf');
        financialGradient.addColorStop(1, '#ff588b');

        let packingGradient = ctx.createLinearGradient(0, 0, 0, 20);
        packingGradient.addColorStop(0, '#b4ec51');
        packingGradient.addColorStop(1, '#65ce3a');

        const chartConfig = {
            type: "line",
            data: {
                // fill: false,
                labels: xTicks,
                datasets: [
                    {
                        fill: false,
                        label: "Target",
                        data: actualArray,
                        pointRadius: 5,
                        pointBorderWidth: 0,
                        // pointBackgroundColor: blendingGradient,
                        // pointBorderColor: "#ff588b",
                        borderColor: "rgba(0, 199, 236,0.5)",
                        borderWidth: 4,
                        pointBackgroundColor: blendingGradient && function (item) {
                            if (item.dataset.data[item.dataIndex] >= 0) {
                                item.dataset.pointBackgroundColor[item.dataIndex] = "#65ce3a";
                                return "#65ce3a";
                            } else {
                                item.dataset.pointBackgroundColor[item.dataIndex] = "#e60000";
                                return "#e60000";
                            }
                        },
                        pointBorderColor: function (item) {
                            if (item.dataset.data[item.dataIndex] >= 0) {
                                item.dataset.pointBorderColor[item.dataIndex] = "#65ce3a";
                                return "#65ce3a";
                            } else {
                                item.dataset.pointBorderColor[item.dataIndex] = "#e60000";
                                return "#e60000";
                            }
                        },
                        datalabels: {
                            display: false,
                        },
                    },
                ]
            },
            options: {
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
                                // color: "#67758d",
                                // offsetGidLines: true,
                                // tickMarkLength: 0,
                                // // zeroLineBorderDash: [3],
                                // // zeroLineColor: "#67758d",
                                // // zeroLineWidth: 1,
                                // borderDash: [3],

                                color: "#67758d",
                                offsetGidLines: true,
                                tickMarkLength: 0,
                                // zeroLineBorderDash: [3],
                                zeroLineColor: "#67758d",
                                zeroLineWidth: 1,
                                // borderDash: [3],
                            },
                            ticks: {
                                display: true,
                                padding: 9,
                                fontColor: "#dee5ef",
                                fontSize: "22",
                                beginAtZero: true
                            },
                        },
                    ],

                    yAxes: [{
                        beginAtZero: true,
                        ticks: {
                            display: true,
                            padding: 20,
                            fontColor: "#dee5ef",
                            fontSize: "20",
                            beginAtZero: true
                        },
                        gridLines: {
                            color: "#67758d",
                            offsetGidLines: true,
                            tickMarkLength: 0,
                            // zeroLineBorderDash: [3],
                            zeroLineColor: "#67758d",
                            zeroLineWidth: 1,
                            // borderDash: [3],
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
export default BuLossAndGainGraph;