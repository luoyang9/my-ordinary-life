import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Nav from './components/Nav'
import Home from './pages/Home'
import About from './pages/About'


class App extends React.Component {

	render() {
		return (
			<Router>
				<div>
					<Nav />

					<Route exact path="/" component={Home}/>
					<Route path="/about" component={About}/>
				</div>
			</Router>
		);
	}

}


ReactDOM.render(<App />, document.getElementById('app'));