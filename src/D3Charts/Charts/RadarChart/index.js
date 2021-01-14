import React from "react";
import ChartViewer from "../../ChartViewer";
import RadarChart from "./RadarChart";
import Data from "./data.json";

const dataGenerator = (_defaultGenerator, getRandomText, getRandomColor) => {
  const dataCount = Math.ceil(Math.random() * 5);
  let data = [],
    axisLabels = [];
  let axisCount = Math.ceil(Math.random() * 3) + 3;

  const getAxes = () => {
    let axes = [];
    for (let i = 0; i < axisCount; i++) {
      if (!axisLabels[i]) {
        axisLabels[i] = getRandomText(Math.random() * 3);
      }
      const value = Math.ceil(Math.random() * 3);
      axes.push({
        key: axisLabels[i],
        value: value,
        displayKey: {
          label: "Type",
          value: axisLabels[i]
        },
        displayValue: {
          label: "Value",
          value: "" + value
        }
      });
    }
    return axes;
  };

  for (let i = 0; i < dataCount; i++) {
    data.push({
      name: getRandomText(Math.ceil(Math.random() * 10)),
      axes: getAxes(),
      fill: getRandomColor()
    });
  }
  return data;
};

const RadarChartViewer = () => {
  return (
    <ChartViewer
      chart={RadarChart}
      data={Data}
      options={{ legends: true }}
      generator={dataGenerator}
      generatorOptions={{ noFill: true }}
      title={"Radar Chart"}
    />
  );
};

export default RadarChartViewer;
