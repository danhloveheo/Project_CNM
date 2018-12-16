const config = require("./config.json");
const envConfig = config["development"];

Object.keys(envConfig).forEach(key => {
	process.env[key] = envConfig[key];
});
