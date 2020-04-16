import React, { useState } from 'react'
import { DashPanel } from 'dash_components/DashPanel'
import { Colors } from 'common/colors/Colors'

import {
    SingleNumberBox,
    DarkLabel,
    BlueTextButton,
    OddsItem,
    OddsContainer,
    OddsElement,
    SmallWhiteText,
    LargeWhiteText,
} from 'dash_components/OddsPanelStyles'

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

export const OddsPanel = () => {
    return (
        <DashPanel dashLocation={'odds'} dashName={"Today's Lines"}>
            <PanelItem val={70} type={ItemType.MINTEMP} />
            <PanelItem val={80} type={ItemType.MAXTEMP} />
            <PanelItem val={4.1} type={ItemType.PRECIP} />
            <PanelItem val={34} type={ItemType.WIND} />
            <PanelItem val={77} type={ItemType.HUMIDITY} />
        </DashPanel>
    )
}
