import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import FrontPage from "../containers/FrontPage/FrontPage";
import MovieInformation from '../containers/MovieInfomation/MovieInformation';

const Routers = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path={"/:number"} component= { MovieInformation } />
				<Route path={"/"} component = { FrontPage } />
			</Switch>
		</BrowserRouter>
	)
}

export default Routers;