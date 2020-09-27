import React from 'react';
import ChartViewer from '../../ChartViewer';
import RadarChart from './RadarChart';
import Data from './data.json';

const RadarChartViewer = () => {
    return (
        <ChartViewer chart={RadarChart} data={Data} options={{}} generatorOptions={{ diffFill: true }} title={"Radar Chart"} />
    );
};

export default RadarChartViewer;