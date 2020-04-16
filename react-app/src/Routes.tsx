import React from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { PageNotFound } from 'pages/PageNotFound'
import { Dashboard } from 'pages/Dashboard'
import { Profile } from 'pages/Profile'

import { Auth0Provider } from 'react-auth0-spa'
import config from 'auth_config.json'

const AuthenticatedProfile = () => {
    const history = useHistory()

    const onRedirectCallback = () => {
        history.push('/profile')
    }

    return (
        <Auth0Provider
            domain={config.domain}
            client_id={config.clientId}
            redirect_uri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
        >
            <Profile />
        </Auth0Provider>
    )
}

export const Routes = () => {
    return (
        <Switch>
            <Route exact={true} path="/" component={Dashboard} />
            <Route
                exact={true}
                path="/profile"
                component={AuthenticatedProfile}
            />
            <Route component={PageNotFound} />
        </Switch>
    )
}
