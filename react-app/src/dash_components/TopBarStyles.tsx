import styled from '@emotion/styled'
import { Colors } from 'common/colors/Colors'

export const TopBarContainer = styled.div`
    grid-area: topbar;

    width: 100%;
    height: 100%;

    display: grid;
    grid-template-columns: 50px 90px auto 120px;
    grid-template-areas: 'logo name city profile';
    place-items: center start;

    background-color: ${Colors.Obsidian};
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.4);

    font-family: 'Helvetica Nueue', Roboto, Arial, Helvetica, sans-serif;
    font-style: normal;
    color: ${Colors.White};
    font-size: 20px;

    cursor: default;
`

export const LogoText = styled.div`
    grid-area: name;
    font-weight: normal;
`

export const CityContainer = styled.div`
    grid-area: city;

    display: flex;
    flex-direction: row;
    align-items: center;
`

export const CityText = styled.div`
    font-weight: bold;
    margin-left: 5px;
`

export const ChangeCity = styled.div`
    margin-left: 5px;
    font-size: 17px;
    cursor: pointer;
    color: ${Colors.BrightBlue};
`

export const ProfileBox = styled.div`
    grid-area: profile;
    place-self: center center;

    height: 80%;
    width: 90%;

    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-areas: 'profile pic';
    place-items: center center;

    cursor: pointer;

    background-color: ${Colors.LightObsidian};
    border: 2px solid ${Colors.Black};
    box-sizing: border-box;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
    border-radius: 99px;
`

export const ProfileText = styled.div`
    grid-area: profile;

    font-size: 15px;
`
