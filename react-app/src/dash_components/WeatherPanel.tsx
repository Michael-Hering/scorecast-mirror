import React, { useState, useEffect } from 'react'
import { DashPanel } from 'dash_components/DashPanel'
import { Colors } from 'common/colors/Colors'

import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { MinMaxElement, GraphContainer, WeatherItem, MinMaxContainer, TooltipContainer, TooltipText } from './WeatherPanelStyles';
import { SmallBlueTextButton, DarkLabelButtonContainer, VerySmallWhiteText, SmallWhiteText, MediumWhiteText } from './PanelStyles';

interface DataItem {
    name: string,
    temp: number,
    precip: number,
    humidity: number,
    wind: number
}

interface WeatherData {
    id: number,
    main: string,
    description: string,
    icon: string
}

interface HourlyData {
    time: number,
    windspeed: number,
    weather: WeatherData[],
    humidity: number,
    rain: number,
    snow: number,
    temp: number
}

enum ItemType {
    TEMP,
    PRECIP,
    WIND,
    HUMIDITY,
}

// const renderCustomBarLabel = ({payload, x, y, width, height, index, value}: any) => { // NOTE: any the use of any is general frowned up but need for the functions passed into rechart library (all guides I saw had this)
//     const hour = new Date().getHours()
//     console.log(payload)
//     if (index === hour) {
//         return <text x={x + width / 2} y={y} fill={Colors.White} textAnchor="middle" dy={-6}>{value}</text>;
//     }
// }

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

const ForecastGraph = ({data, dataKey}: {data: Array<DataItem>, dataKey: string}) => {

    return (
        <GraphContainer>
            <ResponsiveContainer width="99%" height="100%">
                <BarChart data={data}>
                    <XAxis dataKey="name" stroke={Colors.White} axisLine={false} tickMargin={6} minTickGap={-1}/>
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey={dataKey} fill={Colors.White} barSize={10}>
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
    
    let labelString: string = ''
    let dataKey: string =''

    switch (type) {
        case ItemType.TEMP:
            labelString = "Forecast Temp. (°F)"
            dataKey = 'temp'
            break

        case ItemType.HUMIDITY:
            labelString = "Forecast Humidity (%)"
            dataKey = 'humidity'
            break

        case ItemType.WIND:
            labelString = "Forecast Wind Speed (m/s)"
            dataKey = 'wind'
            break
        
        case ItemType.PRECIP:
            labelString = "Forecast Precipitation (in.)"
            dataKey = 'precip'
            break
    }

    return (
        <WeatherItem>
            {!isShowingHistogram && <MinMax min={min} max={max}></MinMax>}
            {isShowingHistogram && <ForecastGraph data={data} dataKey={dataKey}/> }
            <DarkLabelButtonContainer>
                <SmallWhiteText style={{gridArea: "label"}}>{labelString}</SmallWhiteText>
                <SmallBlueTextButton style={{gridArea: "button"}} onClick={showHistogramClicked}>
                    {isShowingHistogram ? 'Hide Histogram' : 'Show Histogram'}
                </SmallBlueTextButton>
            </DarkLabelButtonContainer>
        </WeatherItem>
    )
}

export const WeatherPanel = ({ city }: { city: string }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState<DataItem[]>([])

    const [minTemp, setMinTemp] = useState(0)
    const [maxTemp, setMaxTemp] = useState(0)
    const [minWind, setMinWind] = useState(0)
    const [maxWind, setMaxWind] = useState(0)
    const [minPrecip, setMinPrecip] = useState(0)
    const [maxPrecip, setMaxPrecip] = useState(0)
    const [minHumidity, setMinHumidity] = useState(0)
    const [maxHumidity, setMaxHumidity] = useState(0)


    useEffect(() => {
        const getHourlyData = async () => {
            setIsLoading(true)

            console.log('getting hourly data')
            const response = await fetch(
                `http://localhost:5000/hourly/${city.toLowerCase()}`
            )
            const res = await response.json()
            
            var objArray: DataItem[] = []

            res.slice(0, 23).map((i: HourlyData, index: number) => {
                var date = new Date(i.time * 1000)
                var hour = date.getHours().toString()
                
                var myObj = { name: hour, precip: i.rain + i.snow, temp: i.temp, humidity: i.humidity, wind: i.windspeed }

                objArray.push(myObj)

                return i;
            }) 

            var lowTemp = Number.POSITIVE_INFINITY
            var highTemp = Number.NEGATIVE_INFINITY
            var lowHumid = Number.POSITIVE_INFINITY
            var highHumid = Number.NEGATIVE_INFINITY
            var lowPrecip = Number.POSITIVE_INFINITY
            var highPrecip = Number.NEGATIVE_INFINITY
            var lowWind = Number.POSITIVE_INFINITY
            var highWind = Number.NEGATIVE_INFINITY

            objArray.forEach(obj => {
                var temp = obj.temp
                var humid = obj.humidity
                var precip = obj.precip
                var wind = obj.wind

                if(temp < lowTemp) {
                    lowTemp = temp
                }

                if(temp > highTemp) {
                    highTemp = temp
                }

                if(humid < lowHumid) {
                    lowHumid = humid
                }

                if(humid > highHumid) {
                    highHumid = humid
                }

                if(wind < lowWind) {
                    lowWind = wind
                }

                if(wind > highWind) {
                    highWind = wind
                }

                if(precip < lowPrecip) {
                    lowPrecip = precip
                }

                if(precip > highPrecip) {
                    highPrecip = precip
                }
            })

            setIsLoading(false)
            setData(objArray)
            setMinTemp(lowTemp)
            setMaxTemp(highTemp)
            setMinHumidity(lowHumid)
            setMaxHumidity(highHumid)
            setMinWind(lowWind)
            setMaxWind(highWind)
            setMinPrecip(lowPrecip)
            setMaxPrecip(highPrecip)
        }

        getHourlyData()
    }, [city])

    return !isLoading ? (
        <DashPanel dashLocation={'weather'} dashName={'Weather Report'}>
            <PanelItem data={data} type={ItemType.TEMP} min={minTemp} max={maxTemp}/>
            <PanelItem data={data} type={ItemType.PRECIP} min={minPrecip} max={maxPrecip}/>
            <PanelItem data={data} type={ItemType.WIND} min={minWind} max={maxWind}/>
            <PanelItem data={data} type={ItemType.HUMIDITY} min={minHumidity} max={maxHumidity}/>
        </DashPanel>
    ) : <DashPanel dashLocation={'weather'} dashName={'Weather Report'}></DashPanel>

}