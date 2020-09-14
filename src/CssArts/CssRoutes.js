import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loader from '../DataLoader';
// import NoChartPage from './ChartAssets/NoChartPage';

const DefaultPage = lazy(() => import('./DefaultPage'));
const ArtViewer = lazy(() => import('./ArtViewer'));

const Routes = ({ url, data }) => {
    return (
        <Suspense fallback={<Loader />}>
            <Switch>
                <Route path={`${url}/pikachu`} render={() => <ArtViewer data={data} />} />
                <Route path={`${url}/mobile`} render={() => <ArtViewer data={data} />} />
                <Route path={`${url}/tesseract`} render={() => <ArtViewer data={data} />} />
                <Route path={`${url}/flag`} render={() => <ArtViewer data={data} />} />
                <Route path={`${url}/cssmenu`} render={() => <ArtViewer data={data} />} />
                <Route path={`${url}/umbrella`} render={() => <ArtViewer data={data} />} />
                <Route path={`${url}/hamburgermenu`} render={() => <ArtViewer data={data} />} />
                <Route exact path={`${url}`} render={() => <DefaultPage />} />
                {/* <Route render={() => <NoChartPage />} /> */}
            </Switch>
        </Suspense>
    );
}

export default Routes;