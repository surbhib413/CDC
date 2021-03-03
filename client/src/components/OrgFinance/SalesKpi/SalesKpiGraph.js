import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
import 'chartjs-plugin-datalabels';

Chart.defaults.global.defaultFontFamily = "Titillium Web";

function SalesKpiGraph(props) {

    const chartContainer = useRef("barGraph");
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        let xTicks = ["Q1", "Q2", "Q3", "Q4"];
        
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
                        label: "Domestic",
                        //data: [20, 50, 30, 69],
                        data : [1, 4, 3, 8],
                        //data: ioclArray,
                        pointBorderWidth: 4,
                        pointBackgroundColor: "#04caa6",
                        pointBorderColor: "#04caa6",
                        borderColor: "#04caa6",
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
                        label: "Export",
                        //data: [60, 70, 80, 90],
                        data : [3, 4.2, 3.8, 4.5 ],
                        //data: hpclArray,
                        pointBorderWidth: 4,
                        pointBackgroundColor: "#6949ba",
                        pointBorderColor: "#6949ba",
                        borderColor: "#6949ba",
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
                        label: "Total",
                        fillColor: "#b76df1",
                        //data: shellArray,
                        //data: [50, 30, 60, 90],
                        data : [5.8, 3.8, 6, 2],
                        pointBorderWidth: 4,
                        pointBackgroundColor: "#24a9d9",
                        pointBorderColor: "#24a9d9",
                        borderColor: "#24a9d9",
                        backgroundColor: "#24a9d9",
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
                        beginAtZero: true,
                        scaleLabel: {
                            display: true,
                            labelString: '$/bbl',
                            fontColor: "#dee5ef",
                            fontSize: "20",
                          },
                        ticks: {
                            display: true,
                            padding: 20,
                            fontColor: "#dee5ef",
                            fontSize: "20",
                            beginAtZero: true,
                            min : 0,
                            max : 8,
                            stepSize : 2
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
    }, [props.graphData, props.publicVar, props.privateVar, props.bothVar]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <canvas
            ref={chartContainer}
        />
    )
}
export default SalesKpiGraph;