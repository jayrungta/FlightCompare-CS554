const data = require("../data");
const userData = data.users;
const loginRoutes = require("./login");
const searchRoutes = require("./search");
const fs = require("fs");

const constructorMethod = (app) => {

    app.get("/users", async (req, res) => {
        let users = await userData.getAllUsers();
        res.json(users);
    });

    app.use("/login", loginRoutes);

    app.use("/search", searchRoutes);

    app.get("/displayPDF", (req, res) => {
        var tempFile = "./out.pdf";
        fs.readFile(tempFile, function (err, data) {
            res.contentType("application/pdf");
            res.send(data);
        });
    });

    app.get("/", (req, res) => {
        res.redirect("/search");
    });


    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;