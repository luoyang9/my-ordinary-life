import React from 'react'
import { Input, Row, Col, Button } from 'antd'
import moment from 'moment'
import api from '../api.js'

export default class Login extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			hasAccount: true,
			email: "",
			password: "",
			name: "",
			error: "",
		}

		this.switchView = () => this.setState({hasAccount: !this.state.hasAccount, error: ""});

		this.handleEmailChange = (evt) => this.setState({email: evt.target.value});
		this.handlePasswordChange = (evt) => this.setState({password: evt.target.value});
		this.handleNameChange = (evt) => this.setState({name: evt.target.value});

		this.createAccount = (evt) => {
			evt.preventDefault();
			evt.stopPropagation();

			if(!this.state.email || !this.state.password || !this.state.name) {
				this.setState({error: "Please fill out all fields."});
				return;
			}
			
			api.signUp({
				name: this.state.name,
				email: this.state.email,
				password: this.state.password
			}).then(res => {
				if(res.err) {
					console.error(res.err);
					this.setState({error: res.err});
				} else {
					this.props.signIn();
					console.log("Logged In!");
				}
			});
		};	

		this.login = (evt) => {
			evt.preventDefault();
			evt.stopPropagation();

			if(!this.state.email || !this.state.password) {
				this.setState({error: "Please fill out all fields."});
				return;
			}

			api.login({
				email: this.state.email,
				password: this.state.password
			}).then(res => {
				if(res.err) {
					console.error(res.err);
					this.setState({error: res.err});
				} else if(!res.token) {
					console.error("No token returned!");
					this.setState({error: "An error occurred. Please try again later."});
				} else {
					this.props.signIn();
					console.log("Logged In!");
				}
			});
		};
	}

	render() {
		return (
			<div className="login_container">
				{
					this.state.hasAccount 

						? <form onSubmit={this.login}>
							<Row>
								<Col offset={6} span={12}>
									<Input className="login_input" type="email" placeholder="Email" onChange={this.handleEmailChange} value={this.state.email} />
								</Col>
							</Row>
							<Row>
								<Col offset={6}  span={12}>
									<Input className="login_input" type="password" placeholder="Password" onChange={this.handlePasswordChange} value={this.state.password} />
								</Col>
							</Row>
							<p style={{color: "red"}}>{this.state.error}</p>
							<Row>
								<Col offset={6} span={12} style={{textAlign: "center"}}>
									<Button className="btn_login" onClick={this.login}>Login</Button>
								</Col>
							</Row>
							<Row>
								<Col offset={6} span={12} style={{textAlign: "center"}}>
									<p className="switch_login" onClick={this.switchView}>Register</p>
								</Col>
							</Row>
							<input type="submit" style={{position: "absolute", left: -9999}} />
						</form>

						: <form onSubmit={this.createAccount}>
							<Row>
								<Col offset={6} span={12}>
									<Input className="login_input" placeholder="Name" onChange={this.handleNameChange} value={this.state.name} />
								</Col>
							</Row>
							<Row>
								<Col offset={6} span={12}>
									<Input className="login_input" type="email" placeholder="Email" onChange={this.handleEmailChange} value={this.state.email} />
								</Col>
							</Row>
							<Row>
								<Col offset={6}  span={12}>
									<Input className="login_input" type="password" placeholder="Password" onChange={this.handlePasswordChange} value={this.state.password} />
								</Col>
							</Row>
							<p style={{color: "red"}}>{this.state.error}</p>
							<Row>
								<Col offset={6} span={12} style={{textAlign: "center"}}>
									<Button className="btn_signup" onClick={this.createAccount}>Create Account</Button>
								</Col>
							</Row>
							<Row>
								<Col offset={6} span={12} style={{textAlign: "center"}}>
									<p className="switch_login" onClick={this.switchView}>Log In</p>
								</Col>
							</Row>
							<input type="submit" style={{position: "absolute", left: -9999}} />
						</form>
				}
			</div>
		);
	}
}