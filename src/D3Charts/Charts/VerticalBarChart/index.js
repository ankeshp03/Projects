import React from 'react';
import ChartViewer from '../../ChartViewer';
import VerticalBarChart from './VerticalBarChart';
import Data from './data.json';

const VerticalBarChartViewer = () => {
    return (
        <ChartViewer chart={VerticalBarChart} data={Data} options={{}} title={"Vertical Bar Chart"} />
    );
};

export default VerticalBarChartViewer;