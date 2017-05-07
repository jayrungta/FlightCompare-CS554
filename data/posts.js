const nrpSender = require("./nrp-sender");
const uuid = require('node-uuid');

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
        return await nrpSender.sendMessage({
            id: uuid.v4(),
            collection: "posts",
            operation: "addPost",
            params: { post }
        });
    },

    /**
     * @returns id - Id of the newly deleted post.
     * @throws Will throw an error if delete fails.
     */
    deletePost: async (id) => {
        return await nrpSender.sendMessage({
            id: uuid.v4(),
            collection: "posts",
            operation: "deletePost",
            params: { id }
        });
    },

    /**
     * @returns {Object} post
     * @throws Will throw an error if post not found.
     */
    getPostById: async (id) => {
        return await nrpSender.sendMessage({
            id: uuid.v4(),
            collection: "posts",
            operation: "getPostById",
            params: { id }
        });
    },

    /**
     * @returns {Object[]} postsOfUser
     */
    getPostsByUser: async (userId) => {
        return await nrpSender.sendMessage({
            id: uuid.v4(),
            collection: "posts",
            operation: "getPostsByUser",
            params: { userId }
        });
    },

    /**
     * @returns {Object[]} postsOfFlight
     */
    getPostsByFlight: async (flightId) => {
        return await nrpSender.sendMessage({
            id: uuid.v4(),
            collection: "posts",
            operation: "getPostsByFlight",
            params: { flightId }
        });
    }
}