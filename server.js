const express = require("express");
const expressSession = require('express-session');
const bcrypt = require('bcrypt-nodejs');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const passport = require('passport');
const configRoutes = require("./routes");
const app = express();
const static = express.static(__dirname + '/public');

const expressSanitizer  = require("express-sanitizer");
const session           = require('express-session');
const flash             = require('connect-flash');
const methodOverride    = require("method-override");
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');

//wkhtmlpdf
//const wkhtmlpdf = require('wkhtmlpdf');
//const fs = require('fs');

// URL      get the pdf file
//wkhtmltopdf('http://localhost:3000/recipes', { pageSize: 'letter' })
//  .pipe(fs.createWriteStream('out.pdf'));


const handlebarsInstance = exphbs.create({
    defaultLayout: 'main',
    // Specify helpers which are only registered on this instance.
    helpers: {
        asJSON: (obj, spacing) => {
            if (typeof spacing === "number")
                return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

            return new Handlebars.SafeString(JSON.stringify(obj));
        }
    }
});

app.use("/public", static);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride("_method"));
app.use(expressSanitizer());
app.use(cookieParser());


app.use(session({ secret: 'a',
                  resave: false,
                  saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


require('./routes/init')(passport);//passport configuration file
require('./routes/index.js')(app, passport);
app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});