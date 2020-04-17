import styled from '@emotion/styled'

export const DashboardContainer = styled.div`
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-columns: 10vw 1fr 1fr 1fr 10vw;
    grid-template-rows: 50px minmax(0, 1fr) minmax(0, 1fr) 40px;
    column-gap: 1%;
    row-gap: 5%;
    grid-template-areas:
        'topbar topbar topbar topbar topbar'
        '. weather odds twitter .'
        '. weather odds twitter .'
        '. . . . . ';

    /* Scale gutters for smaller screens */
    @media screen and (max-width: 1900px) {
        grid-template-columns: 2vw 1fr 1fr 1fr 2vw;
    }

    background: linear-gradient(119.36deg, #00577c 0%, #003248 100%);

    overflow-y: hidden;

    cursor: default;
`
