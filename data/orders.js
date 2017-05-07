const nrpSender = require("./nrp-sender");
const uuid = require('node-uuid');

module.exports = {
    /**
     * @param order - Information about the order.
     * @param order.status - Status of the order such as "used", "purchased" and "cancelled".
     * @param order.userId - Id of the user that posts.
     * @param order.flightId - Id of the flight on which the user posts.
     * @returns id - Id of the newly added order.
     * @throws Will throw an error if user of flight not found.
     */
    addOrder: async (order) => {
        return await nrpSender.sendMessage({
            id: uuid.v4(),
            collection: "orders",
            operation: "addOrder",
            params: { order }
        });
    },

    /**
     * @returns id - Id of the newly updated order.
     * @throws Will throw an error if update fails.
     */
    updateOrderStatus: async (id, status) => {
        return await nrpSender.sendMessage({
            id: uuid.v4(),
            collection: "orders",
            operation: "updateOrderStatus",
            params: { id, status }
        });
    },

    /**
     * @returns id - Id of the newly deleted order.
     * @throws Will throw an error if delete fails.
     */
    deleteOrder: async (id) => {
        return await nrpSender.sendMessage({
            id: uuid.v4(),
            collection: "orders",
            operation: "deleteOrder",
            params: { id }
        });
    },

    /**
     * @returns {Object} order
     * @throws Will throw an error if order not found.
     */
    getOrderById: async (id) => {
        return await nrpSender.sendMessage({
            id: uuid.v4(),
            collection: "orders",
            operation: "getOrderById",
            params: { id }
        });
    },

    /**
     * @returns {Object[]} ordersOfUser
     */
    getOrdersByUser: async (userId) => {
        return await nrpSender.sendMessage({
            id: uuid.v4(),
            collection: "orders",
            operation: "getOrdersByUser",
            params: { userId }
        });
    },

    /**
     * @returns {Object[]} purchasedOrdersOfFlight
     */
    getOrdersByFlightAndStatus: async (flightId, status) => {
        return await nrpSender.sendMessage({
            id: uuid.v4(),
            collection: "orders",
            operation: "getOrdersByFlightAndStatus",
            params: { flightId, status }
        });
    }
}