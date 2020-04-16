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

interface Bet {
    betID: string // uuid for bet identification (optional)
    date: Date // Date the bet was for (tomorrow)
    type: string // "OVER"/"UNDER"
    odds: number // i.e. -100
    val: number // i.e. 44
    weatherFeature: string // i.e. "Max Temp"
    status: string // "PENDING"/"WIN"/"LOSS"
}

// TEMP BETS
const bets: Bet[] = [
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

const convertBetsToJSX = (bets: Bet[]) => {
    const betItems: ReactNode[] = []

    for (let i = 0; i < bets.length; i++) {
        const element = bets[i]
        let weatherColor
        let statusColor

        switch (element.weatherFeature) {
            case 'Min Temp':
                weatherColor = Colors.LowTempBlue
                break

            case 'Max Temp':
                weatherColor = Colors.MaxTempRed
                break

            case 'Total Precip':
                weatherColor = Colors.RainBlue
                break

            case 'Wind Speed':
                weatherColor = Colors.LightGray
                break

            case 'Humidity':
                weatherColor = Colors.LightishBlue
                break

            default:
                weatherColor = 'red'
                break
        }

        switch (element.status) {
            case 'WIN':
                statusColor = Colors.WinGreen
                break

            case 'LOSS':
                statusColor = Colors.LossRed
                break

            case 'PENDING':
                statusColor = Colors.PendingGray
                break

            default:
                statusColor = 'red'
                break
        }

        betItems.push(
            <BetsItem>
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
                    {element.status}
                </StatusBox>
                <BetText>
                    <LargeWhiteText>
                        {element.weatherFeature +
                            ' ' +
                            element.type +
                            ' ' +
                            element.val}
                    </LargeWhiteText>
                    <SmallWhiteText>
                        {element.date.toLocaleDateString()}
                    </SmallWhiteText>
                </BetText>
            </BetsItem>
        )
    }

    return betItems
}

export const BetsPanel = () => {
    const [betItems, setBetItems] = useState<ReactNode[]>()

    useEffect(() => {
        const getBets = async () => {
            const userBets = await bets // TODO: replace with API call
            setBetItems(convertBetsToJSX(userBets))
        }

        getBets()
    }, [])

    return (
        <DashPanel dashLocation={'bets'} dashName={'Your Bets'}>
            {betItems}
        </DashPanel>
    )
}
