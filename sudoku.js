"use strict"

class Sudoku {
  constructor(board_string) {
    this.board = this.create_board()
    this.zero = this.check_zero()
  }
  solve() {
    for(let i=0; i<this.zero.length; i++){
      let r0 = this.zero[i][0]
      let c0 = this.zero[i][1]
      for(let j=1; j<10; j++){
        if(this.board[r0][c0] == 0){
          if(this.checker_col(j, c0) && this.checker_row(j, r0) && this.checker_grid(j, r0, c0)){
            this.board[r0][c0] = j
            this.sleep(50)
            this.reset_board()
            console.log(this.board)
            if(this.solve()){
              return true
            }
            else {
              this.board[r0][c0] = 0
            }
          }
        }
        return false
      }
    }
    return this.board
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
console.log(game.board);
console.log(game.solve());
