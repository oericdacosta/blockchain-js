const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(timeStamp, data, previousHash) {
    this.index = 0;

    this.timeStamp = timeStamp;

    this.data = data;

    this.previousHash = previousHash;

    this.hash = this.calculateHash();

    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      this.index + this.previousHash + this.timeStamp + this.data + this.nonce
    ).toString();
  }

  mineBlock(difficulty) {}
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesis()];
  }

  createGenesis() {
    let data = new Date();
    let dataFormatada =
      data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear();
    return new Block(dataFormatada, { amount: 0 }, "Genesis Block", "0");
  }

  latestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.latestBlock().hash;
    newBlock.index = this.latestBlock().index + 1;

    newBlock.hash = newBlock.calculateHash();

    this.chain.push(newBlock);
  }

  checkValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

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

let jsChain = new Blockchain();

jsChain.addBlock(new Block("16/11/2022", { amount: 5 }));
jsChain.addBlock(new Block("17/11/2022", { amount: 10 }));

console.log(JSON.stringify(jsChain, null, 4));
console.log("Is blockchain valid?" + jsChain.checkValid());
