import React from 'react';
import ChartViewer from '../../ChartViewer';
import PieChart from './PieChart';
import Data from './data.json';

const PieChartViewer = () => {
    return (
        <ChartViewer chart={PieChart} data={Data} options={{}} generatorOptions={{ diffFill: true }} title={"Pie Chart"} />
    );
};

export default PieChartViewer;