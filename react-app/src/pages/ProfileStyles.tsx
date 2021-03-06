import styled from '@emotion/styled'
import { Colors } from 'common/colors/Colors'

export const ProfileContainer = styled.div`
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-columns: 20vw 1fr 1fr 20vw;
    grid-template-rows: 50px minmax(0, 1fr) minmax(0, 1fr) 40px;
    column-gap: 1%;
    row-gap: 5%;
    grid-template-areas:
        'topbar topbar topbar topbar'
        '. profile bets .'
        '. settings bets .'
        '. . . . ';

    /* Scale gutters for smaller screens */
    @media screen and (max-width: 1900px) {
        grid-template-columns: 2vw 1fr 1fr 2vw;
    }

    background: linear-gradient(119.36deg, #00577c 0%, #003248 100%);

    overflow-y: hidden;

    cursor: default;
`

export const ProfileInfo = styled.div`
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-columns: 1fr 1fr;
    place-items: center center;
`

export const ProfileActions = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;

    text-align: center;

    font-size: 40px;
    font-weight: bold;
`

export const BlueButton = styled.div`
    margin-top: 20px;

    font-size: 30px;
    font-weight: bold;

    cursor: pointer;
    color: ${Colors.BrightBlue};
`

export const ThemeSwitcher = styled.div`
    width: 100%;

    display: grid;
    grid-template-rows: auto auto auto;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
        'title title'
        'dark light'
        'subtext subtext';
    place-items: center center;
`

export const AccountManagement = styled.div`
    width: 100%;

    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas:
        'title'
        'delete'
        'subtext';
    place-items: center center;
`

export const TitleText = styled.div`
    grid-area: title;

    margin-top: 10px;
    margin-bottom: 10px;

    display: grid;
    place-items: center center;

    font-size: 35px;
    font-weight: bold;
`

export const SubText = styled.div`
    grid-area: subtext;

    margin-top: 10px;
    margin-bottom: 10px;

    display: grid;
    place-items: center center;

    font-weight: normal;
    font-style: italic;
    font-size: 20px;
`
