import React from 'react'
import { Input, Row, Col, Button } from 'antd'

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
					<Row>
						<Col offset={6} span={12}>
							<Input placeholder="Username" />
						</Col>
					</Row>
					<Row>
						<Col offset={6}  span={12}>
							<Input type="password" placeholder="Password" />
						</Col>
					</Row>
					<Row>
						<Col offset={6} span={12} style={{textAlign: "center"}}>
							<Button>Log In</Button>
						</Col>
					</Row>
				</div>
			);
		}
	}

}