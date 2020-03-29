import React from "react";
import styled from "@emotion/styled";

const DashboardContainer = styled.div`
	width: 100%;
	height: 100%;
	background-color: black;
`;

export const Dashboard = () => {
	return (
		<DashboardContainer>
			Welcome to the Scorecast Dashboard
		</DashboardContainer>
	);
};
