import React from 'react'
import { DashPanel } from 'dash_components/DashPanel'
import { Colors } from 'common/colors/Colors'

import { SingleNumberBox, DarkLabel } from 'dash_components/OddsPanelStyles'

const MinTempItem = ({ temp }: { temp: number }) => {
    return (
        <SingleNumberBox style={{ backgroundColor: Colors.LowTempBlue }}>
            {temp}
        </SingleNumberBox>
    )
}

const MaxTempItem = ({ temp }: { temp: number }) => {
    return (
        <SingleNumberBox style={{ backgroundColor: Colors.MaxTempRed }}>
            {temp}
        </SingleNumberBox>
    )
}

export const OddsPanel = () => {
    return (
        <DashPanel dashLocation={'odds'} dashName={"Today's Lines"}>
            <MinTempItem temp={70} />
            <DarkLabel>Tomorrow's Min Temp. (°F)</DarkLabel>
            <MaxTempItem temp={80} />
            <DarkLabel>Tomorrow's Max Temp. (°F)</DarkLabel>
            <MinTempItem temp={70} />
        </DashPanel>
    )
}
