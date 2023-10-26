const Blockchain = require('./blockchain')

const GamiCoin = new Blockchain();

GamiCoin.createNewTransaction(100,'lgo87flfvzo7', 'izg87foo8f');
GamiCoin.createNewTransaction(10,'lgo87flweffvzo7', 'izg87foo8f');
GamiCoin.createNewTransaction(130,'lgo87flfvzewfo7', 'izg87foo8f');

nonce = GamiCoin.proofOfWork(GamiCoin.getLastBlock().hash, GamiCoin.pendingTransactions);
GamiCoin.createNewBlock(nonce,GamiCoin.getLastBlock().hash, GamiCoin.hashBlock(GamiCoin.getLastBlock().hash, GamiCoin.pendingTransactions,nonce) )

console.log(GamiCoin.chain[1])
