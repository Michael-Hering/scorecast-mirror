import React from 'react'
import styled from '@emotion/styled'
import { Colors } from 'common/colors/Colors'

import { DashboardContainer } from 'pages/DashboardStyles'
import { TopBar } from 'dash_components/TopBar'

import { DashPanel } from 'dash_components/DashPanel'

export const Dashboard = () => {
    return (
        <DashboardContainer>
            <TopBar city={'Denver'} />
            <DashPanel
                dashLocation={'weather'}
                dashName={'Weather Report'}
            ></DashPanel>
            <DashPanel
                dashLocation={'odds'}
                dashName={"Today's Lines"}
            ></DashPanel>
            <DashPanel
                dashLocation={'twittertop'}
                dashName={'Twitter Analysis'}
            ></DashPanel>
            <DashPanel
                dashLocation={'twitterbottom'}
                dashName={'Live Tweets'}
            ></DashPanel>
        </DashboardContainer>
    )
}
