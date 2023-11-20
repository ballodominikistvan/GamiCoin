const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const { v1: uuidv1 } = require('uuid');
const rp = require('request-promise');


const nodeAddress= uuidv1().split('-').join('');

const port = process.argv[2];

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
    GamiCoin.createNewTransaction(1, '00', nodeAddress);
    const newBlock = GamiCoin.createNewBlock(nonce, previousBlockHash, blockHash);
    

    
    res.json({
        note: "New block mined..",
        block: newBlock
    })
});

app.post('/register-and-broadcast-node', function(req,res){
    const newNodeUrl = req.body.newNodeUrl;
    if (GamiCoin.networkNodes.indexOf(newNodeUrl)== -1) GamiCoin.networkNodes.push(newNodeUrl);
    const regNodesPromises = [];
    GamiCoin.networkNodes.forEach(newNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + '/register-node',
            method: 'POST',
            body: { newNodeUrl:newNodeUrl },
            json: true
        };
        regNodesPromises.push(rp(requestOptions));
    });
    Promise.all(regNodesPromises)
    .then(data => {
        const bulkRegisterOptions={
            uri: newNodeUrl + '/register-nodes-bulk',
            method: 'POST',
            body: { allNetworkNodes: [ ...GamiCoin.networkNodes, GamiCoin.currentNodeUrl] },
            json: true
        };
        return rp(bulkRegisterOptions);
    })
    .then(data => {
        res.json({note: 'New node registered with network succesfully...'});
    });
});

app.post('/register-node', function(reg,res){
    newNodeUrl = req.body.networkNodeUrl;
    const nodeNotAlreadyPresent = GamiCoin.networkNodes.indexOf(newNodeUrl)== -1;
    const notCurrentNode = GamiCoin.currentNodeUrl !== newNodeUrl;
    if (nodeNotAlreadyPresent && notCurrentNode) GamiCoin.networkNodes.push(newNodeUrl);
    res.json(bote: 'New node registered succesfully.');
});

app.post('/register-nodes-bulk', function(req,res){
    const allNetworkNodes = req.body.allNetworkNodes;
    allNetworkNodes.forEach(networkNodeUrl => {
        const nodeNotAlreadyPresent = GamiCoin.networkNodes.indexOf(networkNodeUrl)== -1;
        const notCurrentNode = GamiCoin.currentNodeUrl !== networkNodeUrl;
        if (nodeNotAlreadyPresent && notCurrentNode) GamiCoin.networkNodes.push(networkNodeUrl);
    });
    res.json({note: 'Bulk registration succesful!'});
});


app.listen(port, function(){
    console.log('Listening at port ' + port);
});