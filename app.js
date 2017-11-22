/**
 * app.js
 * author: Bernardo Wilberger
 */

var matrixTransformer = {

  getRightDiagonal : (m) => {
	var s, x, y, d,
	o = [];
	for (s = 0; s < m.length; s++) {
	  d = [];
	  for(y = s, x = 0; y >= 0; y--, x++)
		d.push(m[y][x]);
	  o.push(d);
	}
	for (s = 1; s < m[0].length; s++) {
	  d = [];
	  for(y = m.length - 1, x = s; x < m[0].length; y--, x++)
		d.push(m[y][x]);
	  o.push(d);
	}
	return o.map((array) => {
      return array.join('');
    });
  },

  getLeftDiagonal : (m) => {
    let reverse = matrixTransformer.reverseMatrix(m);
    return matrixTransformer.getRightDiagonal(reverse);
  },

  reverseString : (string) => {
    return string.split("").reverse().join("");
  },

  reverseMatrix : (m) => {
    return m.map((string) => {
      return matrixTransformer.reverseString(string);
    });
  },

};

class mutantChecker {
  constructor (transformer) {
    this.transformer = transformer;

    this.findMutantBlocks = function (matrix) {

      let regex = /([ATGC])\1{3,4}/;

      let straight = matrix.filter((string) => {
        return regex.test(string);
      });

      let right = this.transformer.getRightDiagonal(matrix).filter((string) => {
        return regex.test(string);
      });

      let left = this.transformer.getLeftDiagonal(matrix).filter((string) => {
        return regex.test(string);
      });

      return straight.concat(right).concat(left);
    };

    this.isMutant = function (matrix) {
      let blocks = this.findMutantBlocks(matrix);
      return blocks.length > 1;
    };

    this.showMutantBlocks = function (matrix) {
      let blocks = this.findMutantBlocks(matrix);
      if(blocks.length > 1)
        return blocks;
      else
        return [];
    };
  }
}

/**
 * Begin test
 */

// Dna Matrix test cases
const dna1 = [
  "ATGCGA",
  "CAGTGC",
  "TTATGT",
  "AGAAGG",
  "CCCCTA",
  "TCACTG"
];

const dna2 = [
  "AAAAGA",
  "CAGTGC",
  "TTATGT",
  "AGAAGG",
  "CCCCAA",
  "TCACTG"
];

const dna3 = [
  "ATGCGA",
  "ATCGTA",
  "AGCGTA",
  "ATGCGA",
  "CCACAA",
  "CACACA"
];
mcheck = new mutantChecker(matrixTransformer);

console.log(mcheck.isMutant(dna1));
console.log(mcheck.showMutantBlocks(dna1));
console.log(mcheck.isMutant(dna2));
console.log(mcheck.showMutantBlocks(dna2));
console.log(mcheck.isMutant(dna3));
console.log(mcheck.showMutantBlocks(dna3));
