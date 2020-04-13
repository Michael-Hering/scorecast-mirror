import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { PageNotFound } from './pages/PageNotFound'
import { Dashboard } from './pages/Dashboard'

export const Routes = () => {
    return (
        <Switch>
            <Route exact={true} path="/" component={Dashboard} />
            <Route component={PageNotFound} />
        </Switch>
    )
}
