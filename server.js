const url = require('url')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {
    Client
} = require("pg");
const client = new Client({
    connectionString: process.env.DATABASE_URL || "postgres://xjcnfjccvbpepn:198cb597d44207d8239ae13641a103e7c47617566775bf0b73869923a841305d@ec2-54-75-225-143.eu-west-1.compute.amazonaws.com:5432/dai971uulqhd0f?ssl=true",
});

client.connect();
var highscoreList = [];

app.set('port', (process.env.PORT || 8080));
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    let staticApp = readTextFile("public/index.html");
    res.send(staticApp);
});

app.get('/highscores', function (request, response) {
    //res.send(JSON.stringify(highscoreList));
    response.send(highscoreList);
});

app.post("/createuser", function (req, res) {
    let reqJSON = req.body;
    let mUser = reqJSON.loginname;
    let mPassword = reqJSON.password;


    if (!mUser || !mPassword) {
        return;
    } else {
        try {
            var mAvatar = req.body.avatar;
            client.query(`INSERT INTO user_table (username,mpassword,avatar) VALUES ('${mUser}', '${mPassword}', '${mAvatar}');`, (err, ress) => {
                if (err) {
                    res.status(200).send(JSON.stringify({
                        msg: "Username already exists!"
                    }));

                } else {
                    res.status(200).send(JSON.stringify({
                        msg: "Your account has been created successfully."
                    }));
                }
//                for (let row of ress.rows) {
//                    console.log(JSON.stringify(row.username));
//                    console.log(JSON.stringify(row.mpassword));
//                }
                //client.end();
            });



        } catch (err) {
            res.status(100).send(JSON.stringify({
                msg: "Username already exists"
            }));
        }
    }
});


app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Noe gikk veldig galt med serveren vår. Prøv igjenn siden. Send oss gjerne en epost.');
});

app.listen(app.get('port'), function () {
    console.log('Guess my number server running', app.get('port'));
});


function createUser() {


}
