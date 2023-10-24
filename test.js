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

console.log(GamiCoin.proofOfWork(previousBlockHash,currentBlockData))