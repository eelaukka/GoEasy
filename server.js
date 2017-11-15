const express = require('express')
const app = express()
const {
    Client
} = require('pg');

const client = new Client({
    connectionString: process.env.DATABASE_URL || "postgres://xjcnfjccvbpepn:198cb597d44207d8239ae13641a103e7c47617566775bf0b73869923a841305d@ec2-54-75-225-143.eu-west-1.compute.amazonaws.com:5432/dai971uulqhd0f?ssl=true",
});

client.connect();
//app.get('/api/user', function(req,res) {
//client.query('SELECT * FROM user_table;', (err, res) => {
//    if (err) throw err;
//    for (let row of res.rows) 
//    {
//        console.log(JSON.stringify(row.username));
//        console.log(JSON.stringify(row.mpassword));
//    }
//    //client.end();
//});
//});


app.listen(process.env.PORT || 8080, function () {
    console.log('Example app listening on port 8080!')
})
app.use(express.static('public'))
//
app.get('/', function (req, res) {
    res.send("goeasy3");
})


app.post('/createuser', function (req, res) {
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
    res.send("success");
})
app.get('/login', function (req, res) {
    let userName = req.query.username;
    let passHash = req.query.hash
    if (!userName || !passHash) {
        return;
    }
    res.send("success");
})
app.get('/tasks/:username', function (req, res) {
    tasks = "hh";
    res.send("json");

})
app.post('/createtask', function (req, res) {
    if (!req.body.id || !req.body.title || !req.body.date) {
        return;
    } else {

    }
    res.send("success");
})
app.post('/modifytask', function (req, res) {
    if (!req.body.id || !req.body.title || !req.body.date) {
        return;
    } else {

    }
    res.send("success");
})
app.delete('/deletetask', function (req, res) {
    if (!req.body.id || !req.body.token) {
        return;
    } else {

    }
    res.send("success");
})
