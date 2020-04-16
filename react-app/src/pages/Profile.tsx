import React from 'react'

import { useAuth0 } from 'react-auth0-spa'

import {
    ProfileContainer,
    ProfileInfo,
    ProfileActions,
    BlueButton,
} from 'pages/ProfileStyles'
import { BetsPanel } from 'dash_components/BetsPanel'
import { DashPanel } from 'dash_components/DashPanel'
import { TopBar } from 'dash_components/TopBar'
import BlankProfile from 'common/assets/ProfilePic.png'

const ProfilePanel = () => {
    const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0()

    return (
        <DashPanel dashLocation={'profile'} dashName={'Profile'}>
            <ProfileInfo>
                <img
                    src={isAuthenticated && user ? user.picture : BlankProfile}
                    style={{
                        width: '75%',
                        height: 'auto',
                        border: '2px solid black',
                    }}
                    alt={'user profile'}
                />
                <ProfileActions>
                    {user && user.name}
                    {isAuthenticated ? (
                        <BlueButton
                            onClick={() => {
                                logout()
                                // console.log(user)
                            }}
                        >
                            Logout
                        </BlueButton>
                    ) : (
                        <BlueButton
                            onClick={() => {
                                loginWithRedirect({})
                            }}
                        >
                            Login
                        </BlueButton>
                    )}
                </ProfileActions>
            </ProfileInfo>
        </DashPanel>
    )
}

export const Profile = () => {
    const { isAuthenticated } = useAuth0()

    return isAuthenticated ? (
        <ProfileContainer>
            <TopBar city={'Denver'} />
            <BetsPanel />
            <ProfilePanel />
            <DashPanel
                dashLocation={'settings'}
                dashName={'Settings'}
            ></DashPanel>
        </ProfileContainer>
    ) : (
        <ProfileContainer>
            <TopBar city={'Denver'} />
            <ProfilePanel />
        </ProfileContainer>
    )
}
