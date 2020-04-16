import React, { useState } from 'react'
import { DashPanel } from 'dash_components/DashPanel'
import { Colors } from 'common/colors/Colors'

import { BarChart, Bar, Cell, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { MinMaxElement, GraphContainer, WeatherItem, MinMaxContainer, TooltipContainer, TooltipText } from './WeatherPanelStyles';
import { SmallBlueTextButton, DarkLabelButtonContainer, VerySmallWhiteText, SmallWhiteText, MediumWhiteText } from './PanelStyles';

const temp_data = [
    {name: '00', value: 25}, 
    {name: '01', value: 50}, 
    {name: '02', value: 75}, 
    {name: '03', value: 55},
    {name: '04', value: 60},
    {name: '05', value: 22},
    {name: '06', value: 45},
    {name: '07', value: 35},
    {name: '08', value: 65},
    {name: '09', value: 12},
    {name: '10', value: 58},
    {name: '11', value: 78},
    {name: '12', value: 35},
    {name: '13', value: 45},
    {name: '14', value: 36},
    {name: '15', value: 48},
    {name: '16', value: 49},
    {name: '17', value: 50},
    {name: '18', value: 65},
    {name: '19', value: 42},
    {name: '20', value: 17},
    {name: '21', value: 32},
    {name: '22', value: 84},
    {name: '23', value: 55},
    {name: '24', value: 55},

]

const xticks = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];

interface DataItem {
    name: String,
    value: Number
}

enum ItemType {
    TEMP,
    PRECIP,
    WIND,
    HUMIDITY,
}

const renderCustomBarLabel = ({payload, x, y, width, height, index, value}: any) => { // NOTE: any the use of any is general frowned up but need for the functions passed into rechart library (all guides I saw had this)
    const hour = new Date().getHours()
    if (index === hour) {
        return <text x={x + width / 2} y={y} fill={Colors.White} textAnchor="middle" dy={-6}>{value}</text>;
    }
}

function CustomTooltip({payload, label, active}: any) { // See same NOTE above - https://recharts.org/en-US/guide/customize
    if(active) {
        return (
            <TooltipContainer>
                <TooltipText>{payload[0].value}</TooltipText>
            </TooltipContainer>
        )
    }

    return null
}

const ForecastGraph = ({data}: {data: Array<DataItem>}) => {
    const date = new Date()
    const [currentHour, setCurrentHour] = useState(date.getHours())

    return (
        <GraphContainer>
            <ResponsiveContainer width="99%" height="100%">
                <BarChart data={data}>
                    <XAxis dataKey="name" stroke={Colors.LightGray} axisLine={false} tickMargin={6} ticks={xticks} minTickGap={0}/>
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill={Colors.LightGray} barSize={10} label={renderCustomBarLabel}>
                        {
                            data.map((entry, index) => (
                                <Cell fill={index === currentHour ? Colors.White : Colors.LightGray} key={'cell-${index}'}/>
                            ))
                        }
                    </Bar>
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
    const [isShowingHistogram, setIsShowingHistogram] = useState(false)

    const showHistogramClicked = () => {
        setIsShowingHistogram(!isShowingHistogram);
    }
    
    let backgroundColor: string = ''
    let labelString: string = ''

    switch (type) {
        case ItemType.TEMP:
            labelString = "Forecast Temp. (°F)"
            backgroundColor = Colors.Obsidian;
            break

        case ItemType.HUMIDITY:
            labelString = "Forecast Humidity (%)"
            backgroundColor = Colors.LightishBlue;
            break

        case ItemType.WIND:
            labelString = "Forecast Wind Speed (mph)"
            backgroundColor = Colors.LightGray
            break
        
        case ItemType.PRECIP:
            labelString = "Forecast Precipitation (in.)"
            backgroundColor = Colors.RainBlue
            break
    }

    return (
        <WeatherItem>
            {!isShowingHistogram && <MinMax min={min} max={max}></MinMax>}
            {isShowingHistogram && <ForecastGraph data={data}/> }
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
            <PanelItem data={temp_data} type={ItemType.PRECIP} min={1} max={5}/>
            <PanelItem data={temp_data} type={ItemType.WIND} min={12} max={85}/>
            <PanelItem data={temp_data} type={ItemType.HUMIDITY} min={40} max={80}/>
        </DashPanel>
    )
}