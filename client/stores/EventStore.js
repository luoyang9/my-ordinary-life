import { observable, computed } from 'mobx'

class EventStore {
	@observable events = [];
	@observable loading = false;

	setLoading(loading) {
		this.loading = loading;
	}

	setEvents(events) {
		this.events = events;
	}
}

const store = new EventStore;

export default store;