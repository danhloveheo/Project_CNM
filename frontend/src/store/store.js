import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
// import routes from "./../routes";

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		firstName: null,
		lastName: null,
		email: null,
		role: null,
		idToken: null,
		refreshToken: null
	},
	mutations: {
		storeUser(state, payload) {
			state.firstName = payload.user.firstName;
			state.lastName = payload.user.lastName;
			state.email = payload.user.email;
			state.role = payload.user.role;
			state.idToken = payload.idToken;
			state.refreshToken = payload.refreshToken;
		}
	},
	actions: {
		registerRider({ commit, dispatch }, payload) {
			axios
				.post("/user/register", payload)
				.then(res => {
					commit("storeUser", res.data);
					dispatch("setLocalStorage", res.data);
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
				})
				.catch(err => {
					console.log(err.response.data);
				});
		},
		setLocalStorage(context, payload) {
			localStorage.setItem("firstName", payload.user.firstName);
			localStorage.setItem("lastName", payload.user.lastName);
			localStorage.setItem("email", payload.user.email);
			localStorage.setItem("role", payload.user.role);
			localStorage.setItem("refreshToken", payload.refreshToken);
		}
	},
	getters: {}
});
