const data = require("../data");
const userData = data.users;
const loginRoutes = require("./login");
const searchRoutes = require("./search");

const constructorMethod = (app) => {
    app.get("/", async (req, res) => {
        res.redirect("/search");
    });

    app.use("/login", loginRoutes);

    app.use("/search", searchRoutes);

    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;