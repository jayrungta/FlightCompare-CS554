const loginRoutes = require("./login");
const searchRoutes = require("./search");
const postRoutes = require("./posts");
const fs = require("fs");
const readline = require('readline');

const constructorMethod = (app) => {
    app.use("/login", loginRoutes);

    app.use("/search", searchRoutes);

    app.use("/posts", postRoutes);

    app.get("/displayPDF", (req, res) => {
        var tempFile = "./out.pdf";
        fs.readFile(tempFile, function (err, data) {
            res.contentType("application/pdf");
            res.send(data);
        });
    });

    app.get("/airports", (req, res) => {
        var file = "./iata-airport-codes.txt";
        const rl = readline.createInterface({
            input: fs.createReadStream('./iata-airport-codes.txt')
        });
        let lines = [];
        rl.on('line', (line) => {
            lines.push (line.replace("\t"," - "));
        });

        rl.on('close', () => {
            res.send(lines);
        });
    });

    app.get("/logout", (req, res) => {
        if (req.user) {
            req.logout();
            res.redirect("/");
        }
    });

    app.get("/", (req, res) => {
        res.redirect("/search");
    });

    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;