import Vue from "vue";
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue";
import VueRouter from "vue-router";
import axios from "axios";
import * as VueGoogleMaps from "vue2-google-maps";

import { routes } from "./routes";
import { store } from "./store/store";

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(VueGoogleMaps, {
	load: {
		key: "AIzaSyCp3QauVfDwqyT7kwndhlTi-ot6kwAu_2E",
		libraries: "places"
	}
});

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
