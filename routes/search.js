const express = require('express');
const router = express.Router();
const data = require("../data");
const userData = data.users;
const flightData = data.flights;
const aviationJson = require("aviation-json");

let airlineInfo = aviationJson.airlines;

router.get("/", (req, res) => {
    if (req.user)
        res.render("search", {});
    else
        res.redirect("/login");
});

router.get("/airlines", (req, res) => {
    res.json(airlineInfo);
});

router.post('/', async (req, res) => {
    let adultCount = req.body.query.adultCount;
    let maxPrice = "USD"+req.body.query.maxPrice;
    let solutions = "20";
    let origin = req.body.query.origin;
    let destination = req.body.query.destination;
    let date = req.body.query.date;

    try {
        let flights = await flightData.searchFlights(adultCount, maxPrice, solutions, origin, destination, date);
        // flights.forEach(function (flight,index) {
        //     for (let airline in airlineInfo) {
        //         if(airlineInfo[airline].IATA == flight.airlineCode){
        //             flights[index].airlineName = airlineInfo[airline].name;
        //             flights[index].airlineLogo = airlineInfo[airline].logoLink;
        //         }
        //     }
        // }, this);
        res.json(flights);
    }
    catch (err) {
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