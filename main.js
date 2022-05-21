const SHA256 = require('crypto-js/sha256')

// Block
class Block{
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }
    calculateHash() {
        return SHA256(this.index,this.previousHash, this.timestamp, JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()]
    }

    createGenesisBlock() {
        return new Block(0, '21-05-2022', 'GenesisBlock: the first block', '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}


let demoCoin = new Blockchain();
demoCoin.addBlock(new Block(1, '20-05-2022', {amount: 4}))
demoCoin.addBlock(new Block(2, '21-05-2022', { amount: 7 }))


console.log(JSON.stringify(demoCoin, null, 4));