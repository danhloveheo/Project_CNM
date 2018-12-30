import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		riderStatus: "init"
	},
	getters: {
		getRiderStatus(state) {
			return state.riderStatus;
		}
	},
	mutations: {
		changeRiderStatus(state, payload) {
			state.riderStatus = payload;
		}
	},
	actions: {},
	modules: {
		user
	}
});
