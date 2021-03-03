import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
import 'chartjs-plugin-datalabels';
import styles from "./BuLpgInventoryPieChart.module.scss";
Chart.defaults.global.defaultFontFamily = "Titillium Web";

function BuLpgInventoryPieChart(props) {

    const chartContainer = useRef("barGraph");
    const [chartInstance, setChartInstance] = useState(null);
    
    useEffect(() => {
      let actualArray = [];
  
      function prepareGraphData(apiGraphData) {
          actualArray.push(apiGraphData.meets_target);
          actualArray.push(apiGraphData.below_target);
          actualArray.push(apiGraphData.above_target);
      }
        prepareGraphData(props.graphData);

        if (chartInstance) {
            chartInstance.destroy()
        }

        const ctx = chartContainer.current.getContext("2d");
        let meetsTargetGrad = ctx.createLinearGradient(0, 0, 0, 200);
        meetsTargetGrad.addColorStop(0, '#00e0bc');
        meetsTargetGrad.addColorStop(1, '#00a8ec');

        let belowTargetGrad = ctx.createLinearGradient(0, 0, 0, 200);
        belowTargetGrad.addColorStop(0, '#fac159');
        belowTargetGrad.addColorStop(1, '#ff588c');

        let moreThanTargetGrad = ctx.createLinearGradient(0, 0, 0, 200);
        moreThanTargetGrad.addColorStop(0, '#ffd179');
        moreThanTargetGrad.addColorStop(1, '#ffbf45');

        const chartConfig = {
            type: "pie",
            data: {
                datasets: [
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
                        backgroundColor: [meetsTargetGrad, belowTargetGrad, moreThanTargetGrad],
                        borderWidth: 0,
                        // borderWidth: [0, 2, 2, 2],
                        borderColor: "#202c3f",
                        // borderColor: ["00e0bc", "#202c3f", "#202c3f", "#202c3f"],
                        weight: 4,
                        hoverBorderWidth: 0,
                        hoverBorderColor: [meetsTargetGrad, belowTargetGrad, moreThanTargetGrad],
                        hoverBackgroundColor: [meetsTargetGrad, belowTargetGrad, moreThanTargetGrad],
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
                rotation: 3,
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
                            if (j === maxNoIndex) {
                                chart.getDatasetMeta(i).data[maxNoIndex]._model.outerRadius = chart.outerRadius + 30
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
                height="300"
                width="300"
            />
        </div>
    )
}
export default BuLpgInventoryPieChart;