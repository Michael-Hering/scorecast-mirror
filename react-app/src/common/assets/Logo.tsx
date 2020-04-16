import React, { CSSProperties } from 'react'
// import { useHistory } from 'react-router-dom'

export const Logo = (props: Props) => {
    // const history = useHistory()

    // const goToHome = () => {
    //     history.push('')
    // }

    // if (props.style) {
    //     props.style.cursor = 'pointer'
    // }

    return (
        <svg
            width="97"
            height="90"
            viewBox="0 0 97 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={props.style}
        >
            <circle
                cx="46.6727"
                cy="44.8385"
                r="43.3385"
                fill="#00B2FF"
                stroke="black"
                strokeWidth="3"
            />
            <rect
                x="1.5"
                y="24.2227"
                width="27.2981"
                height="12.4512"
                rx="6.22559"
                fill="white"
                stroke="black"
                strokeWidth="3"
            />
            <rect
                x="53.3069"
                y="67.8491"
                width="27.2981"
                height="12.4512"
                rx="6.22559"
                fill="white"
                stroke="black"
                strokeWidth="3"
            />
            <rect
                x="1.5"
                y="53.3071"
                width="45.8287"
                height="12.4512"
                rx="6.22559"
                fill="white"
                stroke="black"
                strokeWidth="3"
            />
            <rect
                x="35.1292"
                y="9.68018"
                width="45.8287"
                height="12.4512"
                rx="6.22559"
                fill="white"
                stroke="black"
                strokeWidth="3"
            />
            <rect
                x="49.6714"
                y="38.7646"
                width="45.8287"
                height="12.4512"
                rx="6.22559"
                fill="white"
                stroke="black"
                strokeWidth="3"
            />
        </svg>
    )
}

interface Props {
    style?: CSSProperties
}
