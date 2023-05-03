/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO

    let chains=new Map(); /*creates a new array calling function on each item*/

    for (let i=0; i<this.words.length; i +=1){
      let word=this.words[i];
      let nextWord=this.words[i+1]|null;

      if(chains.has(word)) chains.get(word).push(nextWord);
      else chains.set(word,[nextWord]);
    }
    this.chains=chains;
  }
  /** pick random choice from array */
  static choice(arr){
    return arr[Math.floor(Math.random()*arr.length)];
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO   //picks random key to begin with
    let keys=Array.from(this.chains.keys());
    let key=MarkovMachine.choice(keys);
    let out=[];
    //this keeps making a markov chain until the end word is reached.
    while(out.length<numWords && key !== null){
      out.push(key);
      key=MarkovMachine.choice(this.chains.get(key));
    }
    return out.join(" ");
  }
}

module.exports={
  MarkovMachine,
};