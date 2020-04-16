import React, { useState } from 'react'
import { Dropdown, ButtonGroup } from 'react-bootstrap';

export const CityPicker = ({ city, setCity }: Props) => {

  const [isOpen, setIsOpen] = useState(false);

  const cities = [
    "New-York",
    "Los-Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San-Antonio",
    "San-Diego",
    "Dallas",
    "San-Jose",
    "Austin",
    "Jacksonville",
    "San-Fransisco",
    "Charlotte",
    "Indianapolis",
    "Seattle",
    "Denver",
    "Boston",
    "El-Paso",
    "Detroit",
    "Nashville",
    "Portland",
    "Las-Vegas",
    "Baltimore",
    "Albuquerque",
    "Phoenix",
    "Honolulu",
  ]
  
  const dropdownItems = cities.map((cityName) => {
    if (city === cityName) {
      return <Dropdown.Item onClick={() => {setCity(cityName);}} active>{cityName}</Dropdown.Item> 
    } else {
      return <Dropdown.Item onClick={() => {setCity(cityName);}}>{cityName}</Dropdown.Item> 
    }
  })

  return (
    <div style={{gridArea: "topbar", margin: "7px 0px 0px 160px", width: "auto"}}>
      <Dropdown as={ButtonGroup}
        onClick={() => {setIsOpen(!isOpen);}}>
        <Dropdown.Toggle id="city-picker-button" variant="secondary">{city}</Dropdown.Toggle>
        <Dropdown.Menu style={{height: isOpen ? "600px" : "100%", overflowY: "scroll" }}>
          {dropdownItems}
        </Dropdown.Menu>
      </Dropdown>{' '}
    </div>
  )
}

interface Props {
  city: string,
  setCity: (cityName: string) => void,
}