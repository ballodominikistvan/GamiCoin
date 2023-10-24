const Blockchain = require('./blockchain')

const GamiCoin = new Blockchain();

const previousBlockHash = 'sdfukgvzufztjztczt';
const currentBlockData = [
    {
        amount: 100,
        sender: 'cghcjchgfcjf',
        recipient: 'fddghjjuhgcdd'
    },
    {
        amount: 30,
        sender: 'rtghhjj',
        recipient: 'zuvkztcvz'
    },
    {
        amount: 88,
        sender: 'zfilvzzu',
        recipient: 'ckzckckzt'
    },
    
]

const nonce=888;

console.log(GamiCoin.hashBlock(previousBlockHash,currentBlockData, nonce));