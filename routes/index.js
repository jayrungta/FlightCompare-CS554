const data = require("../data");
const userData = data.users;

const constructorMethod = (app) => {
    app.get("/", async (req, res) => {
        res.json(await userData.getAllUsers());
    });

    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;