import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
import 'chartjs-plugin-datalabels';
import styles from "./LubesDicountVsSalesBubbleChart.module.scss";
import {toTitleCase, getColor} from "../../../utility/utility"
Chart.defaults.global.defaultFontFamily = "Titillium Web";


function BuDepotInventoryPieChart(props) {

  const chartContainer = useRef("barGraph");
  const [chartInstance, setChartInstance] = useState(null);
  
  useEffect(() => {
    let dataFromApi = [];
    let productList = [];
    let bubbleColors = [];
  
    function prepareGraphData(apiGraphData) {
      apiGraphData.forEach((item, index) => {
        dataFromApi.push({
          x: item.sales,
          y: item.discount,
          r: 10,
        })
        productList.push(item.product);
        bubbleColors.push(getColor(item.rating))
      })
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
      type: 'bubble',
      data: {
        datasets: [
          {
            backgroundColor: bubbleColors,
            // borderColor: "rgba(255,221,50,1)",
            datalabels: {
              anchor: "end",
              align: 'end',
              color: "white",
              font:{
                size:20
              },
              formatter: function(value, context){
                return toTitleCase(productList[context.dataIndex])
              }
            },
            data: dataFromApi
          },
        ]
      },
      options: {
        legend: {
          display: false
        },
        layout:{
          padding:{
            top:40,
            right:45,
            // bottom:20,
            // left:20,
          }
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: "Discount (Cr)",
              fontColor: "#dee5ef",
              fontSize: "20",
            },
            ticks: {
              display: true,
              padding: 50,
              fontColor: "#dee5ef",
              fontSize: "20",
            },
            gridLines: {
              display: true,
              color: "#67758d",
              // drawBorder: true,
              tickMarkLength: 0,
              zeroLineColor: "#67758d",
              zeroLineWidth: 1,
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: "Sales (TMT)",
              fontColor: "#dee5ef",
              fontSize: "20",
            },
            ticks: {
              display: true,
              padding: 40,
              fontColor: "#dee5ef",
              fontSize: "20",
            },
            gridLines: {
              display: true,
              color: "#67758d",
              drawBorder: false,
              borderDash: [3],
              tickMarkLength: 0,
              zeroLineColor: "#67758d",
              zeroLineWidth: 1,
              zeroLineBorderDash: [3],
            }
          }]
        }
      }
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
      />
    </div>
  )
}
export default BuDepotInventoryPieChart;