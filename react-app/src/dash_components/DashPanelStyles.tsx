import styled from '@emotion/styled'
import { Colors } from 'common/colors/Colors'

export const DashPanelContainer = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;

    font-family: 'Helvetica Nueue', Roboto, Arial, Helvetica, sans-serif;
    font-style: normal;
    color: ${Colors.White};
    font-size: 20px;
`

export const DashPane = styled.div`
    height: 100%;

    overflow-y: scroll;

    background-color: ${Colors.Obsidian};
    border: 5px solid ${Colors.Black};
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.5);
`

//TEXT
export const DashPanelTitle = styled.div`
    margin-bottom: 10px;

    color: ${Colors.DarkWhite};
    font-size: 30px;
    font-weight: bold;
`
