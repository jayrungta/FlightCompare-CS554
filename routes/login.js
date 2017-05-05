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
    if (req.user)
        res.redirect("/search");
    else
        res.render("login", {})
});

router.post('/',
    passport.authenticate('local', {
        successRedirect: '/search',
        failureRedirect: '/login',
        failureFlash: true
    })
);

router.post('/namecheck', async (req, res) => {
    let bool = await userData.isUsernameUnique(req.body.username);
    res.send(bool);
});

router.get('/check', (req, res) => {
    if (req.user)
        res.send(true);
    else
        res.send(false);
});

router.get("/register", (req, res) => {
    res.render("register", {})
});

router.post("/register", async (req, res) => {
    // let user = { firstName: req.body.user.firstname, lastName: req.body.user.lastname, username: req.body.user.username, password: req.body.user.password, email: req.body.user.email };
    try {
        let userID = await userData.addUser(req.body.user);
        if (userID)
            res.send(userID);
    }
    catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;