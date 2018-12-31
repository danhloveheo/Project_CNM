import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		riderStatus: "init",
		driverStatus: "init"
	},
	getters: {
		getRiderStatus(state) {
			return state.riderStatus;
		},
		getDriverStatus(state) {
			return state.driverStatus;
		}
	},
	mutations: {
		changeRiderStatus(state, payload) {
			state.riderStatus = payload;
		},
		changeDriverStatus(state, payload) {
			state.driverStatus = payload;
		}
	},
	actions: {},
	modules: {
		user
	}
});
