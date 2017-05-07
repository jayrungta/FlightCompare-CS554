const userData = require("./users");
const postData = require("./posts");
const flightData = require("./flights");
const orderData = require("./orders");
const notificationData = require("./notifications");

module.exports = {
    users: userData,
    posts: postData,
    flights: flightData,
    orders: orderData,
    notifications: notificationData
}