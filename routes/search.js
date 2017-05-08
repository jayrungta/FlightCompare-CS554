const express = require('express');
const router = express.Router();
const data = require("../data");
const userData = data.users;
const flightData = data.flights;
const aviationJson = require("aviation-json");
const wkhtmlpdf = require('wkhtmltopdf');
const fs = require('fs');

let airlineInfo = aviationJson.airlines;

router.get("/", (req, res) => {
    if (req.user)
        res.render("search", {});
    else
        res.redirect("/login");
});

router.post("/airlines", (req, res) => {
    if(req.user){
        //console.log(req.body);
        let airlineName = req.body.flight.airlineName;
        let origin = req.body.flight.origin;
        let destination = req.body.flight.destination;
        let price = req.body.flight.price;
        let departureTime = req.body.flight.departureTime;
        let arrivalTime = req.body.flight.arrivalTime;
        let duration = req.body.flight.duration;
        let flighNo = req.body.flight.flightNo;
        let originName = req.body.flight.originName;
        let destinationName = req.body.flight.destinationName;
        let originTerminal = req.body.flight.originTerminal;
        let meal = req.body.flight.meal;
        if(meal === undefined)
            meal = "Not specified";
        wkhtmlpdf('<h1>Airline Name: '+ airlineName +'</h1>'
                 +'<h2>Origin: '+originName+'('+origin+')'+'</h2>'
                 + '<h2>Destination: '+destinationName+'('+destination+')'+'</h2>'
                 + '<h3>Origin Terminal: '+ originTerminal+ '</h3>'
                 +'<ul><li>Price: '+ price+'</li>'
                 + '<li>Departure Time: '+ departureTime +'</li>' 
                 + '<li>Arrival Time: '+ arrivalTime + '</li>'
                 + '<li>Duration: '+ duration + '</li>' 
                 +'<li>Flight Number: '+ flighNo + '</li>'
                 +'<li>Meal: '+ meal + '</li></ul>', 
                { userStyleSheet: 'public/css/print.css',
                  pageSize: 'letter'})
                .pipe(fs.createWriteStream('out.pdf'));
        res.json('Print success');
    }
    else
        res.redirect("/login");
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
        //console.log(flights);
        /*
        let flights = [ { airlineCode: 'VX',
            airlineName: 'Virgin America Inc.',
            price: 'USD183.20',
            arrivalTime: '2017-10-12T19:17-07:00',
            departureTime: '2017-10-12T16:05-04:00',
            origin: 'EWR',
            destination: 'LAX',
            duration: 372,
            flightNo: 'VX 1167',
            destinationTerminal: '6',
            originTerminal: 'A',
            originName: 'Newark Liberty International',
            destinationName: 'Los Angeles International' },
          { airlineCode: 'VX',
            airlineName: 'Virgin America Inc.',
            price: 'USD183.20',
            arrivalTime: '2017-10-12T15:41-07:00',
            departureTime: '2017-10-12T12:30-04:00',
            origin: 'EWR',
            destination: 'LAX',
            duration: 371,
            flightNo: 'VX 1165',
            destinationTerminal: '6',
            originTerminal: 'A',
            originName: 'Newark Liberty International',
            destinationName: 'Los Angeles International' }]

        */
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