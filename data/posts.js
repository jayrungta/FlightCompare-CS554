const postsCollection = require("../dbconfig/MongoCollections.js").posts;
const users = require("./users");
const flights = require("./flights");
const uuid = require('node-uuid');
const bcrypt = require('bcrypt-nodejs');
const xss = require('xss');

module.exports = {
    /**
     * @param post - Information about the post.
     * @param post.userId - Id of the user that posts.
     * @param post.flightId - Id of the flight on which the user posts.
     * @param post.text - Text of the post.
     * @returns id - Id of the newly added post.
     * @throws Will throw an error if user of flight not found.
     */
    addPost: async (post) => {
        let posts = await postsCollection();
        let user = await users.getUserById(post.userId);
        let flight = await flights.getFlightById(post.flightId);

        //TODO: add more info
        let newPost = {
            _id: uuid.v4(),
            user: {
                id: userId,
                name: `${user.profile.firstName} ${user.profile.lastName}`
            },
            flight: {
                id: flightId
            },
            text: xss(post.text)
        };
        let insertedPost = await posts.insertOne(newPost);
        return insertedPost.insertedId;
    },

    /**
     * @returns id - Id of the newly deleted post.
     * @throws Will throw an error if delete fails.
     */
    deletePost: async (id) => {
        let posts = await postsCollection();
        let deletedPost = await posts.deleteOne({ _id: id });
        if (deletedPost.deletedCount == 0)
            throw (`Failed to delete post with id ${id}.`);
        return id;
    },

    /**
     * @returns {Object} post
     * @throws Will throw an error if post not found.
     */
    getPostById: async (id) => {
        let posts = await postsCollection();
        let post = await posts.findOne({ _id: id });
        if (!post)
            throw ("User not found.");
        return post;
    },

    /**
     * @returns {Object[]} postsOfUser
     */
    getPostsByUser: async (userId) => {
        let posts = await postsCollection();
        let postsOfUser = await posts.find({ 'user.id': userId }).toArray();
        return postsOfUser;
    },

    /**
     * @returns {Object[]} postsOfFlight
     */
    getPostsByFlight: async (flightId) => {
        let posts = await postsCollection();
        let postsOfFlight = await posts.find({ 'flight.id': flightId }).toArray();
        return postsOfFlight;
    }
}