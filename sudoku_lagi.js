"use strict"

class Sudoku {
  constructor(board_string) {
    this.board = this.create_board()
    this.zero = this.check_zero()
  }
  solve() {
    for(let i=0; i<this.zero.length; i++){
      let r0 = Math.floor(this.zero[i]/9)
      let c0 = this.zero[i]%9
      for(let j=this.board[r0][c0]; j<=10; j++){
        if(this.checker_col(j, c0) && this.checker_row(j, r0) && this.checker_grid(j, r0, c0)){
          this.board[r0][c0] = j
          this.sleep(50)
          this.reset_board()
          console.log(this.board)
          break
        }
      }
      if(this.board[r0][c0] == 10){
        this.board[r0][c0] = 0
        i -= 2
      }
    }
    return 'DONE';
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
    for(let i=0; i<board_string.length; i++){
      if(board_string[i] == 0){
        result.push(i)
      }
    }
    return result
  }

  checker_col(num, col){
    for(let i=0; i<9; i++){
      if(this.board[i][col] == num){
        return false
      }
    }
    return true
  }

  checker_row(num, row){
    if (this.board[row].indexOf(num) !== -1){
      return false
    }
    return true
  }

  checker_grid(num, row, col){
    let r = Math.floor(row/3)*3;
    let c = Math.floor(col/3)*3;

    for(let i=r; i<r+3; i++){
      for(let j=c; j<c+3; j++){
        if(this.board[i][j] == num){
          return false
        }
      }
    }
    return true
  }

  reset_board() {
    console.log("\x1B[2J")
  }

  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
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

// console.log(game.zero);
console.log(game.board);
console.log(game.solve());
