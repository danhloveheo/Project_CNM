require("./config/config");

const express = require("express");
const bodyParser = require("body-parser");
const corser = require("corser");

const userRoute = require("./routes/user-routes");

let app = express();
let port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(corser.create());

app.use("/user", userRoute);

app.listen(port, () => console.log(`Server open at port ${port}.`));
