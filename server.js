const express = require('express')
const app = express()




app.listen(process.env.PORT || 8080, function () {
    console.log('Example app listening on port 8080!')
})
app.use(express.static('public'))
//
app.get('/', function (req, res) {    
    res.send("goeasy3");
})


app.post('/createaccount', function (req, res) {    
    if (!req.body.username || !req.body.password) {
        return; 
    } else{
        //
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
    tasks="hh";
    res.send("json");
    
})
app.post('/createtask', function (req, res) {    
    if (!req.body.id || !req.body.title || !req.body.date) {
        return;
    } else{
        
    }
    res.send("success");
})
app.post('/modifytask', function (req, res) {    
    if (!req.body.id || !req.body.title || !req.body.date) {
        return;
    } else{
        
    }
    res.send("success");
})
app.delete('/deletetask', function (req, res) {    
    if (!req.body.id || !req.body.token) {
        return;
    } else{
        
    }
    res.send("success");
})
