import React from 'react'

import { DashboardContainer } from 'pages/DashboardStyles'
import { TopBar } from 'dash_components/TopBar'

import { DashPanel } from 'dash_components/DashPanel'
import { OddsPanel } from 'dash_components/OddsPanel'
import { WeatherPanel } from 'dash_components/WeatherPanel'

export const Dashboard = () => {
    return (
        <DashboardContainer>
            <TopBar city={'Denver'} />
            <WeatherPanel />
            <OddsPanel />
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
