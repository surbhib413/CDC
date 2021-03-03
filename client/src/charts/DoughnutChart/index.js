import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js";

import styles from "./doughnutChart.module.scss";

const chartConfig = {
  type: "doughnut",
  data: {
    datasets: [
      {
        data: [35, 65],
        backgroundColor: ["#64d7d2", "#090a0c"],
        borderWidth: 0
      }
    ]
  },
  options: {
    elements: {
      center: {
        text: "35%",
        color: "#64d7d2", //Default black
        fontStyle: "Helvetica", //Default Arial
        sidePadding: 50 //Default 20 (as a percentage)
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    cutoutPercentage: 80,
    title: {
      display: true
    }
  }
};

function DoughnutChart() {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  return <canvas ref={chartContainer} height='75' />;
}

Chart.pluginService.register({
  beforeDraw: function(chart) {
    if (chart.config.options.elements.center) {
      //Get ctx from string
      let ctx = chart.chart.ctx;

      //Get options from the center object in options
      let centerConfig = chart.config.options.elements.center;
      let fontStyle = centerConfig.fontStyle || "Arial";
      let txt = centerConfig.text;
      let color = centerConfig.color || "#000";
      let sidePadding = centerConfig.sidePadding || 20;
      let sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2);
      //Start with a base font of 30px
      ctx.font = "30px " + fontStyle;

      //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
      let stringWidth = ctx.measureText(txt).width;
      let elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;

      // Find out how much the font can grow in width.
      let widthRatio = elementWidth / stringWidth;
      let newFontSize = Math.floor(30 * widthRatio);
      let elementHeight = chart.innerRadius * 2;

      // Pick a new font size so it will not be larger than the height of label.
      let fontSizeToUse = Math.min(newFontSize, elementHeight);

      //Set font settings to draw it correctly.
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      let centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
      let centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
      ctx.font = fontSizeToUse + "px " + fontStyle;
      ctx.fillStyle = color;

      //Draw text in center
      ctx.fillText(txt, centerX, centerY);
    }
  }
});

export default DoughnutChart;
