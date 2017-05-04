const express = require('express');
const router = express.Router();
const data = require("../data");
const userData = data.users;
const flightData = data.flights;
const aviationJson = require("aviation-json");

let airlineInfo = null;

if(!airlineInfo){
    // Get all airlines info
    airlineInfo = aviationJson.airlines;
    console.log(airlineInfo);
}

router.get("/", (req, res) => {
    if(req.user)
    res.render("search",{});
    else
    res.redirect("/login");
});

router.post('/', async (req,res)=>{
    let adultCount = req.body.adultCount;
    let maxPrice = req.body.maxPrice;
    let solutions = "20";
    let origin = req.body.origin;
    let destination = req.body.destination;
    let date = req.body.date;

    try{
    let flights = await flightData.searchFlights(adultCount, maxPrice, solutions, origin, destination, date);
    res.json(flights);
    }
    catch(err){
    res.status(500).send(err);
    }
});

//  // Search flights
//     flightData.searchFlights("1", "USD5000", "20", "NYC", "LAX", "2017-12-14").then((flights) => {
//         console.log('done');
//         console.log(flights);
//     }).catch(function(error) {
//         console.log(error);
//     });

module.exports = router;