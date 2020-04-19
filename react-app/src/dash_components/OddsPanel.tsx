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
    const [minTempVal, setMinTempVal] = useState<number>(0)
    const [maxTempVal, setMaxTempVal] = useState<number>(0)
    const [precipVal, setPrecipVal] = useState<number>(0)
    const [windVal, setWindVal] = useState<number>(0)
    const [humidityVal, setHumidityVal] = useState<number>(0)

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
            const forecast = data.nextDayForecast

            setMinTempVal(forecast.min_temp)
            setMaxTempVal(forecast.max_temp)
            setWindVal(forecast.windspeed)

            if (forecast.rain !== 0 && forecast.snow !== 0) {
                setPrecipVal(forecast.rain + forecast.snow)
            } else if (forecast.rain !== 0) {
                setPrecipVal(forecast.rain)
            } else if (forecast.snow !== 0) {
                setPrecipVal(forecast.snow)
            } else {
                setPrecipVal(0)
            }

            setIsLoading(false)
        }

        getWeatherData()
    }, [city])

    return !isLoading ? (
        <DashPanel dashLocation={'odds'} dashName={"Today's Lines"}>
            <PanelItem val={minTempVal} type={ItemType.MINTEMP} />
            <PanelItem val={maxTempVal} type={ItemType.MAXTEMP} />
            <PanelItem val={precipVal} type={ItemType.PRECIP} />
            <PanelItem val={windVal} type={ItemType.WIND} />
            <PanelItem val={humidityVal} type={ItemType.HUMIDITY} />
        </DashPanel>
    ) : (
        <DashPanel dashLocation={'odds'} dashName={"Today's Lines"}>
            <LargeWhiteText>Loading...</LargeWhiteText>
        </DashPanel>
    )
}
