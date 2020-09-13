import React from 'react';
import ChartViewer from '../../ChartViewer';
import GaugeChart from './GaugeChart';
import Data from './data.json';

const dataGenerator = (defaultGenerator) => {
    let arcs = defaultGenerator({
        key: "amber",
        value: 1,
        displayKey: "Amber",
        displayValue: "33%",
        fill: "#ffbf00"
    }, { diffFill: true });
    let value = Math.ceil(Math.random() * 100);
    return {
        value,
        maxValue: 100,
        displayKey: "Current",
        displayValue: value + "%",
        arcs
    };
};

const GaugeChartViewer = () => {
    return (
        <ChartViewer chart={GaugeChart} data={Data} options={{}} title={"Gauge Chart"} generator={dataGenerator} />
    );
};

export default GaugeChartViewer;