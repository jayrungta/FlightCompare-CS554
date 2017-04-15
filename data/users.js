const usersCollection = require("../dbconfig/MongoCollections.js").users;
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
            password: bcrypt.hashSync(xss(user.password)),
            profile: {
                firstName: xss(user.firstName),
                lastName: xss(user.lastName)
            }
        };

        let users = await usersCollection();
        let insertedUser = await users.insertOne(newUser);
        return insertedUser.insertedId;
    },

    //TODO: add more
    updateUser: async (id, newUserData) => {
        return newUserData;
    },

    /**
     * @returns id - Id of the newly deleted user.
     * @throws Will throw an error if delete fails.
     */
    deleteUser: async (id) => {
        let users = await usersCollection();
        let deletedUser = await users.deleteOne({ _id: id });
        if (deletedUser.deletedCount == 0)
            throw (`Failed to delete user with id ${id}.`);
        return id;
    },

    /**
     * @returns {Object} user
     * @throws Will throw an error if user not found.
     */
    getUserById: async (id) => {
        let users = await usersCollection();
        let user = await users.findOne({ _id: id });
        if (!user)
            throw ("User not found.");
        return user;
    },

    /**
     * @returns {Object[]} allUsers
     */
    getAllUsers: async () => {
        let users = await usersCollection();
        let allUsers = await users.find({}).toArray();
        return allUsers;
    },

    /**
     * @returns {Object} user
     * @throws Will throw an error if username or password incorrect.
     */
    getUserByAuth: async (username, password) => {
        let users = await usersCollection();
        let user = users.findOne({ username: username });
        if (!user || bcrypt.compareSync(password, user.password))
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