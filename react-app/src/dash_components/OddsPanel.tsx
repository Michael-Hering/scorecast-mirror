import React, { useState, useEffect } from 'react'
import { DashPanel } from 'dash_components/DashPanel'
import { Colors } from 'common/colors/Colors'
import Loader from 'react-spinners/PulseLoader'

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
    LoaderContainer,
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

const PanelItem = ({
    type,
    weatherData,
}: {
    type: ItemType
    weatherData: WeatherData
}) => {
    const [isShowingOdds, setIsShowingOdds] = useState(false)
    const { val, oddsUnder, oddsOver } = weatherData

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
            labelString = "Tomorrow's Total Precip. (in.)"
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
                {val}
            </SingleNumberBox>
            <DarkLabel>{labelString}</DarkLabel>
            <BlueTextButton onClick={showOddsClicked}>
                {isShowingOdds ? 'Hide Odds' : 'Show Odds'}
            </BlueTextButton>
            {isShowingOdds && <Odds under={oddsUnder} over={oddsOver} />}
        </OddsItem>
    )
}

// ------------------------------------------------------------
// CLASSIFIED: Proprietary Algorithm B10 Organization
// calculateOdds v1.2.4a - DANIEL SCOTT
const calculateOdds = (val: number, type: ItemType) => {
    const negFlip = Math.random() < 0.5
    let under, over

    switch (type) {
        case ItemType.MINTEMP:
            under = Math.floor(Math.random() * 300 + 50)
            over = -1 * Math.floor(Math.random() * 300 + 50)
            break

        case ItemType.MAXTEMP:
            under = -1 * Math.floor(Math.random() * 300 + 50)
            over = Math.floor(Math.random() * 300 + 50)
            break

        default:
            under = negFlip
                ? -1 * Math.floor(Math.random() * 300 + 50)
                : Math.floor(Math.random() * 300 + 50)
            over = negFlip
                ? Math.floor(Math.random() * 300 + 50)
                : -1 * Math.floor(Math.random() * 300 + 50)
            break
    }

    return { oddsUnder: under, oddsOver: over }
}
// ------------------------------------------------------------

export const OddsPanel = ({ city }: { city: string }) => {
    const [isLoading, setIsLoading] = useState(true)

    // WEATHER DATA
    const defaultWeatherData: WeatherData = {
        val: -999,
        oddsUnder: -999,
        oddsOver: -999,
    }

    const [minTempData, setMinTempData] = useState(defaultWeatherData)
    const [maxTempData, setMaxTempData] = useState(defaultWeatherData)
    const [precipData, setPrecipData] = useState(defaultWeatherData)
    const [windData, setWindData] = useState(defaultWeatherData)
    const [humidityData, setHumidityData] = useState(defaultWeatherData)

    useEffect(() => {
        const getWeatherData = async () => {
            setIsLoading(true)

            // console.log(
            //     `Getting weather data: http://localhost:5000/daily/${city.toLowerCase()}`
            // )
            const response = await fetch(
                `http://localhost:5000/daily/${city.toLowerCase()}`
            )
            const data = await response.json()
            const forecast = data.nextDayForecast

            const minTempOdds = calculateOdds(
                forecast.min_temp,
                ItemType.MINTEMP
            )
            setMinTempData({
                val: forecast.min_temp,
                oddsUnder: minTempOdds.oddsUnder,
                oddsOver: minTempOdds.oddsOver,
            })

            const maxTempOdds = calculateOdds(
                forecast.max_temp,
                ItemType.MAXTEMP
            )
            setMaxTempData({
                val: forecast.max_temp,
                oddsUnder: maxTempOdds.oddsUnder,
                oddsOver: maxTempOdds.oddsOver,
            })

            const windOdds = calculateOdds(forecast.windspeed, ItemType.WIND)
            setWindData({
                val: forecast.windspeed,
                oddsUnder: windOdds.oddsUnder,
                oddsOver: windOdds.oddsOver,
            })

            const humidityOdds = calculateOdds(
                forecast.humidity,
                ItemType.HUMIDITY
            )
            setHumidityData({
                val: forecast.humidity,
                oddsUnder: humidityOdds.oddsUnder,
                oddsOver: humidityOdds.oddsOver,
            })

            const precipOdds = calculateOdds(
                forecast.rain + forecast.snow,
                ItemType.PRECIP
            )
            if (forecast.rain !== 0 && forecast.snow !== 0) {
                setPrecipData({
                    val: forecast.rain + forecast.snow,
                    oddsUnder: precipOdds.oddsUnder,
                    oddsOver: precipOdds.oddsOver,
                })
            } else if (forecast.rain !== 0) {
                setPrecipData({
                    val: forecast.rain,
                    oddsUnder: precipOdds.oddsUnder,
                    oddsOver: precipOdds.oddsOver,
                })
            } else if (forecast.snow !== 0) {
                setPrecipData({
                    val: forecast.snow,
                    oddsUnder: precipOdds.oddsUnder,
                    oddsOver: precipOdds.oddsOver,
                })
            } else {
                setPrecipData({
                    val: 0,
                    oddsUnder: precipOdds.oddsUnder,
                    oddsOver: precipOdds.oddsOver,
                })
            }

            setIsLoading(false)
        }

        getWeatherData()
    }, [city])

    return !isLoading ? (
        <DashPanel dashLocation={'odds'} dashName={"Today's Lines"}>
            <PanelItem weatherData={minTempData} type={ItemType.MINTEMP} />
            <PanelItem weatherData={maxTempData} type={ItemType.MAXTEMP} />
            <PanelItem weatherData={precipData} type={ItemType.PRECIP} />
            <PanelItem weatherData={windData} type={ItemType.WIND} />
            <PanelItem weatherData={humidityData} type={ItemType.HUMIDITY} />
        </DashPanel>
    ) : (
        <DashPanel dashLocation={'odds'} dashName={"Today's Lines"}>
            <LoaderContainer>
                <Loader size={20} margin={10} color={Colors.White} />
            </LoaderContainer>
        </DashPanel>
    )
}

interface WeatherData {
    val: number
    oddsUnder: number
    oddsOver: number
}
