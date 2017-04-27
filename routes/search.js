const express = require('express');
const router = express.Router();
const data = require("../data");
const userData = data.users;

router.get("/", (req, res) => {
    if(req.user)
    res.render("search",{})
    else
    res.redirect("/login")
});

module.exports = router;