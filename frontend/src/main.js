import Vue from "vue";
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue";
import VueRouter from "vue-router";
import axios from "axios";

import { routes } from "./routes";

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(BootstrapVue);

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
	render: h => h(App)
}).$mount("#app");
