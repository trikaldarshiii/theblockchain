const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class TheBlockChain {
    constructor() {
        this.myChain = [this.createGenesisBlock()];
    }
    createGenesisBlock() {
        return new Block(0, Date.now(), 'Genesis block', '0');
    }
    getLatestBlock() {
        return this.myChain[this.myChain.length - 1];
    }
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.myChain.push(newBlock);
    }
    toJSON() {
        console.log(JSON.stringify(this.myChain, null, 4));
    }
    isChainValid() {
        for (let i = 1; i < this.myChain.length; i++) {
            const currentBlock = this.myChain[i];
            const previousBlock = this.myChain[i - 1];
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let myCoins = new TheBlockChain();
myCoins.addBlock(new Block(1, '09/02/2017 10:15:47.908', { amount: 90 }));
myCoins.addBlock(new Block(2, '09/02/2017 10:17:07.908', { amount: 100 }));
myCoins.addBlock(new Block(3, '09/02/2017 10:27:07.908', { amount: 300 }));
myCoins.toJSON();

console.log('Blockchain valid? ' + myCoins.isChainValid());
console.log('Changing a block...');
myCoins.myChain[1].data = { amount: 100 };
// myCoins.chain[1].hash = myCoins.chain[1].calculateHash();

// console.log(JSON.stringify(myCoins, null, 4));

console.log("Blockchain valid? " + myCoins.isChainValid());
