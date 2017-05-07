const redisConnection = require("./redis-connection");
const { users, posts, orders, flights } = require("./data");

redisConnection.on("users:request:*", async (message) => {
    let { id, collection, operation, params} = message;

    try {
        let result = await users[operation](params);

        let successEvent = `${collection}:success:${id}`;
        redisConnection.emit(successEvent, { data: result });
    } catch (error) {
        let failedEvent = `${collection}:failed:${id}`;
        redisConnection.emit(failedEvent, { data: error });
    };
});

redisConnection.on("posts:request:*", async (message) => {
    let { id, collection, operation, params} = message;

    try {
        let result = await posts[operation](params);

        let successEvent = `${collection}:success:${id}`;
        redisConnection.emit(successEvent, { data: result });
    } catch (error) {
        let failedEvent = `${collection}:failed:${id}`;
        redisConnection.emit(failedEvent, { data: error });
    };
});

redisConnection.on("orders:request:*", async (message) => {
    let { id, collection, operation, params} = message;

    try {
        let result = await orders[operation](params);

        let successEvent = `${collection}:success:${id}`;
        redisConnection.emit(successEvent, { data: result });
    } catch (error) {
        let failedEvent = `${collection}:failed:${id}`;
        redisConnection.emit(failedEvent, { data: error });
    };
});

redisConnection.on("flights:request:*", async (message) => {
    let { id, collection, operation, params} = message;

    try {
        let result = await flights[operation](params);

        let successEvent = `${collection}:success:${id}`;
        redisConnection.emit(successEvent, { data: result });
    } catch (error) {
        let failedEvent = `${collection}:failed:${id}`;
        redisConnection.emit(failedEvent, { data: error });
    };
});