import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loader from './../DataLoader';
import NoChartPage from './ChartAssets/NoChartPage';

const TreeMap = lazy(() => import('./Charts/TreeMap'));
const DefaultPage = lazy(() => import('./DefaultPage'));
const PieChart = lazy(() => import('./Charts/PieChart'));
const LineChart = lazy(() => import('./Charts/LineChart'));
const DonutChart = lazy(() => import('./Charts/DonutChart'));
const GaugeChart = lazy(() => import('./Charts/GaugeChart'));
const BubbleChart = lazy(() => import('./Charts/BubbleChart'));
const VerticalBarChart = lazy(() => import('./Charts/VerticalBarChart'));
const HorizontalBarChart = lazy(() => import('./Charts/HorizontalBarChart'));

const Routes = ({ url }) => {
    return (
        <Suspense fallback={<Loader />}>
            <Switch>
                <Route path={`${url}/treemap`} render={() => <TreeMap />} />
                <Route path={`${url}/piechart`} render={() => <PieChart />} />
                <Route path={`${url}/linechart`} render={() => <LineChart />} />
                <Route path={`${url}/DonutChart`} render={() => <DonutChart />} />
                <Route path={`${url}/gaugechart`} render={() => <GaugeChart />} />
                <Route path={`${url}/zoomablebubblechart`} render={() => <BubbleChart />} />
                <Route path={`${url}/verticalbarchart`} render={() => <VerticalBarChart />} />
                <Route path={`${url}/horizontalbarchart`} render={() => <HorizontalBarChart />} />
                <Route exact path={`${url}`} render={() => <DefaultPage />} />
                <Route render={() => <NoChartPage />} />
            </Switch>
        </Suspense>
    );
}

export default Routes;