import Home from "./components/home/home.vue";
import Rider from "./components/rider/rider.vue";

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
	}
];
