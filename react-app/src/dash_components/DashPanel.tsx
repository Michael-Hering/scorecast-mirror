import React from 'react'
import {
    DashPanelContainer,
    DashPane,
    DashPanelTitle,
} from 'dash_components/DashPanelStyles'

export const DashPanel = ({ dashLocation, dashName }: Props) => {
    return (
        <DashPanelContainer style={{ gridArea: dashLocation }}>
            <DashPanelTitle>{dashName}</DashPanelTitle>
            <DashPane></DashPane>
        </DashPanelContainer>
    )
}

interface Props {
    dashLocation: string
    dashName: string
}
