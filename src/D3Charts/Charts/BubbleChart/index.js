import React from 'react';
import ChartViewer from '../../ChartViewer';
import BubbleChart from './BubbleChart';
import Data from './data.json';

const BubbleChartViewer = () => {
    return (
        <ChartViewer chart={BubbleChart} data={Data}  options={{}} generatorOptions={{ diffFill: true }} title={"Zoomable Bubble Chart"} />
    );
};

export default BubbleChartViewer;