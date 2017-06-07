import React from 'react'
import { observer } from "mobx-react"
import { Row, Col, Button, Card } from 'antd'

import api from '../api'

@observer
export default class Events extends React.Component {

	componentWillMount() {
		this.props.eventStore.setLoading(true);
		api.get('/events/all').then(events => {
			if(events.err) {
				console.error(events.err);
			} else {
				this.props.eventStore.setEvents(events);
			}
			this.props.eventStore.setLoading(false);
		});
	}

	renderEvents() {
		return this.props.eventStore.length > 0 && this.props.eventStore.events.map(event => {
			return <div className="event_container" key={event.id}>
				<Card className="event_card" title={event.title}>
					<p>{event.content}</p>
				</Card>
			</div>
		})
	}

	render() {
		return (
			<Row>
				<Col offset={6} span={12}>
					<h1 className="events_header">events</h1>
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