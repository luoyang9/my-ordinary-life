import React from 'react'
import { observer } from "mobx-react"
import { Row, Col, Button } from 'antd'

import Login from '../components/Login'
import Events from './Events'

@observer
export default class Home extends React.Component {
	constructor(props) {
		super(props);

		this.signIn = () => {
			this.props.userStore.signIn();
		}

		this.logout = () => {
			document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
			this.props.userStore.signOut();
		};
	}

	render() {
		return (
			<div>
				<Row>
					<Col span={24}>
						<div className="container">
							<h1 className="logo_header">my ordinary life</h1>
							{
								this.props.userStore.signedIn && 
									<Button className="btn_logout" onClick={this.logout}>Logout</Button>
							}
							</div>
					</Col>
				</Row>
				{ 
					this.props.userStore.signedIn 
						? <Events eventStore={this.props.eventStore} />
						: <Login signIn={this.signIn} />
				}
			</div>
		);
	}

}