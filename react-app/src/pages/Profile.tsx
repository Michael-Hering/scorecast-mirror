import React from 'react'

import { useAuth0 } from 'react-auth0-spa'

import {
    ProfileContainer,
    ProfileInfo,
    ProfileActions,
    BlueButton,
    AccountManagement,
    ThemeSwitcher,
    TitleText,
    SubText,
} from 'pages/ProfileStyles'
import { BetsPanel } from 'dash_components/BetsPanel'
import { DashPanel } from 'dash_components/DashPanel'
import { TopBar } from 'dash_components/TopBar'

import BlankProfile from 'common/assets/ProfilePic.png'
import DarkTheme from 'common/assets/THEME DARK.png'
import LightTheme from 'common/assets/THEME LIGHT.png'
import { Colors } from 'common/colors/Colors'

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

const Settings = () => {
    return (
        <DashPanel dashLocation={'settings'} dashName={'Settings'}>
            <ThemeSwitcher>
                <TitleText>Theme</TitleText>
                <img
                    src={DarkTheme}
                    alt={'dark theme'}
                    style={{
                        width: '70%',
                        height: 'auto',
                        border: `3px solid ${Colors.BrightBlue}`,
                        boxShadow: `0px 0px 20px ${Colors.BrightBlue}`,
                        cursor: 'pointer',
                    }}
                />
                <img
                    src={LightTheme}
                    alt={'light theme'}
                    style={{
                        width: '70%',
                        height: 'auto',
                        border: `3px solid ${Colors.LightObsidian}`,
                        cursor: 'pointer',
                    }}
                />
                <SubText>Set Scorecast’s theme for this browser.</SubText>
            </ThemeSwitcher>
            <AccountManagement>
                <TitleText>Account Management</TitleText>
                <BlueButton style={{ gridArea: 'delete' }}>
                    Delete Account
                </BlueButton>
                <SubText>
                    Delete your account from our database permanently.
                </SubText>
            </AccountManagement>
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
            <Settings />
        </ProfileContainer>
    ) : (
        <ProfileContainer>
            <TopBar city={'Denver'} />
            <ProfilePanel />
        </ProfileContainer>
    )
}
