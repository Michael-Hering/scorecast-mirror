import React, { useState } from 'react'
import { DashPanel } from 'dash_components/DashPanel'
import { Colors } from 'common/colors/Colors'

import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { WeatherContainer, MinMaxElement, GraphContainer, WeatherItem, MinMaxContainer } from './WeatherPanelStyles';
import { DarkLabel, SmallBlueTextButton, DarkLabelButtonContainer, VerySmallWhiteText, SmallWhiteText, MediumWhiteText } from './PanelStyles';

const temp_data = [
    {hour: '00', value: 25}, 
    {hour: '01', value: 50}, 
    {hour: '02', value: 75}, 
    {hour: '03', value: 55},
    {hour: '04', value: 60},
    {hour: '05', value: 22},
    {hour: '06', value: 45},
    {hour: '07', value: 35},
    {hour: '08', value: 65},
    {hour: '09', value: 12},
    {hour: '10', value: 58},
    {hour: '11', value: 78},
    {hour: '12', value: 35},
    {hour: '13', value: 45},
    {hour: '14', value: 36},
    {hour: '15', value: 48},
    {hour: '16', value: 49},
    {hour: '17', value: 50},
    {hour: '18', value: 65},
    {hour: '19', value: 42},
    {hour: '20', value: 17},
    {hour: '21', value: 32},
    {hour: '22', value: 84},
    {hour: '23', value: 55},
    {hour: '24', value: 55},

]

const xticks = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];

interface DataItem {
    hour: String,
    value: Number
}

enum ItemType {
    TEMP,
    PRECIP,
    WIND,
    HUMIDITY,
}

const ForecastGraph = ({data}: {data: Array<DataItem>}) => {
    return (
        <GraphContainer>
            <ResponsiveContainer width="99%" height="100%">
                <BarChart data={data}>
                    <XAxis dataKey="hour" stroke={Colors.LightGray} axisLine={false} tickMargin={6} ticks={xticks} minTickGap={0}/>
                    <Tooltip />
                    <Bar dataKey="value" fill={Colors.LightGray} barSize={10} />
                </BarChart>
            </ResponsiveContainer>
        </GraphContainer>
    )
}

const MinMax = ({min, max}: {min: number, max: number}) => {
    return (
        <MinMaxContainer>
            <MinMaxElement style={{gridArea: 'min'}}>
                <VerySmallWhiteText>MIN</VerySmallWhiteText>
                <MediumWhiteText>{min}</MediumWhiteText>
            </MinMaxElement>
            <MinMaxElement style={{gridArea: 'max'}}>
                <VerySmallWhiteText>MAX</VerySmallWhiteText>
                <MediumWhiteText>{max}</MediumWhiteText>
            </MinMaxElement>
        </MinMaxContainer>
    )
}

const PanelItem = ({min, max, data, type}: {min: number, max: number, data: Array<DataItem>, type: ItemType}) => {
    const [isShowingHistogram, setIsShowingHistogram] = useState(false);

    const showHistogramClicked = () => {
        setIsShowingHistogram(!isShowingHistogram);
    }
    
    let labelString: string = ''

    switch (type) {
        case ItemType.TEMP:
            labelString = "Forecast Temp. (°F)"
            break

        case ItemType.HUMIDITY:
            labelString = "Forecast Humidity (%)"
            break

        case ItemType.WIND:
            labelString = "Forecast Wind Speed (mph)"
            break
        
        case ItemType.PRECIP:
            labelString = "Forecast Precipitation (in.)"
            break
    }

    return (
        <WeatherItem>
            {!isShowingHistogram && <MinMax min={min} max={max}></MinMax>}
            {isShowingHistogram && <ForecastGraph data={data}/>}
            <DarkLabelButtonContainer>
                <SmallWhiteText style={{gridArea: "label"}}>{labelString}</SmallWhiteText>
                <SmallBlueTextButton style={{gridArea: "button"}} onClick={showHistogramClicked}>
                    {isShowingHistogram ? 'Hide Histogram' : 'Show Histogram'}
                </SmallBlueTextButton>
            </DarkLabelButtonContainer>
        </WeatherItem>
    )
}

export const WeatherPanel = () => {
    return (
        <DashPanel dashLocation={'weather'} dashName={'Weather Report'}>
            <PanelItem data={temp_data} type={ItemType.TEMP} min={12} max={85}/>
            <PanelItem data={temp_data} type={ItemType.PRECIP} min={12} max={85}/>
            <PanelItem data={temp_data} type={ItemType.WIND} min={12} max={85}/>
            <PanelItem data={temp_data} type={ItemType.HUMIDITY} min={12} max={85}/>
        </DashPanel>
    )
}