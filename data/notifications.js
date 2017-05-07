const nrpSender = require("./nrp-sender");
const uuid = require('node-uuid');

module.exports = {
    notifyChanges: async (flightId) => {
        return await nrpSender.sendMessage({
            id: uuid.v4(),
            collection: "notifications",
            operation: "notifyChanges",
            params: { flightId }
        });
    }
}