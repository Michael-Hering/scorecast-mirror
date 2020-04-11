import React from 'react'
import styled from '@emotion/styled'
import { Colors } from 'common/colors/Colors'

const TopBarContainer = styled.div`
    grid-area: topbar;

    width: 100%;
    height: 100%;

    background-color: ${Colors.Obsidian};
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.4);
`

export const TopBar = () => {
    return <TopBarContainer />
}
