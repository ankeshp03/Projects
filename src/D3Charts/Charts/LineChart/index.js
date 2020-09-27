import React from 'react';
import ChartViewer from '../../ChartViewer';
import LineChart from './LineChart';
import Data from './data.json';

const LineChartViewer = () => {
    return (
        <ChartViewer chart={LineChart} data={Data} options={{}} title={"Line Chart"} />
    );
};

export default LineChartViewer;