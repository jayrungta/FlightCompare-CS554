const nrpSender = require("./nrp-sender");
const uuid = require('node-uuid');

module.exports = {
    /**
     * @returns id - Id of the newly added user.
     */
    addUser: async (user) => {
        return await nrpSender.sendMessage({
            id: uuid.v4(),
            collection: "users",
            operation: "addUser",
            params: { user }
        });
    },

    /**
     * @returns id - Id of the newly deleted user.
     * @throws Will throw an error if delete fails.
     */
    deleteUser: async (id) => {
        return await nrpSender.sendMessage({
            id: uuid.v4(),
            collection: "users",
            operation: "deleteUser",
            params: { id }
        });
    },

    /**
     * @returns {Object} user
     * @throws Will throw an error if user not found.
     */
    getUserById: async (id) => {
        return await nrpSender.sendMessage({
            id: uuid.v4(),
            collection: "users",
            operation: "getUserById",
            params: { id }
        });
    },

    getUsersByFlight: async (flightId) => {
        return await nrpSender.sendMessage({
            id: uuid.v4(),
            collection: "users",
            operation: "getUsersByFlight",
            params: { flightId }
        });
    },

    /**
     * @returns {Object[]} allUsers
     */
    getAllUsers: async () => {
        return await nrpSender.sendMessage({
            id: uuid.v4(),
            collection: "users",
            operation: "getAllUsers",
            params: {}
        });
    },

    /**
     * @returns {Object} user
     * @throws Will throw an error if username or password incorrect.
     */
    getUserByAuth: async (username, password) => {
        return await nrpSender.sendMessage({
            id: uuid.v4(),
            collection: "users",
            operation: "getUserByAuth",
            params: { username, password }
        });
    },

    /**
     * @param username
     * @returns {boolean}
     */
    isUsernameUnique: async (username) => {
        return await nrpSender.sendMessage({
            id: uuid.v4(),
            collection: "users",
            operation: "isUsernameUnique",
            params: { username }
        });
    }

}