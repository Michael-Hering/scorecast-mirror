import React from 'react'
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

export const TopBar = ({ city }: Props) => {
    const changeCityClicked = () => {
        alert('Lolno. Only Denver right now.')
    }

    const profileClicked = () => {
        alert('There are no individuals, only the one.')
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
            <LogoText>Scorecast</LogoText>
            <CityContainer>
                <CityText>{city}</CityText>
                <ChangeCity onClick={changeCityClicked}>
                    (change city)
                </ChangeCity>
            </CityContainer>
            <ProfileBox onClick={profileClicked}>
                <ProfileText>Profile</ProfileText>
                <img
                    src={ProfilePic}
                    style={{
                        width: '30px',
                        height: 'auto',
                        marginRight: '4px',
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
