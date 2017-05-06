const request = require('request');
// const endPoint = "https://www.googleapis.com/qpxExpress/v1/trips/search?key=" + "AIzaSyCFSW0qP1DVtrvwGDvjeDeDJeHsMCJs1pA";
// const endPoint = "https://www.googleapis.com/qpxExpress/v1/trips/search?key=" + "AIzaSyBrUbMWOL0MwLF_BLkzILVVLAJ0O1IBaLg";
const endPoint = "https://www.googleapis.com/qpxExpress/v1/trips/search?key=" + "AIzaSyBi0U_G_Vkn73J8jtznWa_RmrbITF7w5Tc";

module.exports = {
    /**
     * @returns flights - Returns a list of flights.
     * @throws Will throw an error if request has an error or no flights found.
     */
    searchFlights(adultCount, maxPrice, solutions, origin, destination, date) {
        return new Promise((resolve, reject) => {
            let data = {
                "request": {
                    "passengers": {
                        "adultCount": adultCount
                    },
                    "maxPrice": maxPrice,
                    "solutions": solutions,
                    "saleCountry": "US",
                    "ticketingCountry": "US",
                    "slice": [
                        {
                            "origin": origin,
                            "destination": destination,
                            "date": date,
                            "maxStops": 0
                        }
                    ]
                }
            };

            request({ method: "post", url: endPoint, body: data, json: true }, (err, resp, body) => {
                let flights = [];
                let jsonObject = {};
                let airline;
                let price;
                let departureTime, arrivalTime, origin, destination, duration;

                if (body.error) {
                    console.error(body.error);
                    reject(body.error);
                }



                try {
                    let getName = (code) => {
                        let name;
                        body.trips.data.carrier.forEach(function (element) {
                            if (element.code == code) {
                                name = element.name;
                                return;
                            }
                        }, this);
                        return name;
                    };

                    let getFullAirport = (code) => {
                        let name;
                        body.trips.data.airport.forEach(function (element) {
                            if (element.code == code) {
                                name = element.name;
                                return;
                            }
                        }, this);
                        return name;
                    };

                    for (i = 0; i < body.trips.tripOption.length; i++) {
                        airlineCode = body.trips.tripOption[i].slice[0].segment[0].flight.carrier;
                        flightNo = airlineCode + " " + body.trips.tripOption[i].slice[0].segment[0].flight.number;
                        meal = body.trips.tripOption[i].slice[0].segment[0].leg[0].meal;
                        originTerminal = body.trips.tripOption[i].slice[0].segment[0].leg[0].originTerminal;
                        destinationTerminal = body.trips.tripOption[i].slice[0].segment[0].leg[0].destinationTerminal;
                        price = body.trips.tripOption[i].saleTotal;
                        arrivalTime = body.trips.tripOption[i].slice[0].segment[0].leg[0].arrivalTime;
                        departureTime = body.trips.tripOption[i].slice[0].segment[0].leg[0].departureTime;
                        origin = body.trips.tripOption[i].slice[0].segment[0].leg[0].origin;
                        originName = getFullAirport(origin);
                        destination = body.trips.tripOption[i].slice[0].segment[0].leg[0].destination;
                        destinationName = getFullAirport(destination);
                        duration = body.trips.tripOption[i].slice[0].segment[0].leg[0].duration;
                        airlineName = getName(airlineCode);

                        jsonObject = { "airlineCode": airlineCode, "airlineName": airlineName, "price": price, "arrivalTime": arrivalTime, "departureTime": departureTime, "origin": origin, "destination": destination, "duration": duration, "flightNo": flightNo, "meal": meal, "destinationTerminal": destinationTerminal, "originTerminal": originTerminal, "originName": originName, "destinationName": destinationName };

                        flights.push(jsonObject);
                    }
                } catch (e) {
                    reject('No flights!');
                }

                if (flights.length > 0) {
                    resolve(flights);
                } else {
                    reject('No flights!');
                }
            });
        });
    },
}
