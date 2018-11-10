const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Wellcome to the API'
    });
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err){
            res.json({
                message: 'token invalid',
            });
        }else {
            res.json({
                message: 'Post created....',
                authData
            });
        }
    });
});

app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        username: 'soyket',
        email: 'soyket@gmail.com'
    }
    jwt.sign({ user }, 'secretkey', { expiresIn: '30s' }, (err, token) => {
        res.json({
            token
        })
    });
});

// verify token
function verifyToken(req, res, next){
    const userToken = req.headers['authtoken'];
    if (typeof userToken !== undefined){
        const token = userToken.split(' ');
        const authToken = token[1];
        req.token = authToken;
        next();
    }else {
        res.status(403);
    }
};

app.listen(5000, () => console.log('server start on port 5000'));