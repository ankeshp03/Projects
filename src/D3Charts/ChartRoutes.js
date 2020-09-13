import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loader from './../DataLoader';
import NoChartPage from './ChartAssets/NoChartPage';

const DefaultPage = lazy(() => import('./DefaultPage'));
const VerticalBarChart = lazy(() => import('./Charts/VerticalBarChart'));
const GaugeChart = lazy(() => import('./Charts/GaugeChart'));

const Routes = ({ url }) => {
    return (
        <Suspense fallback={<Loader />}>
            <Switch>
                <Route path={`${url}/verticalbarchart`} render={() => <VerticalBarChart />} />
                <Route path={`${url}/gaugechart`} render={() => <GaugeChart />} />
                <Route exact path={`${url}`} render={() => <DefaultPage />} />
                <Route render={() => <NoChartPage />} />
            </Switch>
        </Suspense>
    );
}

export default Routes;