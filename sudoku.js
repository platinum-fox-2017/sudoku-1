"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardString = board_string;
    this.boardArr = this.board();
    this.emptyBox = this.checkEmptyBox();
    this.i=0;
    this.number = 1;
  }

  solve(){
    if(this.i>=this.emptyBox.length){
      return this.boardArr;
    }

    if(this.number>9){
      // console.log('koordinat: ('+this.emptyBox[this.i].i+', '+this.emptyBox[this.i].j+') = '+this.number.toString()+' dan index emptyBox saat ini = '+ this.i);
      // console.log(this.boardArr)
      this.i--;
      this.boardArr[this.emptyBox[this.i].i][this.emptyBox[this.i].j] = '0';
      this.number = Number(this.emptyBox[this.i].number);
      this.number++;
      return this.solve(this.i, this.number);
    }

    if(this.checker(this.emptyBox[this.i].i, this.emptyBox[this.i].j, this.number.toString())){
      this.boardArr[this.emptyBox[this.i].i][this.emptyBox[this.i].j] = this.number.toString();
      this.emptyBox[this.i].number = this.number.toString();
      //console.log('koordinat: ('+this.emptyBox[this.i].i+', '+this.emptyBox[this.i].j+') = '+this.number.toString()+' dan index emptyBox saat ini = '+ this.i);
      this.i++;
      this.number = 1;
      return this.solve(this.i, this.number)
    }else{
      this.number++;
      return this.solve(this.i, this.number);
    }
  }

  checkEmptyBox(){
    let emptyBox = [];
    for(let i=0; i<this.boardArr.length; i++){
      for(let j=0; j<this.boardArr[i].length; j++){
        if(this.boardArr[i][j]==0){
          emptyBox.push({i:i, j:j});
        }
      }
    }
    return emptyBox;
  }

  checker(vertical, horizontal, value){
    for(let i=0; i<9; i++){
      if(value == this.boardArr[i][horizontal]){
        return false;
      }
    }
    for(let i=0; i<9; i++){
      if(value == this.boardArr[vertical][i]){
        return false;
      }
    }

    let columnCorner = 0;
    let rowCorner = 0;
    let squareSize = 3;
    while(horizontal >= columnCorner + squareSize) {
      columnCorner += squareSize;
    }
    while(vertical >= rowCorner + squareSize) {
      rowCorner += squareSize;
    }
    for(let i=rowCorner; i<rowCorner+squareSize; i++) {
      for(let j=columnCorner; j<columnCorner+squareSize; j++) {
        if(value == this.boardArr[i][j]) {        
          return false;
        }
      }
    }
  
    return true;
  }

  // Returns a string representing the current state of the board
  board() {
    let boardArr = [];
    let startIndex = 0;
    for(let i=0; i<9; i++){
      let boardRow = []; 
      for(let j=startIndex; j<startIndex+9; j++){
        boardRow.push(this.boardString[j]);
      }
      startIndex += 9;
      boardArr.push(boardRow);
    }
    return boardArr;
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-02_project-euler_50-easy-puzzles.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string);

// Remember: this will just fill out what it can and not "guess"
// game.solve();

console.log(game.board());
console.log(game.solve());
