// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Create a object factory.
let count = 1;
const pAequorFactory = (specimenNum, dna) => {
  count++;
  return {
    specimenNum,
    dna,
    mutate() {
      // Find a random base position from the DNA and a random base to mutate it to.
      const randomBase = Math.floor(Math.random() * 15);
      let changeBase = returnRandBase();

      // If the current base is the same as the new base, find a new base.
      while (this.dna[randomBase] === changeBase) {
        changeBase = returnRandBase();
      }

      // Change the base once it is different.
      this.dna[randomBase] = changeBase;
    },
    compareDNA() {
      // Create a comparison dna sample.
      const dnaTwo = pAequorFactory(count, mockUpStrand());
      let compareCount = 0;

      // Compare each base for both samples and increment the number that is the same.
      for (let x = 0; x < this.dna.length; x++) {
        if (this.dna[x] === dnaTwo.dna[x]) {
          compareCount++;
        }
      }

      // Display the percentage that are the same.
      let percentage = (compareCount / this.dna.length) * 100;
      console.log(`Specimen #1 and Specimen #2 have ${percentage.toFixed(2)}% DNA in common`);
    },
    willLikelySurvive() {
      let countBases = 0;

      // Check the dna sample for C & G bases. Increment the counts.
      for (let x = 0; x < this.dna.length; x++) {
        if (this.dna[x] === "C") {
          countBases++;
        } else if (this.dna[x] === "G") {
          countBases++;
        }
      }

      // Return true if the G or C count is more than 60%.
      if (countBases / this.dna.length >= .6) {
        return true;
      } else {
        return false;
      }
    }
  }
};

let storedInstances = [];

while (storedInstances.length < 30) {
  let newDNA =  pAequorFactory(count, mockUpStrand());
  if (newDNA.willLikelySurvive()) {
    storedInstances.push(newDNA);
  }
}


// Testing the object factory.

console.log(storedInstances);
console.log(storedInstances.length);

