import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { createBrowserHistory } from 'history'
import { Auth0Provider } from 'react-auth0-spa'
import config from 'auth_config.json'

const onRedirectCallback = () => {
    const history = createBrowserHistory()

    history.push('/profile')

    // history.push(
    //   appState && appState.targetUrl
    //     ? appState.targetUrl
    //     : window.location.pathname
    // );
}

ReactDOM.render(
    <Auth0Provider
        domain={config.domain}
        client_id={config.clientId}
        redirect_uri={window.location.origin + '/profile'}
        onRedirectCallback={onRedirectCallback}
    >
        <App />
    </Auth0Provider>,
    document.getElementById('root')
)

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
