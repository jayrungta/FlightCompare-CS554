const nrpSender = require("./nrp-sender");
const uuid = require('node-uuid');

module.exports = {
    /**
     * @returns flights - Returns a list of flights.
     * @throws Will throw an error if request has an error or no flights found.
     */
    searchFlights: async (adultCount, maxPrice, solutions, origin, destination, date) => {
        return await nrpSender.sendMessage({
            id: uuid.v4(),
            collection: "flights",
            operation: "searchFlights",
            params: { adultCount, maxPrice, solutions, origin, destination, date }
        });
    }
}