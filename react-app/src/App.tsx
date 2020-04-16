import React from 'react'
import { BrowserRouter as Router, useHistory } from 'react-router-dom'
import { Routes } from './Routes'
import './App.css'

import { Auth0Provider } from 'react-auth0-spa'
import config from 'auth_config.json'

const App: React.FC = () => {
    return (
        <Router>
            <Routes />
        </Router>
    )
}

export default App
