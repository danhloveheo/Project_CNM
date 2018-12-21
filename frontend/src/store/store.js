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
		registerRider({ commit }, payload) {
			axios.post("/user/register", payload).then(res => {
				commit("storeUser", res.data);
			});
		},
		registerDriver({ commit }, payload) {
			axios.post("/user/register", payload).then(res => {
				commit("storeUser", res.data);
			});
		}
	},
	getters: {}
});