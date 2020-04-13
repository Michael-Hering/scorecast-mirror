import React from 'react'
import styled from '@emotion/styled'
import { Colors } from 'common/colors/Colors'

import { DashboardContainer } from 'pages/DashboardStyles'
import { TopBar } from 'dash_components/TopBar'

const TempDashboardComponent = styled.div`
    width: 100%;
    height: 100%;

    background-color: ${Colors.Obsidian};
`

export const Dashboard = () => {
    return (
        <DashboardContainer>
            <TopBar city={'Denver'} />
            <TempDashboardComponent
                style={{ gridArea: 'weather' }}
            ></TempDashboardComponent>
            <TempDashboardComponent
                style={{ gridArea: 'odds' }}
            ></TempDashboardComponent>
            <TempDashboardComponent
                style={{ gridArea: 'twittertop' }}
            ></TempDashboardComponent>
            <TempDashboardComponent
                style={{ gridArea: 'twitterbottom' }}
            ></TempDashboardComponent>
        </DashboardContainer>
    )
}
