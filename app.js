const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Wellcome to the API'
    });
});

app.listen(5000, () => console.log('server start on port 5000'));