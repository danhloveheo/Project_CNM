import Home from "./components/home/home.vue";
import Rider from "./components/rider/rider.vue";
import Driver from "./components/driver/driver.vue";

export const routes = [
	{
		path: "/",
		name: "home",
		component: Home
	},
	{
		path: "/rider",
		name: "rider",
		component: Rider
	},
	{
		path: "/driver",
		name: "driver",
		component: Driver
	}
];
