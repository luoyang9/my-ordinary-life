const API_URL = '/api';

async function get(endpoint, query_params) {
	try {
		const response = await fetch(API_URL + endpoint + (query_params ? "?" + query_params : ""), {
			method: 'GET',
			credentials: "include",
			headers: {
				'content-type': "application/json"
			}
		});
		const data = await response.json();
		return data;
	} catch(e) {
		console.error(e);
		return {err: e};
	}
}

async function post(endpoint, params) {
	try {
		const response = await fetch(API_URL + endpoint, {
			method: 'POST',
			credentials: "include",
			headers: {
				'content-type': "application/json"
			},
			body: JSON.stringify(params)
		});
		const data = await response.json();
		return data;
	} catch(e) {
		console.errro(e);
		return {err: e};
	}
}

async function signUp(fields) {
	try {
		const { name, email, password } = fields;
		const response = await fetch(API_URL + '/auth/signup', {
			method: 'POST',
			credentials: "include",
			headers: {
				'content-type': "application/json"
			},
			body: JSON.stringify({
				name,
				email,
				password
			})
		});
		const data = await response.json();
		return data;
	} catch(e) {
		console.error(e);
		return {err: e};
	}
}

async function login(fields) {
	try {
		const { email, password } = fields;
		const response = await fetch(API_URL + '/auth/login', {
			method: 'POST',
			credentials: "include",
			headers: {
				'content-type': "application/json",
			},
			body: JSON.stringify({
				email,
				password
			})
		})
		const data = await response.json();
		return data;
	} catch(e) {
		console.error(e);
		return {err: e};
	}
}

export default {
	get,
	post,
	signUp, 
	login,
}
