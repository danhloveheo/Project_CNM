require("./config/config");

const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const bodyParser = require("body-parser");
const corser = require("corser");

const userRoutes = require("./routes/user-routes");
const placesRoutes = require("./routes/places-routes");

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(bodyParser.json());
app.use(corser.create());
app.use("/user", userRoutes);
app.use("/places", placesRoutes);

let driverRoutes = require("./routes/driver-routes")(io);
app.use("/driver", driverRoutes);

let port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Server open at port ${port}.`));
