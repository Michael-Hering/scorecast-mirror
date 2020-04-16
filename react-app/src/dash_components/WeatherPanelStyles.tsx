import styled from '@emotion/styled'
import { Colors } from 'common/colors/Colors'

export const WeatherContainer = styled.div`
    width: 100%;
    height: 150px;

    display: grid;
    place-items: center center;

    grid-template-areas:
        'a a a'
        'b b c';
`

export const MinMaxContainer = styled.div`
    width: 100%;
    height: 90px;

    display: grid;
    place-items: center center;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
        'min max';
`

export const WeatherItem = styled.div`
    width: 100%;

    display: grid;
    place-items: center center;

    font-style: normal;
    font-weight: bold;

    border: 1px solid ${Colors.Black};
    box-sizing: border-box;
`

export const MinMaxElement = styled.div`
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

export const GraphContainer = styled.div`
    width: 100%;
    height: 150px;
    font-size: 11px;

    background-color: ${Colors.NavyBlue};
    box-sixing: border-box;
`
