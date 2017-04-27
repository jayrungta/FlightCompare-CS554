const {users} = require("../dbconfig/MongoCollections.js");
const uuid = require('node-uuid');
const bcrypt = require('bcrypt-nodejs');
const xss = require('xss');

module.exports = {
    /**
     * @returns id - Id of the newly added user.
     */
    addUser: async (user) => {
        // TODO: add more info
        let newUser = {
            _id: uuid.v4(),
            username: xss(user.username),
            password: bcrypt.hashSync(user.password),
            profile: {
                firstName: xss(user.firstName),
                lastName: xss(user.lastName),
                email: xss(user.email)
            }
        };

        let usersCollection = await users();
        let insertedUser = await usersCollection.insertOne(newUser);
        return insertedUser.insertedId;
    },

    // TODO: add more
    updateUser: async (id, newUserData) => {
        return newUserData;
    },

    /**
     * @returns id - Id of the newly deleted user.
     * @throws Will throw an error if delete fails.
     */
    deleteUser: async (id) => {
        let usersCollection = await users();
        let deletedUser = await usersCollection.deleteOne({ _id: id });
        if (deletedUser.deletedCount === 0)
            throw (`Failed to delete user with id ${id}.`);
        return id;
    },

    /**
     * @returns {Object} user
     * @throws Will throw an error if user not found.
     */
    getUserById: async (id) => {
        let usersCollection = await users();
        let user = await usersCollection.findOne({ _id: id });
        if (!user)
            throw ("User not found.");
        return user;
    },

    getUsersByFlight: async (flightId) => {
        let usersCollection = await users();
        let allUsers = await usersCollection.find({}).toArray();
        return allUsers;
    },

    /**
     * @returns {Object[]} allUsers
     */
    getAllUsers: async () => {
        let usersCollection = await users();
        let allUsers = await usersCollection.find({}).toArray();
        return allUsers;
    },

    /**
     * @returns {Object} user
     * @throws Will throw an error if username or password incorrect.
     */
    getUserByAuth: async (username, password) => {
        let usersCollection = await users();
        let user = await usersCollection.findOne({ username: username });
        if (!user || ! bcrypt.compareSync(password, user.password))
            throw ("Username or password incorrect.");
        return user;
    },

    /**
     * @param username
     * @returns {boolean}
     */
    isUsernameUnique: async (username) => {
        let allUsers = await getAllUsers();
        allUsers.forEach((user) => {
            if (user.username === username)
                return false;
        })
        return true;
    }

}