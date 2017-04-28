import React from 'react'
import { Row, Col } from 'antd'

import Login from '../components/Login'

export default class Home extends React.Component {

	render() {
		if(this.props.user) {
			return <div>signed in</div>
		} else {
			return (
				<div>
					<Row>
						<Col offset={6} span={12}>
							<h1 style={{textAlign: "center"}}>Timeline</h1>
						</Col>
					</Row>
					<Login />
				</div>
			);
		}
	}

}