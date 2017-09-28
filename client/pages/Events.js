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
			initialTitle: "",
			initialContent: "",
			title: "",
			content: "",
			message: "",
			saveTimer: null
		}

		this.onTitleChange = (evt) => this.setState({message: "", title: evt.target.value})
		this.onContentChange = (evt) => {
			clearTimeout(this.state.saveTimer)
			this.setState({message: "Writing...", content: evt.target.value, saveTimer: setTimeout(this.submitEvent, 1000)})
		};
		this.onContentInput = (evt) => {
	  	// evt.target.style.height = "";
		  // evt.target.style.height = evt.target.scrollHeight + "px";
		};

		this.submitEvent = (evt) => {
			if(evt) {
				evt.preventDefault();
				evt.stopPropagation();
			}

			if(!this.state.title || !this.state.content) {
				this.setState({message: "Please fill out all fields. I wanna hear about your day! :)"});
				return;
			}

			if(this.state.title === this.state.initialTitle && this.state.content === this.state.initialContent) {
				this.setState({message: ""});
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
					this.setState({message: "Saved!", initialTitle: this.state.title, initialContent: this.state.content});
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
				const title = event ? event.title : "";
				const content = event ? event.content : "";
				this.setState({title: title, initialTitle: title, content: content, initialContent: content});
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
							rows={4} onInput={this.onContentInput} onChange={this.onContentChange} 
							value={this.state.content} autosize={true}/>
						<p style={{float: "right", margin: "4px 0"}}>{this.state.message}</p>
					</Card>
				</form>
			</div>
		);
	}

	renderEvents() {
		let pastEvents = this.props.eventStore.getPastEvents();
		return pastEvents.length > 0 && pastEvents.map(event => {
			return <div className="event_container" key={event.id}>
				<Card className="event_card" title={event.title}>
					<p>{event.content}</p>
					<p style={{float: "right", margin: "10px 0"}}>{moment(event.publishDate).format("MMM D")}</p>
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