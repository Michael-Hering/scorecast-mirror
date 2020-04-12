import React, { ReactNode } from 'react'
import {
    DashPanelContainer,
    DashPane,
    DashPanelTitle,
    DashPaneItem,
} from 'dash_components/DashPanelStyles'

export const DashPanel = ({ dashLocation, dashName, children }: Props) => {
    return (
        <DashPanelContainer style={{ gridArea: dashLocation }}>
            <DashPanelTitle>{dashName}</DashPanelTitle>
            <DashPane>{children}</DashPane>
        </DashPanelContainer>
    )
}

interface Props {
    dashLocation: string
    dashName: string
    children?: ReactNode
}
