import React from 'react'
import styled from '@emotion/styled'

export const DashboardContainer = styled.div`
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-columns: 15% 1fr 1fr 1fr 15%;
    grid-template-rows: 50px 1fr 1fr 40px;
    column-gap: 1%;
    row-gap: 5%;
    grid-template-areas:
        'topbar topbar topbar topbar topbar'
        '. weather odds twittertop .'
        '. weather odds twitterbottom .'
        'footer footer footer footer footer ';

    background: linear-gradient(119.36deg, #00577c 0%, #003248 100%);
`
