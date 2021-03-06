const url = require('url')
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const client = require('./dbconnect');
var path = require('path');

var secret = 'baguettepeoplearelate';
var logindata;

router.use(function (req, res, next) {

    var token = req.query['token'];

    if (!token) {
        res.status(403).json({
            msg: "No token received"
        }); 
        return; 
    } else {
        try {
            logindata = jwt.verify(token, secret); 
        } catch (err) {
            res.status(403).json({
                msg: "The token is not valid!"
            });
            return; 
        }
    }

    next();
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

    client.query(`INSERT INTO tasks_table (title, date, description, username) VALUES ('${mTitle}', '${mDate}', '${mDescription}', '${mUser}') RETURNING id, title, date, description, username, done;`)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one task',
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
                    message: 'Tasks retrieved',
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

router.post('/update/', function (req, res, next) {
    let reqJSON = req.body;
    let taskID = reqJSON.id;
    let mTitle = reqJSON.title;
    let mDone = reqJSON.done;
    let mPriority = reqJSON.priority;
    console.log(`UPDATE tasks_table SET title='${mTitle}', done='${mDone}', priority='${mPriority}' WHERE id=${taskID} RETURNING id, title, date, description, done, priority;`);
    client.query(`UPDATE tasks_table SET title='${mTitle}', done='${mDone}', priority='${mPriority}' WHERE id=${taskID} RETURNING id, title, date, description, done, priority;`)
        .then(function (data) {
            console.log(data.rows[0]);
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated task',
                    data: data.rows[0]
                });
        })
        .catch(function (err) {
            return next(err);
        });
});

module.exports = router;
