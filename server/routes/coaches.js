const express = require('express');
const { findCoach } = require('../db.js');
const router = express.Router();
const db = require('../db.js');


router.get('/', async function (req, res) {

    const d = await db.findCoaches(req.params);
    res.json(d);
    console.log(d);
});



router.get('/:name', async function (req, res) {
    const coach = await db.findCoaches(req.params);
    res.json(coach);
});

router.post('/', async function (req, res) {
    try {
        const data = req.body;
        await db.saveCoach(data);
        res.send("coach data saved");
    } catch (err) {
        console.log(err);
    }
})

router.delete('/:coachID', async function (req, res) {
    try {
        const id = req.params.coachID;
        await db.deleteCoach(id);
        res.send("COACH deleted");
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;