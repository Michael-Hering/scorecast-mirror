import * as React from 'react';
import Fixture from './Fixture';
import Matches from './1920Fixtures';
import styled from "@emotion/styled";


interface FixtureListProps { }

const FixtureListDiv = styled.div`
    padding-top: 10rem;
    padding-bottom: 10rem;
`;

export default class FixtureList extends React.Component<FixtureListProps> {
    fixtures: any[] = [];
    event_id = 269;
    
    constructor(props: FixtureListProps) {
        super(props);
        this.fixtures = this.fixtures.concat(this.getFixtureData());
        // console.log(this.getFixtureData());

        console.log(this.fixtures);
    }

    getFixtureData(): any[] {
        var calendar = Matches["vcalendar"];
        var events = calendar[0]["vevent"];

        return events.slice(this.event_id+1, this.event_id+9);
    }

    createFixture(fixture: any, i: any) {
        var teams = fixture["summary"].split(" v ");
        var location = fixture["location"];
        var timeStart = fixture["dtstart"];

        return <Fixture key={i} timeStart={timeStart} homeTeam={teams[0]} awayTeam={teams[1]} location={location}/>;
    }

    // createFixtures() {
    //     return this.fixtures.map(fixture => {
    //         return this.createFixture(fixture);
    //     })
    // }

    render() {
        return (
            <FixtureListDiv>
                {this.fixtures.map((fixture, i) => {
                    return this.createFixture(fixture, i);
                })}
            </FixtureListDiv>
        );
    }
}