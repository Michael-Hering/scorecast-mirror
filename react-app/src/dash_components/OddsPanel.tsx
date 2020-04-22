import React, { useState, useEffect } from 'react'
import { DashPanel } from 'dash_components/DashPanel'
import { Colors } from 'common/colors/Colors'
import Loader from 'react-spinners/PulseLoader'

import {
    OddsItem,
    OddsContainer,
    OddsElement,
    OddsLoadingContainer,
    BetPlacedText,
} from 'dash_components/OddsPanelStyles'

import {
    DarkLabel,
    BlueTextButton,
    SmallWhiteText,
    LargeWhiteText,
    SingleNumberBox,
    LoaderContainer,
} from 'dash_components/PanelStyles'
import { useAuth0 } from 'react-auth0-spa'

enum ItemType {
    MINTEMP,
    MAXTEMP,
    PRECIP,
    WIND,
    HUMIDITY,
}

const Odds = ({
    under,
    over,
    weatherData,
}: {
    under: number
    over: number
    weatherData: WeatherData
}) => {
    const { isAuthenticated, loginWithRedirect, user } = useAuth0()

    const [betPlaced, setBetPlaced] = useState<boolean>(false)
    const [betSending, setBetSending] = useState<boolean>(false)

    const placeBetClicked = async (odds: number, type: string) => {
        if (!isAuthenticated) {
            loginWithRedirect()
            return
        }

        setBetPlaced(true)
        setBetSending(true)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: user.email,
                city: weatherData.city.toLowerCase(),
                date: new Date().getTime(),
                type: type,
                odds: odds,
                val: weatherData.val,
                weatherFeature: weatherData.weatherFeature,
                status: 'pending',
            }),
        }

        const apiUrl =
            window.location.protocol === 'https:'
                ? `https://localhost:5000/api/bets`
                : `http://localhost:5000/api/bets`

        await fetch(apiUrl, requestOptions)

        setBetSending(false)
    }

    const placedUnder = () => {
        placeBetClicked(under, 'under')
    }

    const placedOver = () => {
        placeBetClicked(over, 'over')
    }

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
            {!betPlaced ? (
                <>
                    <BlueTextButton onClick={placedUnder}>
                        Place Bet
                    </BlueTextButton>
                    <BlueTextButton onClick={placedOver}>
                        Place Bet
                    </BlueTextButton>
                </>
            ) : (
                <OddsLoadingContainer>
                    {betSending ? (
                        <Loader
                            size={10}
                            margin={5}
                            color={Colors.BrightBlue}
                        />
                    ) : (
                        <BetPlacedText>Bet Placed!</BetPlacedText>
                    )}
                </OddsLoadingContainer>
            )}
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
            {isShowingOdds && (
                <Odds
                    under={oddsUnder}
                    over={oddsOver}
                    weatherData={weatherData}
                />
            )}
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
        city: city,
        weatherFeature: '',
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

            const apiUrl =
                window.location.protocol === 'https:'
                    ? `https://localhost:5000/daily/${city.toLowerCase()}`
                    : `http://localhost:5000/daily/${city.toLowerCase()}`

            const response = await fetch(apiUrl)
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
                city: city,
                weatherFeature: 'minTemp',
            })

            const maxTempOdds = calculateOdds(
                forecast.max_temp,
                ItemType.MAXTEMP
            )
            setMaxTempData({
                val: forecast.max_temp,
                oddsUnder: maxTempOdds.oddsUnder,
                oddsOver: maxTempOdds.oddsOver,
                city: city,
                weatherFeature: 'maxTemp',
            })

            const windOdds = calculateOdds(forecast.windspeed, ItemType.WIND)
            setWindData({
                val: forecast.windspeed,
                oddsUnder: windOdds.oddsUnder,
                oddsOver: windOdds.oddsOver,
                city: city,
                weatherFeature: 'maxWind',
            })

            const humidityOdds = calculateOdds(
                forecast.humidity,
                ItemType.HUMIDITY
            )
            setHumidityData({
                val: forecast.humidity,
                oddsUnder: humidityOdds.oddsUnder,
                oddsOver: humidityOdds.oddsOver,
                city: city,
                weatherFeature: 'humidity',
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
                    city: city,
                    weatherFeature: 'totalPrecip',
                })
            } else if (forecast.rain !== 0) {
                setPrecipData({
                    val: forecast.rain,
                    oddsUnder: precipOdds.oddsUnder,
                    oddsOver: precipOdds.oddsOver,
                    city: city,
                    weatherFeature: 'totalPrecip',
                })
            } else if (forecast.snow !== 0) {
                setPrecipData({
                    val: forecast.snow,
                    oddsUnder: precipOdds.oddsUnder,
                    oddsOver: precipOdds.oddsOver,
                    city: city,
                    weatherFeature: 'totalPrecip',
                })
            } else {
                setPrecipData({
                    val: 0,
                    oddsUnder: precipOdds.oddsUnder,
                    oddsOver: precipOdds.oddsOver,
                    city: city,
                    weatherFeature: 'totalPrecip',
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
    weatherFeature: string
    city: string
}
