"use strict"

class Sudoku {
  constructor(board_string) {
    this.board = this.create_board()
    this.zero = this.check_zero()
  }
  solve() {
    let gameBoard = this.board
    for(let i=0; i<this.zero.length; i++){
      let r0 = this.zero[i][0]
      let c0 = this.zero[i][1]
      for(let j=1; j<=9; j++){
        if(this.checker_row(j, r0) === true && this.checker_col(j, c0) === true && this.checker_grid(j, r0, c0) === true){
          gameBoard[r0][c0] = j
        }
      }
    }
    return gameBoard
  }

  // Returns a string representing the current state of the board
  create_board() {
    let result = [];
    for(let i=0; i<9; i++){
      let row = [];
      for(let j=i*9; j<i*9+9; j++){
        row.push(+board_string[j])
      }
      result.push(row)
    }
    return result
  }

  check_zero(){
    let result = [];
    for(let i=0; i<9; i++){
      for(let j=0; j<9; j++){
        if(this.board[i][j] === 0){
          result.push([i,j])
        }
      }
    }
    return result
  }

  checker_col(num, col){
    let down = [];
    for(let i = 0; i < 9; i++) {
      down.push(this.board[i][col]);
    }
    return (down.indexOf(num) === -1)
  }

  checker_row(num, row){
    return (this.board[row].indexOf(num) === -1)
  }

  checker_grid(num, row, col){
    let r = Math.floor(row/3)*3;
    let c = Math.floor(col/3)*3;

    let grid = []
    for(let i=c; i<c+3; i++){
      for(let j=r; j<r+3; j++){
        grid.push(this.board[i][j])
      }
    }
    return (grid.indexOf(num) === -1)
  }

  checker(num, row, col){
    console.log(this.board);
    if(this.checker_col(num, col) && this.checker_row(num, row) && this.checker_grid(num, row, col)){
      return true
    }
    return false
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
console.log(game.board);
console.log('  ------------AFTER------------');
console.log(game.solve());
