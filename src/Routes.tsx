import React from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { PageNotFound } from "./pages/PageNotFound";

export const Routes = () => {
	return (
		<Switch>
			<Route exact={true} path="/" component={Home} />
			<Route component={PageNotFound} />
		</Switch>
	);
};
