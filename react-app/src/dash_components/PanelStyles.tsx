import styled from '@emotion/styled'
import { Colors } from 'common/colors/Colors'

export const DarkLabel = styled.div`
    width: 100%;
    height: 50px;

    display: grid;
    place-items: center center;

    font-size: 25px;

    background-color: ${Colors.Obsidian};
    color: ${Colors.White};
`

export const DarkLabelButtonContainer = styled.div`
    width: 100%;
    height: 60px;

    display: grid;

    place-items: center center;

    text-align: center;

    grid-template-columns: 1fr 2fr 1fr;
    grid-template-areas: 'empty label button';
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

export const SmallBlueTextButton = styled.div`
    font-size: 12px;

    display: grid;
    place-items: center center;

    background-color: ${Colors.Obsidian};
    color: ${Colors.BrightBlue};
    cursor: pointer;
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

export const LoaderContainer = styled.div`
    width: 100%;
    height: 100%;

    display: grid;
    place-items: center center;
`

export const VerySmallWhiteText = styled.div`
    font-size: 16px;
    font-weight: ligher;
`

export const SmallWhiteText = styled.div`
    font-size: 20px;
`

export const MediumWhiteText = styled.div`
    font-size: 30px;
`

export const LargeWhiteText = styled.div`
    font-size: 40px;
`
