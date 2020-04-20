import React, { useState, ReactNode } from 'react'
import { Dropdown, ButtonGroup } from 'react-bootstrap'
import { Colors } from 'common/colors/Colors'

import { v4 as uuid } from 'uuid'

export const CityPicker = ({ city, setCity }: Props) => {
    const [isOpen, setIsOpen] = useState(false)

    const cities = [
        'New-York',
        'Los-Angeles',
        'Chicago',
        'Houston',
        'Phoenix',
        'Philadelphia',
        'San-Antonio',
        'San-Diego',
        'Dallas',
        'San-Jose',
        'Austin',
        'Jacksonville',
        'San-Francisco',
        'Charlotte',
        'Indianapolis',
        'Seattle',
        'Denver',
        'Boston',
        'El-Paso',
        'Detroit',
        'Nashville',
        'Portland',
        'Las-Vegas',
        'Baltimore',
        'Albuquerque',
        'Phoenix',
        'Honolulu',
    ]

    const dropdownArray: ReactNode[] = []

    for (let i = 0; i < cities.length; i++) {
        const cityName = cities[i]
        dropdownArray.push(
            cityName === city ? (
                <Dropdown.Item
                    key={uuid()}
                    className="dropdown-item"
                    style={{ color: Colors.White }}
                    onClick={() => {
                        setCity(cityName)
                    }}
                    active
                >
                    {cityName}
                </Dropdown.Item>
            ) : (
                <Dropdown.Item
                    key={uuid()}
                    className="dropdown-item"
                    style={{ color: Colors.White }}
                    onClick={() => {
                        setCity(cityName)
                    }}
                >
                    {cityName}
                </Dropdown.Item>
            )
        )
    }

    return (
        <div
            style={{
                gridArea: 'topbar',
                margin: '7px 0px 0px 160px',
                width: 'auto',
            }}
        >
            <Dropdown
                as={ButtonGroup}
                onClick={() => {
                    setIsOpen(!isOpen)
                }}
            >
                <Dropdown.Toggle id="city-picker-button" variant="secondary">
                    {city}
                </Dropdown.Toggle>
                <Dropdown.Menu
                    id="city-picker-background"
                    style={{
                        height: isOpen ? '600px' : '100%',
                        overflowY: 'scroll',
                        margin: '0',
                    }}
                >
                    {dropdownArray}
                </Dropdown.Menu>
            </Dropdown>{' '}
        </div>
    )
}

interface Props {
    city: string
    setCity: (cityName: string) => void
}
