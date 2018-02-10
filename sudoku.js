"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string
    this.board = this.board()
  }

  solve() {
  }

  //scan array per tiga baris
  threeBoard(){
    let angka = '123456789';
    let arrayKeseluruhan = [];
    for(let j=0; j<angka.length; j++){
      let tampungAngka = [];
      for(let k=0; k<3; k++){
        let array = [];
        for(let l=k*3; l<=k*3+2; l++){
          let koordinat = [];
          for(let m=0; m<this.board[l].length; m++){
            if(this.board[l][m]===angka[j]){
              koordinat.push(l);
              koordinat.push(m);
              array.push(koordinat);
            }
          }
        }
        tampungAngka.push(array);
      }
      arrayKeseluruhan.push(tampungAngka);
    }
    return this.board[0];
  }

  // Returns a string representing the current state of the board
  board() {
    let papan = [];
    let baris = [];
    for(let i=0; i<this.board_string.length; i++){
      if(i%9===0){
        papan.push(baris);
        baris = [];
        baris.push(this.board_string[i]);
      } else {
        baris.push(this.board_string[i]);
      }
    }
    papan.push(baris);
    papan.shift();
    return papan;
  }

  kotakan(){

  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)
// console.log(board_string);

// Remember: this will just fill out what it can and not "guess"
// game.solve()
console.log(game.kotakan())
