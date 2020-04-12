import styled from '@emotion/styled'
import { Colors } from 'common/colors/Colors'

export const SingleNumberBox = styled.div`
    height: 100px;
    width: 100%;

    display: grid;
    place-items: center center;

    -webkit-text-stroke: 2px black;

    font-style: normal;
    font-weight: bold;
    font-size: 60px;

    background-color: ${Colors.Obsidian};
    box-sizing: border-box;
    color: ${Colors.White};
`

export const DarkLabel = styled.div`
    height: 50px;
    width: 100%;

    display: grid;
    place-items: center center;

    font-style: normal;
    font-weight: bold;
    font-size: 25px;

    background-color: ${Colors.Obsidian};
    box-sizing: border-box;
    color: ${Colors.White};
`
