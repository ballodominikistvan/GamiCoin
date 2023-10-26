const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/blockchain', function(req, res){

});

app.post('/transaction', function(req, res){

});

app.get('/mine', function(req, res){

});


app.listen(8888, function(){
    console.log('Listening at port 8888...');
});