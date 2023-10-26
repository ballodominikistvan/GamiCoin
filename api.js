const express = require('express');
const app = express();


app.get('/blockchain', function(req, res){

});

app.post('/transaction', function(req, res){

});

app.get('/mine', function(req, res){

});


app.listen(8888, function(){
    console.log('Listening at port 8888...');
});