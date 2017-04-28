import React from 'react'

import Login from 'components/Login'

export default class Home extends React.Component {

	render() {
		if(this.props.user) {
			return <div>signed in</div>
		} else {
			return (
				<Login />
			);
		}
	}

}