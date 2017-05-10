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
        let destinationTerminal = req.body.flight.destinationTerminal;
        let meal = req.body.flight.meal === undefined ? "N/A": req.body.flight.meal;


        wkhtmlpdf(`<div class="container">
    <div class="row">
        <div class="grid invoice">
            <div class="grid-body">
                <div class="invoice-title">
                    <div class="row">
                        <h2>Your ticket itinerary<br>
                    </div>
                </div>
                <hr>
                <div class="row">
                        <h3>TICKET SUMMARY</h3>
                        <table class="table table-striped">
                            <thead>
                                <tr class="line">
                                    <td><strong>Airline Name</strong></td>
                                    <td><strong>From</strong></td>
                                    <td><strong>To</strong></td>
                                    <td><strong>Duration</strong></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>${airlineName}</td>
                                    <td>${originName}(${origin})<br />${departureTime}<br />Terminal: ${originTerminal}</td>
                                    <td>${destinationName}(${destination})<br />${arrivalTime}<br />Terminal: ${destinationTerminal}</td>
                                    <td>${duration}</td>
                                </tr>
                                <tr>
                                    <td colspan="3"></td>
                                    <td class="text-right"><strong>Meal</strong></td>
                                    <td class="text-right"><strong>${meal}</strong></td>
                                </tr>
                                <tr>
                                    <td colspan="3"></td>
                                    <td class="text-right"><strong>Price</strong></td>
                                    <td class="text-right"><strong>${price}</strong></td>
                                </tr>
                            </tbody>
                        </table>                                 
                </div>
            </div>
        </div>
    </div>
</div>`, 
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
            destinationTerminal: 'C',
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
            destinationTerminal: 'B',
            originName: 'Newark Liberty International',
            destinationName: 'Los Angeles International' }]*/
        
        
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