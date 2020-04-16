import React from 'react'
import { useHistory } from 'react-router-dom'

import { Auth0Provider, useAuth0 } from 'react-auth0-spa'
import config from 'auth_config.json'

import { ProfileContainer } from 'pages/ProfileStyles'

export const Profile = () => {
    const history = useHistory()
    const { logout } = useAuth0()

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
            <ProfileContainer onClick={() => {}}></ProfileContainer>
        </Auth0Provider>
    )
}
