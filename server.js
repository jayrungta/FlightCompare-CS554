const express = require("express");
const expressSession = require('express-session');
const bcrypt = require('bcrypt-nodejs');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const configRoutes = require("./routes");
const app = express();
const static = express.static(__dirname + '/public');

app.use("/public", static);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});