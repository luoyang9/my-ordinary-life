import { observable, computed } from 'mobx'

function checkToken() {
	let found = false;
	document.cookie.split(";").forEach(cookie => {
		if(cookie.split("=")[0].trim() === "token") found = true;
	});
	return found;
}

class UserStore {
	@observable signedIn = checkToken();

	signIn() {
		this.signedIn = true;
	}

	signOut() {
		this.signedIn = false;
	}
}

const store = new UserStore;

export default store;