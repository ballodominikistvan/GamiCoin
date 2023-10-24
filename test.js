const Blockchain = require('./blockchain')

const GamiCoin = new Blockchain();

GamiCoin.createNewBlock(12345, 'dfvz54rdcvgzr', 'dcvbbju7tg');

console.log(GamiCoin)