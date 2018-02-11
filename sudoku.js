"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardString = board_string;
    this.boardArr = this.board();
    this.fill = [1,2,3,4,5,6,7,8,9];
  }

  solve() {
    var solvedBoard = this.boardArr;
    for(let i=0; i<solvedBoard.length; i++){
      for(let j=0; j<solvedBoard[i].length; j++){
        if(solvedBoard[i][j]==0){
          for(let k=0; k<this.fill.length; k++){
            if(this.checker(i, j, this.fill[k].toString(), solvedBoard)){
              solvedBoard[i][j] = this.fill[k].toString();
            }
          }
        }
      }
    }
    return solvedBoard;
  }

  checker(vertical, horizontal, value, board){
    for(let i=0; i<9; i++){
      if(value == board[i][horizontal]){
        return false;
      }
    }

    for(let i=0; i<9; i++){
      if(value == board[vertical][i]){
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
        if(value == board[i][j]) {        
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
