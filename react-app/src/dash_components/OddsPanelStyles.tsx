import styled from '@emotion/styled'
import { Colors } from 'common/colors/Colors'

export const OddsItem = styled.div`
    width: 100%;

    display: grid;
    place-items: center center;

    font-style: normal;
    font-weight: bold;
`

export const SingleNumberBox = styled.div`
    width: 100%;
    height: 110px;

    display: grid;
    place-items: center center;

    -webkit-text-stroke: 2.5px black;

    font-size: 60px;

    background-color: ${Colors.Obsidian};
    color: ${Colors.White};
`

export const DarkLabel = styled.div`
    width: 100%;
    height: 50px;

    display: grid;
    place-items: center center;

    font-size: 25px;

    background-color: ${Colors.Obsidian};
    color: ${Colors.White};
`

export const BlueTextButton = styled.div`
    width: 100%;
    height: 50px;

    display: grid;
    place-items: center center;

    font-size: 20px;

    background-color: ${Colors.Obsidian};
    color: ${Colors.BrightBlue};
    cursor: pointer;
`

export const OddsContainer = styled.div`
    width: 100%;
    height: 150px;

    display: grid;
    place-items: center center;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 50px;
    grid-template-areas:
        'under over'
        'bunder bover';
`

export const OddsElement = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;

    text-align: center;

    background-color: ${Colors.NavyBlue};
    border: 1px solid ${Colors.Black};
    box-sizing: border-box;
`

export const SmallWhiteText = styled.div`
    font-size: 20px;
`

export const LargeWhiteText = styled.div`
    font-size: 40px;
`
