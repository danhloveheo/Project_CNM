import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		riderStatus: "init",
		driverStatus: "init",
		requestInfo: null,
		driverInfo: null,
		curPosition: null,
		desPosition: null
	},
	getters: {
		getRiderStatus(state) {
			return state.riderStatus;
		},
		getDriverStatus(state) {
			return state.driverStatus;
		},
		getRequestInfo(state) {
			return state.requestInfo;
		},
		getDriverInfo(state) {
			return state.driverInfo;
		},
		getCurPosition(state) {
			return state.curPosition;
		},
		getDesPosition(state) {
			return state.desPosition;
		}
	},
	mutations: {
		changeRiderStatus(state, payload) {
			state.riderStatus = payload;
		},
		changeDriverStatus(state, payload) {
			state.driverStatus = payload;
		},
		changeRequestInfo(state, payload) {
			state.requestInfo = payload;
		},
		changeDriverInfo(state, payload) {
			state.driverInfo = payload;
		},
		changeCurPosition(state, payload) {
			state.curPosition = payload;
		},
		changeDesPosition(state, payload) {
			state.desPosition = payload;
		}
	},
	actions: {},
	modules: {
		user
	}
});
