import React from 'react'
import styled from '@emotion/styled'
import { Colors } from 'common/colors/Colors'
import { Logo } from 'common/colors/assets/Logo'

const TopBarContainer = styled.div`
    grid-area: topbar;

    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    place-items: center center;

    background-color: ${Colors.Obsidian};
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.4);

    font-family: 'Helvetica Nueue', Roboto, Arial, Helvetica, sans-serif;
    font-style: normal;
    color: ${Colors.White};
    font-size: 20px;
`

const LogoText = styled.div`
    font-weight: normal;
`

const CityText = styled.div`
    font-weight: bold;
    margin-left: 5px;
`

export const TopBar = ({ city }: Props) => {
    return (
        <TopBarContainer>
            <Logo
                style={{
                    height: '75%',
                    width: 'auto',
                    marginLeft: '5px',
                    marginRight: '10px',
                }}
            />
            <LogoText>Scorecast</LogoText>
            <CityText>{city}</CityText>
        </TopBarContainer>
    )
}

interface Props {
    city: string
}
