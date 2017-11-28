const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const client = require('./dbconnect');

var secret = 'baguettepeoplearelate';
var regUsername = new RegExp('^[a-zA-Z0-9]+([-_]?[a-zA-Z0-9])+$');
var regPassw = new RegExp('^([a-zA-Z0-9Ø#@&\(§!\)-_\$\*€\^%£=\+\/:\.;,\?])+$');

router.get('/', function (req, res) {
    let staticApp = readTextFile("public/index.html");
    res.send(staticApp);
});

router.post('/login', function (req, res, next) {
    let reqJSON = req.body;
    let mUser = reqJSON.loginname;
    let mPassword = reqJSON.password;
    if(regUsername.test(mUser)){
        console.log("username passed")
    }
    else{
        res.statusMessage = "Invalid username";
        res.status(400).send('Invalid username');
        return;
    }
    
    if(regPassw.test(mPassword)){
        console.log("password passed")
    }else{
        res.statusMessage = "Invalid password";
        res.status(400).send('Invalid password');
        return;
        
    }
    console.log(`SELECT * FROM user_table WHERE username='${mUser}';`);
    client.query(`SELECT * FROM user_table WHERE username='${mUser}';`)
        .then(function (data) {
            if (passwordMatchesHash(mPassword, data.rows[0].mpassword)) {
                var payload = {username: data.rows[0].username};
                var token = jwt.sign(payload, secret, {expiresIn: "12h"});
                res.status(200)
                    .json({
                        status: 'success',
                        id: data.rows[0].id,
                        username: data.rows[0].username,
                        avatar: data.rows[0].avatar,
                        token: token,
                        msg: 'Successfully logged in.'
                    });
            } else {
                res.statusMessage = "Current password does not match";
                res.status(400).send('Current password does not match');
            }
        })
        .catch(function (err) {
            console.log(err);
            return next(err);
        });

});

router.post("/createuser", function (req, res) {
    let reqJSON = req.body;
    let mUser = reqJSON.loginname;
    let mPassword = reqJSON.password;

    if(regUsername.test(mUser)){
        console.log("username passed")
    }
    else{
        res.statusMessage = "Invalid username";
        res.status(400).send('Invalid username');
        return;
    }
    
    if(regPassw.test(mPassword)){
        console.log("password passed")
    }else{
        res.statusMessage = "Invalid password";
        res.status(400).send('Invalid password');
        return;
        
    }

    if (!mUser || !mPassword) {
        return;
    } else {
        let mHashedPassword = getHashedPassword(mPassword);
        try {
            var mAvatar = req.body.avatar;
            client.query(`INSERT INTO user_table (username,mpassword,avatar) VALUES ('${mUser}', '${mHashedPassword}', '${mAvatar}');`, (err, ress) => {
                if (err) {
                    res.status(200).send(JSON.stringify({
                        msg: "Username already exists!"
                    }));

                } else {
                    res.status(200).send(JSON.stringify({
                        msg: "Your account has been created successfully."
                    }));
                }
            });



        } catch (err) {
            res.status(100).send(JSON.stringify({
                msg: "Username already exists"
            }));
        }
    }
});

function getHashedPassword(unHashedPassword) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(unHashedPassword, salt);
    return hash;
}

function passwordMatchesHash(input, dbPasswordHash) {
    return bcrypt.compareSync(input, dbPasswordHash);
}

module.exports = router;