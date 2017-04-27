const express = require('express');
const router = express.Router();
const data = require("../data");
const userData = data.users;
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    async function (username, password, done) {
        try {
            let user = await userData.getUserByAuth(username, password);
            if (!user)
                return done(null, false, { message: 'Incorrect username or password.' });

            return done(null, user);
        }
        catch (err) {
            return done(null, false, { message: err });
        }
    }
));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
    try {
        let user = await userData.getUserById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

router.get("/", (req, res) => {
    res.render("login", {})
});

router.post('/',
    passport.authenticate('local', {
        successRedirect: '/search',
        failureRedirect: '/login',
        failureFlash: true
    })
);

router.get("/register", (req, res) => {
    res.render("register", {})
});

router.post("/register", async (req, res) => {
    let user = { firstName: req.body.firstname, lastName: req.body.lastname, username: req.body.username, password: req.body.password, email: req.body.email };
    try {
        let userID = await userData.addUser(user);
        if (userID)
            res.redirect("/");
    }
    catch (err) {
        res.json(err);
    }
});

module.exports = router;