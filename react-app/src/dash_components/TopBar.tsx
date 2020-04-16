import React from 'react'
import { useHistory } from 'react-router-dom'

import { Logo } from 'common/assets/Logo'
import ProfilePic from 'common/assets/ProfilePic.png'

import {
    TopBarContainer,
    ProfileText,
    LogoText,
    ProfileBox,
    CityText,
    ChangeCity,
    CityContainer,
} from 'dash_components/TopBarStyles'

import { useAuth0 } from 'react-auth0-spa'

export const TopBar = ({ city }: Props) => {
    const history = useHistory()
    const { user } = useAuth0()

    const changeCityClicked = () => {
        alert('Lolno. Only Denver right now.')
    }

    const profileClicked = () => {
        history.push('/profile')
    }

    const goHome = () => {
        history.push('/')
    }

    return (
        <TopBarContainer>
            <Logo
                style={{
                    height: '70%',
                    width: 'auto',
                    marginLeft: '5px',
                    marginRight: '10px',
                    gridArea: 'logo',
                }}
            />
            <LogoText onClick={goHome}>Scorecast</LogoText>
            <CityContainer>
                <CityText>{city}</CityText>
                <ChangeCity onClick={changeCityClicked}>
                    (change city)
                </ChangeCity>
            </CityContainer>
            <ProfileBox onClick={profileClicked}>
                <ProfileText>Profile</ProfileText>
                <img
                    src={
                        user
                            ? user.picture
                                ? user.picture
                                : ProfilePic
                            : ProfilePic
                    }
                    style={{
                        width: '30px',
                        height: 'auto',
                        marginRight: '4px',
                        borderRadius: '99px',
                    }}
                    alt="profile"
                />
            </ProfileBox>
        </TopBarContainer>
    )
}

interface Props {
    city: string
}
