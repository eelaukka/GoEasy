const express = require('express')
const app = express()




app.listen(process.env.PORT || 8080, function () {
    console.log('Example app listening on port 8080!')
})
app.use(express.static('public'))
//
app.get('/', function (req, res) {    
    res.send("hello");
})


app.post('/createaccount', function (req, res) {    
    if (!req.body.username || !req.body.password) {
        return; 
    } else{
        //
    }
})
app.get('/login', function (req, res) {    
    if (!req.body.username || !req.body.password) {
        return;
    } else{
        //
    }
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
