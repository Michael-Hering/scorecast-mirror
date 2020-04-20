import React, { useState } from 'react'

import { DashboardContainer } from 'pages/DashboardStyles'
import { TopBar } from 'dash_components/TopBar'

import { DashPanel } from 'dash_components/DashPanel'
import { OddsPanel } from 'dash_components/OddsPanel'
import { WeatherPanel } from 'dash_components/WeatherPanel'
import { CityPicker } from 'dash_components/CityPicker'
import { TweetPanel } from 'dash_components/TweetPanel'

export const Dashboard = () => {
  
    const [city, setCity] = useState("Denver")

    return (
        <DashboardContainer>
            <CityPicker city={city} setCity={(cityName: string) => {setCity(cityName);}}/>
            <TopBar />
            <WeatherPanel city={city}/>            
            <OddsPanel />
            <TweetPanel city={city}/>
        </DashboardContainer>
    )
}
