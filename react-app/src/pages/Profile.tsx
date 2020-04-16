import React from 'react'

import { useAuth0 } from 'react-auth0-spa'

import { ProfileContainer } from 'pages/ProfileStyles'
import { BetsPanel } from 'dash_components/BetsPanel'
import { DashPanel } from 'dash_components/DashPanel'
import { TopBar } from 'dash_components/TopBar'

export const Profile = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0()

    return (
        <ProfileContainer>
            {/* <div>
                {!isAuthenticated && (
                    <button onClick={() => loginWithRedirect({})}>
                        Log in
                    </button>
                )}

                {isAuthenticated && (
                    <button onClick={() => logout()}>Log out</button>
                )}
            </div> */}
            <TopBar city={'Denver'} />
            <BetsPanel />
            <DashPanel
                dashLocation={'profile'}
                dashName={'Profile'}
            ></DashPanel>
            <DashPanel
                dashLocation={'settings'}
                dashName={'Settings'}
            ></DashPanel>
        </ProfileContainer>
    )
}
