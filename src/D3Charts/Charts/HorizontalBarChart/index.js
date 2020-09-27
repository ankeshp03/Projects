import React from 'react';
import ChartViewer from '../../ChartViewer';
import HorizontalBarChart from './HorizontalBarChart';
import Data from './data.json';

const HorizontalBarChartViewer = () => {
    return (
        <ChartViewer chart={HorizontalBarChart} data={Data} options={{}} title={"Horizontal Bar Chart"} />
    );
};

export default HorizontalBarChartViewer;