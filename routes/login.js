const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const passport = require('passport');

//function to encure logiin 
ensureAuthenticated = (req, res, next) => {
		if(req.isAuthenticated())
			return next();
		console.log("Not authenticate");
		res.redirect('/login');
}


passport.serializeUser(function(user, done) {
	  done(null, user);
});

passport.deserializeUser(function(user, done) {
	    done(null, user);
});

//get login page(main page)
router.get("/login",(req, res) => {
		res.render('login/loginwindow', { message: req.flash('error') });
	});


//get signup page
router.get("/signup",(req, res) => {
		res.render("register", { message: req.flash('error') });
	});

//get the logined user private page
router.get("/", ensureAuthenticated, (req, res, next) => {
		//route still not set up yet
		res.redirect('/private');
});

//get the user private page and flight orders
/* not set up yet
router.get("/private", ensureAuthenticated, (req, res)=>{
			
});
*/

//handle logout
router.get("/signout", (req, res)=>{
	req.logout();
	res.redirect('/');
});


//check login status
router.get('/login/isLoggedIn', function (req, res) {
    if (req.isAuthenticated()) {
        res.json({user: req.user});
    }
});
//handle login post
router.post('/login', passport.authenticate('local-login', { successRedirect: '/',
														   failureRedirect: '/login',
														   failureFlash: true }));


//handle registration post
router.post('/signup', passport.authenticate('local-signup', { successRedirect: '/',
														   failureRedirect: '/signup',
														   failureFlash: true }));


module.exports = router;