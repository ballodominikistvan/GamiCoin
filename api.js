const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');

const GamiCoin = new Blockchain();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/blockchain', function(req, res){
    res.send(GamiCoin);
});

app.post('/transaction', function(req, res){
    console.log(req.body);
    res.send('The amount of transaction is '+ req.body.amount+' GamiCoin!')
});

app.get('/mine', function(req, res){

});


app.listen(8888, function(){
    console.log('Listening at port 8888...');
});