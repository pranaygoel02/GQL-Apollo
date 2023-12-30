const express = require('express');

const route = express.Router();

route.use((req, res) => {
    res.status(200).json({ message: 'Authentication Server!' });
});

module.exports = route;