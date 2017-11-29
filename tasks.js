const url = require('url')
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const client = require('./dbconnect');
var path = require('path');

var secret = 'baguettepeoplearelate';
var logindata; //logindata from the token

router.use(function (req, res, next) {

    //get the token from the URL-variable named 'token'
    var token = req.query['token'];

    if (!token) {
        res.status(403).json({
            msg: "No token received"
        }); //send
        return; //quit
    } else {
        try {
            logindata = jwt.verify(token, secret); //check the token
        } catch (err) {
            res.status(403).json({
                msg: "The token is not valid!"
            }); //send
            return; //quit
        }
    }

    next(); //we have a valid token - go to the requested enpoint
});

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/application.html'));
});

router.post('/save', function (req, res, next) {
    let reqJSON = req.body;
    let mTitle = reqJSON.title;
    let mDate = reqJSON.date;
    let mDescription = reqJSON.description;
    let mUser = reqJSON.user;

    client.query(`INSERT INTO tasks_table (title, date, description, username) VALUES ('${mTitle}', '${mDate}', '${mDescription}', '${mUser}') RETURNING id, title, date, description, username;`)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one puppy',
                    data: data.rows[0]
                });
        })
        .catch(function (err) {
            return next(err);
        });


});

router.get('/list/:mUser', function (req, res, next) {
    console.log(req.params.mUser)
    client.query(`SELECT * FROM tasks_table WHERE username='${req.params.mUser}';`)
        .then(function (data) {
            console.log(data.rows);
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one puppy',
                    data: data.rows
                });
        })
        .catch(function (err) {
            return next(err);
        });


});

router.delete('/delete/:id', function (req, res, next) {
  var taskID = parseInt(req.params.id);
  client.query(`DELETE FROM tasks_table WHERE id = ${taskID} RETURNING id;`)
    .then(function (result) {
      console.log(result.rows[0].id);
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} task`,
          id: result.rows[0].id
        });
    })
    .catch(function (err) {
      return next(err);
    });
});

module.exports = router;
