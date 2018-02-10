"use strict";

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string;
    this.fixedBoard = this.board()
    this.zeroPosition = this.zeroPosition()
  }

  board() {
    let board = [];
    let inc = 0;
    for(let i=0; i<9; i++){
      let row = [];
      for(let j=0; j<9; j++){
        row.push(Number(this.board_string[inc]));
        inc++;
      }
      board.push(row);
    }
    return board;
  }

  zeroPosition(){ // simpan kordinat
    let kordinat = [];
    for(let i=0; i<this.fixedBoard.length; i++){
      for(let j=0; j<this.fixedBoard.length; j++){
        if(this.fixedBoard[i][j] === 0){
          kordinat.push([i,j]);
        }
      }
    }
    return kordinat;
  }

  fillZeroSpace(){
    let x = 0;
    let y = 1;
    let num = 4;
    
    if(this.cekRows(x, num) === true && this.cekColumn(y, num) === true){
      return '['+x+','+y+']' +' Tidak ada angka ' + num;
    } else {
      return '['+x+','+y+']' + ' ADA ANGKA ' + num;
    }
  }

  cekRows(x, num){
    for(let i=0; i<this.fixedBoard.length; i++){
      for(let j=0; j<this.fixedBoard.length; j++){
        if(i === x){
          if(this.fixedBoard[i][j] === num){
            return false;
          }
        }
      }
    }
    return true;
  }

  cekColumn(y, num){
    for(let i=0; i<this.fixedBoard.length; i++){
      for(let j=0; j<this.fixedBoard.length; j++){
        if(j === y){
          if(this.fixedBoard[i][j] === num){
            return false;
          }
        }
      }
    }
    return true;
  }
  cekBlock(x, y, num){
    
    
  }

  solve() {
    
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require("fs");
var board_string = fs
  .readFileSync("set-01_sample.unsolved.txt")
  .toString()
  .split("\n")[0];
// console.log(board_string);

var game = new Sudoku(board_string);

// Remember: this will just fill out what it can and not "guess"

console.log(game.board())
console.log(game.fillZeroSpace())
console.log(game.cekRows())
console.log(game.solve())