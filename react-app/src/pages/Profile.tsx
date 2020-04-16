import React from 'react'

import { useAuth0 } from 'react-auth0-spa'

import { ProfileContainer } from 'pages/ProfileStyles'

export const Profile = () => {
    const { logout } = useAuth0()

    return (
        <ProfileContainer>
            <div
                style={{ cursor: 'pointer' }}
                onClick={() => {
                    logout()
                }}
            >
                LOGOUT
            </div>
        </ProfileContainer>
    )
}
