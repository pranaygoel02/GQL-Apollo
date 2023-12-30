const express = require('express');

const route = express.Router();

route.use((req, res) => {
    res.status(200).json({ message: 'Hello World!' });
})

module.exports = route;