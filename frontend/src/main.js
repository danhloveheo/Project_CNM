import Vue from "vue";
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue";
import ToggleButton from "vue-js-toggle-button";
import VueRouter from "vue-router";
import axios from "axios";
import * as VueGoogleMaps from "vue2-google-maps";
import VueSocketIO from "vue-socket.io";

import { routes } from "./routes";
import { store } from "./store/store";

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(ToggleButton);
Vue.use(VueGoogleMaps, {
	load: {
		key: "AIzaSyCp3QauVfDwqyT7kwndhlTi-ot6kwAu_2E",
		libraries: "places"
	}
});
Vue.use(
	new VueSocketIO({
		debug: true,
		connection: "http://localhost:3000"
	})
);

axios.defaults.baseURL = "http://localhost:3000";

const router = new VueRouter({
	routes,
	mode: "history",
	scrollBehavior() {
		return { x: 0, y: 0 };
	}
});

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
