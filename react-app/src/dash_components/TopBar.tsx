import React from 'react'
import styled from '@emotion/styled'
import { Colors } from 'common/colors/Colors'
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
    return (
        <TopBarContainer>
            <Logo
                style={{
                    height: '75%',
                    width: 'auto',
                    marginLeft: '5px',
                    marginRight: '10px',
                    gridArea: 'logo',
                }}
            />
            <LogoText>Scorecast</LogoText>
            <CityContainer>
                <CityText>{city}</CityText>
                <ChangeCity>(change city)</ChangeCity>
            </CityContainer>
            <ProfileBox>
                <ProfileText>Profile</ProfileText>
                <img
                    src={ProfilePic}
                    style={{
                        width: '30px',
                        height: 'auto',
                        marginRight: '4px',
                    }}
                    alt="profile picture"
                />
            </ProfileBox>
        </TopBarContainer>
    )
}

interface Props {
    city: string
}
