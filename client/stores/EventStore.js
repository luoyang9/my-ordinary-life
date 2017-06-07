import { observable, computed } from 'mobx'
import moment from 'moment'

class EventStore {
	@observable events = [];
	@observable loading = false;

	setLoading(loading) {
		this.loading = loading;
	}

	setEvents(events) {
		this.events = events;
	}

	getPastEvents() {
		return this.events.filter(event => !moment().isSame(event.publishDate, 'day'));
	}
}

const store = new EventStore;

export default store;