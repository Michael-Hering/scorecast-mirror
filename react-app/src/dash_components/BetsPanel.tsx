import React, { useState, useEffect, ReactNode } from 'react'

import { DashPanel } from 'dash_components/DashPanel'
import { Colors } from 'common/colors/Colors'
import {
    BetsItem,
    ValBox,
    OddsBox,
    LineBox,
    StatusBox,
    SmallWhiteText,
    LargeWhiteText,
    BetText,
} from 'dash_components/BetsPanelStyles'
import BetLine from 'common/assets/BetLine.png'
import { useAuth0 } from 'react-auth0-spa'
import Loader from 'react-spinners/PulseLoader'
import { LoaderContainer } from './PanelStyles'

// TEMP BETS
const bets = [
    {
        betID: 'test',
        date: new Date(),
        type: 'OVER',
        odds: -100,
        val: 67,
        weatherFeature: 'Total Precip',
        status: 'PENDING',
    },
    {
        betID: 'test',
        date: new Date(),
        type: 'OVER',
        odds: -100,
        val: 44,
        weatherFeature: 'Max Temp',
        status: 'WIN',
    },
    {
        betID: 'test',
        date: new Date(),
        type: 'UNDER',
        odds: 100,
        val: 72,
        weatherFeature: 'Min Temp',
        status: 'LOSS',
    },
    {
        betID: 'test',
        date: new Date(),
        type: 'OVER',
        odds: -100,
        val: 67,
        weatherFeature: 'Total Precip',
        status: 'PENDING',
    },
    {
        betID: 'test',
        date: new Date(),
        type: 'OVER',
        odds: -100,
        val: 44,
        weatherFeature: 'Max Temp',
        status: 'WIN',
    },
    {
        betID: 'test',
        date: new Date(),
        type: 'UNDER',
        odds: 100,
        val: 72,
        weatherFeature: 'Min Temp',
        status: 'LOSS',
    },
]

const convertBetsToJSX = (bets: BetsData[]) => {
    const betItems: ReactNode[] = []

    for (let i = 0; i < bets.length; i++) {
        const element = bets[i][0]
        let weatherColor, statusColor, weatherFeature, statusText

        switch (element.weatherFeature) {
            case 'minTemp':
                weatherColor = Colors.LowTempBlue
                weatherFeature = 'Min Temp.'
                break

            case 'maxTemp':
                weatherColor = Colors.MaxTempRed
                weatherFeature = 'Max Temp.'
                break

            case 'totalPrecip':
                weatherColor = Colors.RainBlue
                weatherFeature = 'Total Precip.'
                break

            case 'maxWind':
                weatherColor = Colors.LightGray
                weatherFeature = 'Max Wind'
                break

            case 'humidity':
                weatherColor = Colors.LightishBlue
                weatherFeature = 'Humidity'
                break

            default:
                weatherColor = 'red'
                break
        }

        switch (element.status) {
            case 'win':
                statusColor = Colors.WinGreen
                statusText = 'WIN'
                break

            case 'loss':
                statusColor = Colors.LossRed
                statusText = 'LOSS'
                break

            case 'pending':
                statusColor = Colors.PendingGray
                statusText = 'PENDING'
                break

            default:
                statusColor = 'red'
                break
        }

        betItems.push(
            <BetsItem key={i}>
                <ValBox style={{ backgroundColor: weatherColor }}>
                    {element.val}
                </ValBox>
                <OddsBox>
                    <SmallWhiteText>UNDER</SmallWhiteText>
                    <LargeWhiteText>{element.odds}</LargeWhiteText>
                </OddsBox>
                <LineBox>
                    <img
                        src={BetLine}
                        alt={'bet results'}
                        style={{ width: '30%', height: 'auto' }}
                    />
                </LineBox>
                <StatusBox style={{ backgroundColor: statusColor }}>
                    {statusText}
                </StatusBox>
                <BetText>
                    <LargeWhiteText>
                        {weatherFeature +
                            ' ' +
                            element.type.toUpperCase() +
                            ' ' +
                            element.val}
                    </LargeWhiteText>
                    <SmallWhiteText>
                        {'Placed on ' +
                            new Date(
                                parseInt(element.date)
                            ).toLocaleDateString()}
                    </SmallWhiteText>
                </BetText>
            </BetsItem>
        )
    }

    return betItems
}

export const BetsPanel = ({ email }: { email: string }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [betItems, setBetItems] = useState<ReactNode[]>()
    const { isAuthenticated } = useAuth0()

    useEffect(() => {
        const getBets = async () => {
            setIsLoading(true)
            const response = await fetch(
                `http://localhost:5000/api/bets/${email}`
            )
            const data: BetsData[] = await response.json()
            setBetItems(convertBetsToJSX(data))
            setIsLoading(false)
        }

        if (isAuthenticated && email !== 'nouser') {
            getBets()
        } else {
            console.log(`auth? ${isAuthenticated}`)
            console.log(`email? ${email}`)
        }
    }, [email, isAuthenticated])

    return !isLoading ? (
        <DashPanel dashLocation={'bets'} dashName={'Your Bets'}>
            {betItems}
        </DashPanel>
    ) : (
        <DashPanel dashLocation={'bets'} dashName={'Your Bets'}>
            <LoaderContainer>
                <Loader size={20} margin={10} color={Colors.White} />
            </LoaderContainer>
        </DashPanel>
    )
}

interface Bet {
    _id?: string
    date: string // Date the bet was for (tomorrow)
    type: string // "OVER"/"UNDER"
    odds: number // i.e. -100
    val: number // i.e. 44
    weatherFeature: string // i.e. "Max Temp"
    status: string // "PENDING"/"WIN"/"LOSS"
}

interface BetsData {
    [index: number]: Bet
}
