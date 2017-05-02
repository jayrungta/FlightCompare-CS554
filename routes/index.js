const data = require("../data");
const userData = data.users;
const loginRoutes = require("./login");
const searchRoutes = require("./search");

const constructorMethod = (app) => {
    app.get("/", (req, res) => {
        res.redirect("/search");
    });
    
    app.get("/users", async (req, res) => {
        let users = await userData.getAllUsers();
        res.json(users);
    });    
    
    app.use("/login", loginRoutes);

    app.use("/search", searchRoutes);

    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;