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
})
app.get('/login/:username?/:hash?', function (req, res) {
    let userName = req.params.username;
    let passHash = req.params.hashM
    if (!userName || !passHash) {
        return;
    }
    res.send("username: "+userName+" hash: "+ passHash);
})
app.get('/tasks', function (req, res) {    
    tasks="hh";
    res.send(tasks);
})
app.post('/modifytask', function (req, res) {    
    if (!req.body.username || !req.body.password) {
        return;
    } else{
        
    }
})
app.delete('/deletetask', function (req, res) {    
    
})
