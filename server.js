const url = require('url')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcryptjs');
const client = require('./dbconnect');

app.set('port', (process.env.PORT || 8080));
app.use(express.static('public'));
app.use(bodyParser.json());

var users = require('./users.js');
app.use('/users/', users);

var tasks = require('./tasks.js');
app.use('/tasks/', tasks);

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Noe gikk veldig galt med serveren vår. Prøv igjenn siden. Send oss gjerne en epost.');
});

app.listen(app.get('port'), function () {
    console.log('GoEasy running on port: ', app.get('port'));
});
