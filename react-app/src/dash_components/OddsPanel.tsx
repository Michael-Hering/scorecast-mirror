import React from 'react'
import { DashPanel } from 'dash_components/DashPanel'
import { Colors } from 'common/colors/Colors'

import { SingleNumberBox } from 'dash_components/OddsPanelStyles'

const MinTempItem = ({ temp }: { temp: number }) => {
    return (
        <SingleNumberBox style={{ backgroundColor: Colors.LowTempBlue }}>
            {temp}
        </SingleNumberBox>
    )
}

export const OddsPanel = () => {
    return (
        <DashPanel dashLocation={'odds'} dashName={"Today's Lines"}>
            <MinTempItem temp={70} />
        </DashPanel>
    )
}
