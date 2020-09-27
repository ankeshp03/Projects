import React from 'react';
import ChartViewer from '../../ChartViewer';
import DonutChart from './DonutChart';
import Data from './data.json';

const DonutChartViewer = () => {
    return (
        <ChartViewer chart={DonutChart} data={Data} options={{}} generatorOptions={{ diffFill: true }} title={"Donut Chart"} />
    );
};

export default DonutChartViewer;