const request = require('request');
const endPoint = "https://www.googleapis.com/qpxExpress/v1/trips/search?key="+"AIzaSyCFSW0qP1DVtrvwGDvjeDeDJeHsMCJs1pA";

module.exports = {
    /**
     * @returns flights - Returns a list of flights.
     * @throws Will throw an error if request has an error or no flights found.
     */
    searchFlights(adultCount, maxPrice, solutions, origin, destination, date){
        return new Promise((resolve, reject) => {
            let data = {
                "request": {
                  "passengers": {
                    "adultCount": adultCount
                  },
                  "maxPrice": maxPrice,
                  "solutions": solutions,
                "slice": [
                      {
                        "origin": origin,
                        "destination": destination,
                        "date": date
                      }
                    ]
                }
            };

            request({method: "post",  url: endPoint,  body: data,  json: true}, (err, resp, body) => {
                let flights = [];
                let jsonObject = {};
                let airline;
                let price;

                if (body.error){
                    console.error(body.error);
                    reject(body.error);
                }

                try {
                    for(i=0; i < body.trips.tripOption.length; i++){
                        airline = body.trips.tripOption[i].slice[0].segment[0].flight.carrier
                        price = body.trips.tripOption[i].saleTotal
                        jsonObject = {"airline": airline , "price": price};
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
