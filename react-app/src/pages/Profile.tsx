import React from 'react'

import { useAuth0 } from 'react-auth0-spa'

import { ProfileContainer } from 'pages/ProfileStyles'

export const Profile = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0()

    return (
        <ProfileContainer>
            <div>
                {!isAuthenticated && (
                    <button onClick={() => loginWithRedirect({})}>
                        Log in
                    </button>
                )}

                {isAuthenticated && (
                    <button onClick={() => logout()}>Log out</button>
                )}
            </div>
        </ProfileContainer>
    )
}
