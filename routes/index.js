const data = require("../data");
const userData = data.users;

const constructorMethod = (app) => {
    app.get("/", (req, res) => {
        userData.addUser();
    });

    app.use("*", (req, res) => {
        res.sendStatus(404);
    })
};

module.exports = constructorMethod;