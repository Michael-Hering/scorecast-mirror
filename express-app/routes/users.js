const express = require('express');
const router = express.Router();

const Users = require('../models/users')

router.post('/', (req, res) => {
    res.send("TESTING USERS");
});

module.exports = router;