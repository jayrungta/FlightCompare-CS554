const express = require('express');
const router = express.Router();
const data = require("../data");
const postData = data.posts;

router.get("/:flightId", async (req, res) => {
    try {
        let flightId = req.params.flightId;
        let posts = await postData.getPostsByFlight(flightId);
        res.json(posts);
    } catch (err) {
        res.status(500).send({ error: err });
    }
});

router.post("/", async (req, res) => {
    try {
        await postData.addPost(req.body);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send({ error: err });
    }
});

module.exports = router;