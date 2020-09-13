import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loader from './DataLoader';

import Home from './Home';
const D3Charts = lazy(() => import('./D3Charts'));

const Routes = () => {
    return (
        <Suspense fallback={<Loader />}>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/projects" component={Home} />
                <Route path="/d3charts" render={(props) => <D3Charts {...props} />} />
            </Switch>
        </Suspense>
    );
}

export default Routes;