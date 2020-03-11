import React, { useState, useEffect } from "react";
import Fixture from "./Fixture";
import Matches from "./1920Fixtures";
import styled from "@emotion/styled";


const FixtureListDiv = styled.div`
	padding-top: 10rem;
	padding-bottom: 10rem;
`;

function FixtureList() {

	var event_id = 269;

	var calendar = Matches["vcalendar"];
	var events = calendar[0]["vevent"].slice(event_id + 1, event_id + 9);

	const [fixtures, setFixtures] = useState(events);

	const createFixture = (fixture: any, i: any) => {
		// console.log(fixture);
		var teams = fixture["summary"].split(" v ");
		var location = fixture["location"];
		var timeStart = fixture["dtstart"];

		return (
			<Fixture
				key={i}
				timeStart={timeStart}
				homeTeam={teams[0]}
				awayTeam={teams[1]}
				location={location}
			/>
		);
	}

	return (
		<FixtureListDiv>
			{fixtures.map((fixture: any, i: any) => {
				return createFixture(fixture, i);
			})}
		</FixtureListDiv>
	);
}

export default FixtureList;