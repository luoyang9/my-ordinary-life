import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Nav from './components/Nav'
import Home from './pages/Home'
import About from './pages/About'
import Events from './pages/Events'

import userStore from './stores/UserStore'
import eventStore from './stores/EventStore'

export default class App extends React.Component {

	render() {
		return (
			<Router>
				<div>
					<Nav />
					<Route exact path="/" render={() => 
						<Home userStore={userStore} eventStore={eventStore} />
					} />
					<Route path="/about" component={About} />
				</div>
			</Router>
		);
	}

}