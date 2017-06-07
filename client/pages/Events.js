import React from 'react'
import moment from 'moment'
import { observer } from "mobx-react"
import { Row, Col, Button, Card, Input } from 'antd'

import api from '../api'

@observer
export default class Events extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			title: "",
			content: "",
			message: ""
		}

		this.onTitleChange = (evt) => this.setState({message: "", title: evt.target.value})
		this.onContentChange = (evt) => this.setState({message: "", content: evt.target.value})
		this.onContentInput = (evt) => {
	  	evt.target.style.height = "";
		  evt.target.style.height = Math.min(evt.target.scrollHeight + 10, 300) + "px";
		};

		this.submitEvent = (evt) => {
			evt.preventDefault();
			evt.stopPropagation();

			if(!this.state.title || !this.state.content) {
				this.setState({message: "Please fill out all fields. I wanna hear about your day! :)"});
				return;
			}

			const publishDate = moment().format("L");

			this.setState({message: "Saving..."});
			api.post('/events', {
				title: this.state.title,
				content: this.state.content,
				publishDate: publishDate
			}).then(event => {
				if(event.err) {
					console.error(event.err);
					this.setState({message: "Failed to save. Try again?"});
				} else {
					this.setState({message: "Saved!"});
				}
			});	

		}
	}

	componentWillMount() {
		this.props.eventStore.setLoading(true);
		api.get('/events').then(events => {
			if(events.err) {
				console.error(events.err);
			} else {
				this.props.eventStore.setEvents(events);
			}
			this.props.eventStore.setLoading(false);
		});
		api.get('/events/' + moment().format("YYYY/MM/DD")).then(event => {
			if(event && event.err) {
				console.error(event.err);
			} else {
				this.setState({title: event ? event.title : "", content: event ? event.content : ""});
			}
		});
	}

	renderNewEvent() {
		return (
			<div className="new_event_container">
				<form onSubmit={this.submitEvent}>
					<Card className="event_card" 
						title={<Input className="new_event_title" placeholder="What's the topic today?" 
						onChange={this.onTitleChange} value={this.state.title} />}
					>
						<Input type="textarea" className="new_event_content" placeholder="What happened today?" 
							rows={4} onInput={this.onContentInput} onChange={this.onContentChange} value={this.state.content} />
					</Card>
					<p>{this.state.message}</p>
					<Button className="new_event_save" type="submit" onClick={this.submitEvent}>Save</Button>
				</form>
			</div>
		);
	}

	renderEvents() {
		return this.props.eventStore.getPastEvents().length > 0 && this.props.eventStore.getPastEvents().map(event => {
			return <div className="event_container" key={event.id}>
				<Card className="event_card" title={event.title}>
					<p>{event.content}</p>
					<p>{moment(event.publishDate).format("YYYY/MM/DD")}</p>
				</Card>
			</div>
		});
	}

	render() {
		return (
			<Row>
				<Col offset={6} span={12}>
					<h1 className="events_header">today</h1>
					{ this.renderNewEvent() }
					<h1 className="events_header">past events</h1>
						{
							this.props.eventStore.loading 
								? <p>Loading</p> 
								: this.renderEvents()
						}
				</Col>
			</Row>
		);
	}

}