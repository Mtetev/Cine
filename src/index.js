import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';
import Routers from './Routers/Routers';

import './index.css';

class Main extends Component {
	render() {
		return (
			<div>
				<Routers />
			</div>
		);
	}
}

ReactDOM.render(
    <Main />, document.getElementById('root'));
registerServiceWorker();
