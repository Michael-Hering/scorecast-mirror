import React, { useState, useEffect } from 'react'
import { DashPanel } from 'dash_components/DashPanel'
import { Colors } from 'common/colors/Colors'

import {
    OddsItem,
    OddsContainer,
    OddsElement,
} from 'dash_components/OddsPanelStyles'

import {
    DarkLabel,
    BlueTextButton,
    SmallWhiteText,
    LargeWhiteText,
    SingleNumberBox,
} from 'dash_components/PanelStyles'

enum ItemType {
    MINTEMP,
    MAXTEMP,
    PRECIP,
    WIND,
    HUMIDITY,
}

const Odds = ({ under, over }: { under: number; over: number }) => {
    return (
        <OddsContainer>
            <OddsElement style={{ gridArea: 'under' }}>
                <SmallWhiteText>UNDER</SmallWhiteText>
                <LargeWhiteText>{under}</LargeWhiteText>
            </OddsElement>
            <OddsElement style={{ gridArea: 'over' }}>
                <SmallWhiteText>OVER</SmallWhiteText>
                <LargeWhiteText>{over}</LargeWhiteText>
            </OddsElement>
            <BlueTextButton style={{ gridArea: 'bunder' }}>
                Place Bet
            </BlueTextButton>
            <BlueTextButton style={{ gridArea: 'bover' }}>
                Place Bet
            </BlueTextButton>
        </OddsContainer>
    )
}

const PanelItem = ({ val: temp, type }: { val: number; type: ItemType }) => {
    const [isShowingOdds, setIsShowingOdds] = useState(false)

    const showOddsClicked = () => {
        setIsShowingOdds(!isShowingOdds)
    }

    let backgroundColor: string = ''
    let labelString: string = ''

    switch (type) {
        case ItemType.MINTEMP:
            backgroundColor = Colors.LowTempBlue
            labelString = "Tomorrow's Min Temp. (°F)"
            break

        case ItemType.MAXTEMP:
            backgroundColor = Colors.MaxTempRed
            labelString = "Tomorrow's Max Temp. (°F)"
            break

        case ItemType.PRECIP:
            backgroundColor = Colors.RainBlue
            labelString = "Tomorrow's Total Precipitation (in.)"
            break

        case ItemType.WIND:
            backgroundColor = Colors.LightGray
            labelString = "Tomorrow's Wind Speed (mph)"
            break

        case ItemType.HUMIDITY:
            backgroundColor = Colors.LightishBlue
            labelString = "Tomorrow's Humidity (%)"
            break

        default:
            break
    }

    return (
        <OddsItem>
            <SingleNumberBox style={{ backgroundColor: backgroundColor }}>
                {temp}
            </SingleNumberBox>
            <DarkLabel>{labelString}</DarkLabel>
            <BlueTextButton onClick={showOddsClicked}>
                {isShowingOdds ? 'Hide Odds' : 'Show Odds'}
            </BlueTextButton>
            {isShowingOdds && <Odds under={-100} over={100} />}
        </OddsItem>
    )
}

export const OddsPanel = ({ city }: { city: string }) => {
    const [isLoading, setIsLoading] = useState(true)

    // WEATHER DATA

    useEffect(() => {
        const getWeatherData = async () => {
            setIsLoading(true)

            console.log(
                `Getting weather data: http://localhost:5000/daily/${city.toLowerCase()}`
            )
            const response = await fetch(
                `http://localhost:5000/daily/${city.toLowerCase()}`
            )
            const data = await response.json()
            console.log(data)

            setIsLoading(false)
        }

        getWeatherData()
    }, [city])

    return !isLoading ? (
        <DashPanel dashLocation={'odds'} dashName={"Today's Lines"}>
            <PanelItem val={70} type={ItemType.MINTEMP} />
            <PanelItem val={80} type={ItemType.MAXTEMP} />
            <PanelItem val={4.1} type={ItemType.PRECIP} />
            <PanelItem val={34} type={ItemType.WIND} />
            <PanelItem val={77} type={ItemType.HUMIDITY} />
        </DashPanel>
    ) : (
        <DashPanel dashLocation={'odds'} dashName={"Today's Lines"}>
            <LargeWhiteText>Loading...</LargeWhiteText>
        </DashPanel>
    )
}
