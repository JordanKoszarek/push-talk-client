import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TopBar from './components/TopBar';
import {Route, Switch} from 'react-router-dom';
import EnvHelper from './helpers/EnvHelper';
import Record from './components/audio/Record';
import Playback from './components/audio/Playback';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCloud, faMicrophone, faPause, faPlay, faSpinner, faWindowClose} from '@fortawesome/free-solid-svg-icons'

library.add(faPlay);
library.add(faPause);
library.add(faWindowClose);
library.add(faMicrophone);
library.add(faCloud);
library.add(faSpinner);

class App extends Component {

	componentWillMount() {
		EnvHelper.initHistory(this.context.router.history);
	}

	render() {
		return (
			<div className="App">
				<TopBar/>
				<Switch>
					<Route exact path="/" component={Record}/>
					<Route exact path="/record" component={Record}/>
					<Route exact path="/playback" component={Playback}/>
				</Switch>
			</div>
		);
	}
}

App.contextTypes = {
	router: PropTypes.object.isRequired,
};

export default App;
