import * as React from 'react';
import styled from "@emotion/styled";

/**
 * TODO:
 *      Figure out global css in Emotion.
 */


interface FixtureProps {
    timeStart: String,
    homeTeam: String,
    awayTeam: String,
    location: String
}

interface FixtureState {
    listOpen: boolean,
    homeTeam: String,
    awayTeam: String,
    location: String,
    date: Date
}

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    /* padding: 0 0.25%; */
    width: 40%;
    height: auto;
    margin: 0 auto;
    border-bottom: 0.5px solid lightgrey;
    border-left: 1px solid lightgrey;
    border-right: 1px solid lightgrey;
    border-top: 1px solid lightgrey;
    &:hover {
        cursor: pointer;
    }
`;

const FixtureP = styled.p`
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    vertical-align: middle;
`;

const FixtureInfo = styled.div`
    height: 50px;
    padding-bottom: 1em 0;
`;

const Break = styled.div`
    flex-basis: 100%;
    height: 0;
`;

const FixtureDisplay = styled.div`
    flex-basis: 100%;
    text-align: center;
`;

const Badge = styled.img`
    width: 50px;
    vertical-align: middle;
    margin: 0 7.5em;
    @media screen and (max-width: 1500px) {
        margin: 0 5em;
    }
    
    @media screen and (max-width: 1090px) {
        margin: 0 2em;
    }
`;

const FixtureInfoList = styled.div`
    box-sizing: border-box;
    width: 100%;
    background: #F7F7F7;
    border-top: 0.5px solid lightgrey;
    border-left: 1px solid lightgrey;
    border-right: 1px solid lightgrey;
`;

const FixtureInfoUl = styled.ul`
    padding: 0;
    list-style-type: none;
    text-align: center;
`;

const FixtureText = styled.p`
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
`;

export default class Fixture extends React.Component<FixtureProps, FixtureState> {

    constructor(props: FixtureProps) {
        super(props);

        var dateString = "" + props.timeStart;
        var year = dateString.substring(0,4);
        var month = dateString.substring(4,6);
        var day = dateString.substring(6,8);

        this.state = {
            listOpen: false,
            homeTeam: props.homeTeam, 
            awayTeam: props.awayTeam,
            location: props.location,
            date: new Date(+year, +month - 1, +day)
        };
    }

    toggleList() {
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }));
    }
    
    render() {
        return (
            <Container onClick={() => this.toggleList()}>
                <FixtureDisplay>
                    <FixtureP><Badge src={process.env.PUBLIC_URL + '/pl-badges/' + this.state.homeTeam + '.png'} alt="home team badge"/>  - <Badge src={process.env.PUBLIC_URL + '/pl-badges/' + this.state.awayTeam + '.png'} alt="away team badge"/></FixtureP>
                </FixtureDisplay>
                <div className="break"></div>
                <FixtureInfo>
                    <FixtureText>{this.state.date.toDateString()} - {this.state.location}</FixtureText>
                </FixtureInfo>
                <Break/>
                <FixtureInfoList>
                    {this.state.listOpen && <FixtureInfoUl>
                        <li className="fi-list-item">Hello</li>
                    </FixtureInfoUl>}
                </FixtureInfoList>
            </Container>
        );
    }
}