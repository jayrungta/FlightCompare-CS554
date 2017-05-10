const { orders } = require("../dbconfig/MongoCollections.js");
const users = require("./users");
const flights = require("./flights");
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
        let ordersCollection = await orders();
        let user = await users.getUserById(order.userId);
        let flight = await flights.getFlightById(order.flightId);

        // TODO: add more info
        let newOrder = {
            _id: uuid.v4(),
            date: Date.now(),
            status: order.status,
            user: {
                id: order.userId,
                email: user.profile.email
            },
            flight: {
                id: order.flightId,
                // TODO: other useful filght info to render
            }
        };
        let insertedOrder = await ordersCollection.insertOne(newOrder);
        return insertedOrder.insertedId;
    },

    /**
     * @returns id - Id of the newly updated order.
     * @throws Will throw an error if update fails.
     */
    updateOrderStatus: async (id, status) => {
        let ordersCollection = await orders();
        let updatedOrder = await ordersCollection.updateOne({ _id: id },
            { $set: { status: status } });
        if (updatedOrder.modifiedCount !== 1)
            throw (`Failed to update order with id ${id}.`);
        return id;
    },

    /**
     * @returns id - Id of the newly deleted order.
     * @throws Will throw an error if delete fails.
     */
    deleteOrder: async (id) => {
        let ordersCollection = await orders();
        let deletedOrder = await ordersCollection.deleteOne({ _id: id });
        if (deletedOrder.deletedCount === 0)
            throw (`Failed to delete order with id ${id}.`);
        return id;
    },

    /**
     * @returns {Object} order
     * @throws Will throw an error if order not found.
     */
    getOrderById: async (id) => {
        let ordersCollection = await orders();
        let order = await ordersCollection.findOne({ _id: id });
        if (!order)
            throw ("Order not found.");
        return order;
    },

    /**
     * @returns {Object[]} ordersOfUser
     */
    getOrdersByUser: async (userId) => {
        let ordersCollection = await orders();
        let ordersOfUser = await ordersCollection.find({ 'user.id': userId }).toArray();
        return ordersOfUser;
    },

    /**
     * @returns {Object[]} purchasedOrdersOfFlight
     */
    getOrdersByFlightAndStatus: async (flightId, status) => {
        let ordersCollection = await orders();
        let ordersOfFlight = await ordersCollection.find({
            'flight.id': flightId,
            status: status
        }).toArray();
        return ordersOfFlight;
    }
}