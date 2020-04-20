import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { PageNotFound } from 'pages/PageNotFound'
import { Dashboard } from 'pages/Dashboard'
import { Profile } from 'pages/Profile'

export const Routes = () => {
    return (
        <Switch>
            <Route exact={true} path="/" component={Dashboard} />
            <Route exact={true} path="/profile" component={Profile} />
            <Route component={PageNotFound} />
        </Switch>
    )
}
