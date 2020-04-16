import styled from '@emotion/styled'
import { Colors } from 'common/colors/Colors'

export const BetsItem = styled.div`
    width: 100%;

    display: grid;
    grid-template-columns: 1fr 1fr auto 2fr;
    place-items: center center;

    font-style: normal;
    font-weight: bold;

    border: 1px solid ${Colors.Black};
    box-sizing: border-box;
`

export const ValBox = styled.div`
    width: 100%;
    height: 110px;

    display: grid;
    place-items: center center;

    -webkit-text-stroke: 2.5px black;

    font-size: 50px;

    background-color: ${Colors.Obsidian};
    color: ${Colors.White};
`

export const OddsBox = styled.div`
    width: 100%;
    height: 110px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    text-align: center;

    background-color: ${Colors.NavyBlue};
`

export const LineBox = styled.div`
    width: 100%;

    display: grid;
    place-items: center center;

    background-color: ${Colors.LightObsidian};
`

export const StatusBox = styled.div`
    width: 100%;

    display: grid;
    place-items: center center;

    text-align: center;

    background-color: ${Colors.DarkWhite};
`

export const SmallWhiteText = styled.div`
    font-size: 20px;
`

export const LargeWhiteText = styled.div`
    font-size: 40px;
`
