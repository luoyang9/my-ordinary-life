import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'


class App extends React.Component {

	render() {
		return (
			<Router>
				<div>
					<ul>
						<li><Link to="/">Home</Link></li>
						<li><Link to="/about">About</Link></li>
					</ul>

					<hr/>

					<Route exact path="/" component={Home}/>
					<Route path="/about" component={About}/>
				</div>
			</Router>
		);
	}

}


ReactDOM.render(<App />, document.getElementById('app'));