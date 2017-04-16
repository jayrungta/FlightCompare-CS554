const posts = require("../dbconfig/MongoCollections.js").posts;
const users = require("./users");
const uuid = require('node-uuid');
const xss = require('xss');

module.exports = {
    /**
     * @param post - Information about the post.
     * @param post.userId - Id of the user that posts.
     * @param post.flightId - Id of the flight on which the user posts.
     * @param post.text - Text of the post.
     * @returns id - Id of the newly added post.
     * @throws Will throw an error if user not found.
     */
    addPost: async (post) => {
        let postsCollection = await posts();
        let user = await users.getUserById(post.userId);

        // TODO: add more info
        let newPost = {
            _id: uuid.v4(),
            user: {
                id: post.userId,
                name: `${user.profile.firstName} ${user.profile.lastName}`
            },
            flight: {
                id: post.flightId
            },
            text: xss(post.text)
        };
        let insertedPost = await postsCollection.insertOne(newPost);
        return insertedPost.insertedId;
    },

    /**
     * @returns id - Id of the newly deleted post.
     * @throws Will throw an error if delete fails.
     */
    deletePost: async (id) => {
        let postsCollection = await posts();
        let deletedPost = await postsCollection.deleteOne({ _id: id });
        if (deletedPost.deletedCount === 0)
            throw (`Failed to delete post with id ${id}.`);
        return id;
    },

    /**
     * @returns {Object} post
     * @throws Will throw an error if post not found.
     */
    getPostById: async (id) => {
        let postsCollection = await posts();
        let post = await postsCollection.findOne({ _id: id });
        if (!post)
            throw ("Post not found.");
        return post;
    },

    /**
     * @returns {Object[]} postsOfUser
     */
    getPostsByUser: async (userId) => {
        let postsCollection = await posts();
        let postsOfUser = await postsCollection.find({ 'user.id': userId }).toArray();
        return postsOfUser;
    },

    /**
     * @returns {Object[]} postsOfFlight
     */
    getPostsByFlight: async (flightId) => {
        let postsCollection = await posts();
        let postsOfFlight = await postsCollection.find({ 'flight.id': flightId }).toArray();
        return postsOfFlight;
    }
}