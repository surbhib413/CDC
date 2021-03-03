import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
import 'chartjs-plugin-datalabels';
import styles from "./ForeignCurrency.module.scss";

Chart.defaults.global.defaultFontFamily = "Titillium Web";

function ForeignCurrencyGraph(props) {
    const chartContainer = useRef("barGraph");
    const [chartInstance, setChartInstance] = useState(null);

    //const xLabels = ["0", "5", "10", "15", "20", "25", "30"]
    //let avgValue = 0;

    // function prepareGraphData(apiGraphData) {
    //     let count = apiGraphData.length;
    //     let total = 0;
    //     apiGraphData.map((item, index) => {
    //         total += item;
    //     })
    //     avgValue = total / count;
    // }

    useEffect(() => {
        // prepareGraphData(props.oceanLossData);
        if (chartInstance) {
            chartInstance.destroy()
        }

        const ctx = chartContainer.current.getContext("2d");

        // let avgColor = "";
        // //SET COLORS ACCORDING TO LOCATION
        // if (props.location === "mumbai") {
        //     avgColor = "#06bee1";
        // }
        // if (props.location === "kochi") {
        //     avgColor = "#b76df1";
        // }

        const chartConfig = {
            type: "line",
            data: {
                //labels: [0, 5, 10, 15, 20, 25, 30],
                labels: [0, 3, 6, 9, 12],
                datasets: [
                    {
                        borderColor: "#04caa6",
                        pointBorderWidth: 4,
                        pointBackgroundColor: "#04caa6",
                        pointBorderColor: "#04caa6",
                        borderWidth: 4,
                        label: "Actual",
                        //data: [150, 100, 180, 200, 120, 300, 150],
                        data: [150, 100, 180, 200, 120],
                        fill: false,
                        // backgroundColor: "rgb(222, 172, 245)",
                        datalabels: {
                            display: false,
                        },
                    },
                    {
                        borderColor: "#2281e8",
                        pointBorderWidth: 4,
                        pointBackgroundColor: "#2281e8",
                        pointBorderColor: "#2281e8",
                        borderWidth: 4,
                        label: "Actual",
                        //data: [210, 210, 260, 320, 300, 380, 300],
                        data: [210, 210, 260, 320, 300],
                        fill: false,
                        // backgroundColor: "rgb(222, 172, 245)",
                        datalabels: {
                            display: false,
                        },
                    },
                    {
                        borderColor: "#ffbf45",
                        pointBorderWidth: 4,
                        pointBackgroundColor: "#ffbf45",
                        pointBorderColor: "#ffbf45",
                        borderWidth: 4,
                        label: "Actual",
                        //data: [380, 320, 400, 420, 400, 450, 380],
                        data: [380, 320, 400, 420, 400],
                        fill: false,
                        // backgroundColor: "rgb(222, 172, 245)",
                        datalabels: {
                            display: false,
                        },
                    },
                ]
            },
            options: {
                // barRoundness: 1,
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [
                        {
                            display: true,
                            gridLines: {
                                color: "#2f3b51",
                                offsetGidLines: true,
                                tickMarkLength: 0,
                            },
                            ticks: {
                                display: true,
                                padding: 9,
                                fontColor: "#dee5ef",
                                fontSize: "20",
                            },
                        },
                    ],

                    yAxes: [
                        {
                            beginAtZero: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'INR (Cr)',
                                fontColor: "#dee5ef",
                                fontSize: "20",
                              },
                            ticks: {
                                beginAtZero: true,
                                display: true,
                                padding: 20,
                                fontColor: "#dee5ef",
                                fontSize: "20",
                                min : 0,
                                max : 500,
                                stepSize : 100
                            },
                            gridLines: {
                                color: "#2f3b51",
                                tickMarkLength: 0,
                                zeroLineColor: "transparent",
                                zeroLineWidth: 1
                            }
                        },
                    ]
                },
                legend: {
                    display: false
                },
            }
        }

        if (chartContainer && chartContainer.current) {
            const newChartInstance = new Chart(ctx, chartConfig);
            setChartInstance(newChartInstance);
        }
    }, [chartContainer, props.location]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={`${styles.grmGraph}`}>
            <canvas
                ref={chartContainer}
            />
        </div>
    )
}
export default ForeignCurrencyGraph;