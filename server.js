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
    let score = req.body;
    console.log(score);
    if (!req.body.loginname || !req.body.password) {
        return;
    } else {
        var mAvatar = req.body.avatar;
        var mLoginname = req.body.loginname;
        var mPassHash = req.body.password;
        client.query(`INSERT INTO user_table (username,mpassword,avatar) VALUES ('${mLoginname}', '${mPassHash}', '${mAvatar}');`, (err, res) => {
            if (err) throw err;
            for (let row of res.rows) {
                console.log(JSON.stringify(row.username));
                console.log(JSON.stringify(row.mpassword));
            }
            //client.end();
        });
    }
    res.status(200).send(JSON.stringify({
        msg: "success"
    }));
})


app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Noe gikk veldig galt med serveren vår. Prøv igjenn siden. Send oss gjerne en epost.');
});

app.listen(app.get('port'), function () {
    console.log('Guess my number server running', app.get('port'));
});


function getHighScores() {


}

function saveHighScores(score) {

    let client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: true
    });

    client.connect();

    let sql = `INSERT INTO "highscores"("name", "score", "timestamp") VALUES('${score.name}', ${score.score}, '${score.timestamp}') RETURNING "id", "name", "score", "timestamp";`

    client.query(sql, (err, resp) => {
        console.dir(resp);
        client.end();
    });

}
