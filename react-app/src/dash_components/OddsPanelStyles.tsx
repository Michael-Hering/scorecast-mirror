import styled from '@emotion/styled'
import { Colors } from 'common/colors/Colors'

export const OddsItem = styled.div`
    width: 100%;

    display: grid;
    place-items: center center;

    font-style: normal;
    font-weight: bold;

    border: 1px solid ${Colors.Black};
    box-sizing: border-box;
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
        'place place';
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

export const OddsLoadingContainer = styled.div`
    grid-area: place;

    width: 100%;
    height: 100%;

    display: grid;
    place-items: center center;
`

export const BetPlacedText = styled.div`
    color: ${Colors.BrightGreen};
`
