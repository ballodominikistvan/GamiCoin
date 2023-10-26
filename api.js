const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const { v1: uuidv1 } = require('uuid');

const nodeAddress= uuidv1().split('-').join('');

const GamiCoin = new Blockchain();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/blockchain', function(req, res){
    res.send(GamiCoin);
});

app.post('/transaction', function(req, res){
    blockIndex=GamiCoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
    res.json({note: 'Transaction will be added to block ' + blockIndex})
});

app.get('/mine', function(req, res){
    const lastBlock = GamiCoin.getLastBlock();
    const previousBlockHash = lastBlock['hash'];
    const currentBlockData = {
        transactions: GamiCoin.pendingTransactions,
        index: lastBlock['index'] +1
    }
    const nonce = GamiCoin.proofOfWork(previousBlockHash, currentBlockData);
    const blockHash = GamiCoin.hashBlock(previousBlockHash, currentBlockData, nonce);
    GamiCoin.createNewTransaction(12.8, '00', nodeAddress);
    const newBlock = GamiCoin.createNewBlock(nonce, previousBlockHash, blockHash);
    

    
    res.json({
        note: "New block mined..",
        block: newBlock
    })
});


app.listen(8888, function(){
    console.log('Listening at port 8888...');
});