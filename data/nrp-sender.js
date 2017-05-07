const redisConnection = require("./redis-connection");

const sendMessage = (messageConfig) => {
    return new Promise((fulfill, reject) => {
        let { id, collection } = messageConfig;

        let successEventName = `${collection}:success:${id}`;
        let failedEventName = `${collection}:failed:${id}`;

        let success = redisConnection.on(successEventName, (response, channel) => {
            fulfill(response.data);
            endMessageLifeCycle();
        });

        let error = redisConnection.on(failedEventName, (response, channel) => {
            reject(response.data);
            endMessageLifeCycle();
        });

        let shutoffEvents = [success, error];

        let endMessageLifeCycle = () => {
            shutoffEvents.forEach(shutOff => {
                shutOff();
            });
        }

        let outgoingEventName = `${collection}:request:${id}`;
        redisConnection.emit(outgoingEventName, messageConfig);
    });
};

module.exports = {
    sendMessage
};
