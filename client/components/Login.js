import React from 'react'
import { Input, Row, Col, Button } from 'antd'

export default class Login extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			hasAccount: true,
			username: "",
			password: ""
		}

		this.switchView = () => this.setState({hasAccount: !this.state.hasAccount});

		this.handleUserNameChange = (evt) => this.setState({username: evt.target.value});
		this.handlePasswordChange = (evt) => this.setState({password: evt.target.value});

		this.createAccount =() => {
			if(!this.state.username || !this.state.password) {
				return;
			}
			
		};	
	}

	render() {
		return (
			<div className="loginContainer">
				{
					this.state.hasAccount 

						? <div>
							<Row>
								<Col offset={6} span={12}>
									<Input placeholder="Username" onChange={this.handleUserNameChange} value={this.state.username} />
								</Col>
							</Row>
							<Row>
								<Col offset={6}  span={12}>
									<Input type="password" placeholder="Password" onChange={this.handlePasswordChange} value={this.state.password} />
								</Col>
							</Row>
							<Row>
								<Col offset={6} span={12} style={{textAlign: "center"}}>
									<Button>Log In</Button>
								</Col>
							</Row>
							<Row>
								<Col offset={6} span={12} style={{textAlign: "center"}}>
									<p onClick={this.switchView}>Register</p>
								</Col>
							</Row>
						</div>

						: <div>
							<Row>
								<Col offset={6} span={12}>
									<Input placeholder="Username" onChange={this.handleUserNameChange} value={this.state.username} />
								</Col>
							</Row>
							<Row>
								<Col offset={6}  span={12}>
									<Input type="password" placeholder="Password" onChange={this.handlePasswordChange} value={this.state.password} />
								</Col>
							</Row>
							<Row>
								<Col offset={6} span={12} style={{textAlign: "center"}}>
									<Button>Create Account</Button>
								</Col>
							</Row>
							<Row>
								<Col offset={6} span={12} style={{textAlign: "center"}}>
									<p onClick={this.switchView}>Log In</p>
								</Col>
							</Row>
						</div>
				}
			</div>
		);
	}
}