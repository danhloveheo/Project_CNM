import axios from "axios";

const state = {
	firstName: null,
	lastName: null,
	email: null,
	role: null,
	idToken: null,
	timerId: null
};

const getters = {
	isAuthenticated(state) {
		return state.idToken !== null;
	},
	fullName(state) {
		return `${state.firstName} ${state.lastName}`;
	}
};

const mutations = {
	storeUser(state, payload) {
		state.firstName = payload.user.firstName;
		state.lastName = payload.user.lastName;
		state.email = payload.user.email;
		state.role = payload.user.role;
		state.idToken = payload.idToken;
	},
	clearUser(state) {
		state.firstName = null;
		state.lastName = null;
		state.email = null;
		state.role = null;
		state.idToken = null;
	},
	changeIdToken(state, payload) {
		state.idToken = payload;
	},
	setTimerId(state, payload) {
		state.timerId = payload;
	}
};

const actions = {
	registerRider({ commit, dispatch }, payload) {
		axios
			.post("/user/register", payload)
			.then(res => {
				commit("storeUser", res.data);
				dispatch("setLocalStorage", res.data);
				dispatch("setResendTokenTimer");
			})
			.catch(err => {
				console.log(err.response.data);
			});
	},
	registerDriver({ commit, dispatch }, payload) {
		axios
			.post("/user/register", payload)
			.then(res => {
				commit("storeUser", res.data);
				dispatch("setLocalStorage", res.data);
				dispatch("setResendTokenTimer");
			})
			.catch(err => {
				console.log(err.response.data);
			});
	},
	login({ commit, dispatch }, payload) {
		axios
			.post("/user/login", payload)
			.then(res => {
				commit("storeUser", res.data);
				dispatch("setLocalStorage", res.data);
				dispatch("setResendTokenTimer");
			})
			.catch(err => {
				console.log(err.response.data);
			});
	},
	logout({ state, commit }) {
		commit("clearUser");

		localStorage.removeItem("firstName");
		localStorage.removeItem("lastName");
		localStorage.removeItem("email");
		localStorage.removeItem("role");
		localStorage.removeItem("refreshToken");

		if (state.timerId !== null) {
			console.log(state.timerId);
			clearInterval(state.timerId);
		}
	},
	tryAutoLogin({ commit, dispatch }) {
		const refreshToken = localStorage.getItem("refreshToken");
		if (!refreshToken) {
			return;
		}
		axios
			.post("/user/resend-idtoken", { refreshToken })
			.then(res => {
				let { idToken } = res.data;
				commit("storeUser", {
					user: {
						firstName: localStorage.getItem("firstName"),
						lastName: localStorage.getItem("lastName"),
						email: localStorage.getItem("email"),
						role: localStorage.getItem("role")
					},
					idToken
				});
			})
			.catch(err => {
				console.log(err.response.data);
				dispatch("logout");
			});
	},
	setResendTokenTimer({ commit, dispatch }) {
		const refreshToken = localStorage.getItem("refreshToken");
		if (!refreshToken) {
			return;
		} else {
			let id = setInterval(() => {
				axios
					.post("/user/resend-idtoken", { refreshToken })
					.then(res => {
						let { idToken } = res.data;
						commit("changeIdToken", idToken);
					})
					.catch(err => {
						console.log(err.response.data);
						dispatch("logout");
					});
			}, 60 * 60 * 1000 - 10 * 1000);
			commit("setTimerId", id);
		}
	},
	setLocalStorage(context, payload) {
		localStorage.setItem("firstName", payload.user.firstName);
		localStorage.setItem("lastName", payload.user.lastName);
		localStorage.setItem("email", payload.user.email);
		localStorage.setItem("role", payload.user.role);
		localStorage.setItem("refreshToken", payload.refreshToken);
	}
};

export default {
	state,
	getters,
	mutations,
	actions
};
