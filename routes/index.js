const loginRoutes = require("./login");
const searchRoutes = require("./search");
const postRoutes = require("./posts");
const fs = require("fs");

const constructorMethod = (app) => {
    app.use("/login", loginRoutes);

    app.use("/search", searchRoutes);

    app.use("/posts", postRoutes);

    router.get("/displayPDF", (req, res) => {
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