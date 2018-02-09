"use strict"

class Sudoku {
  constructor(board_string) {
    this.column  = 9
    this.row = 9
    this.papan = this.board()
    this.check0 = this.check_0()
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

  solve() {
    // let this.papan = this.papan
    for (var i = 0; i < this.check0.length; i++) {
      let row0 = this.check0[i][0]
      let column0 = this.check0[i][1]
      // console.log('col ',column0);
        if (this.papan[row0][column0] == 0) {


        // if ((this.papan[row0][column0]) == 0) {

          for (var j = 1; j <= 9; j++) {
            if (this.check_column(j, column0) && this.check_row(j,row0) && this.check_area(row0, column0, j)) {
              this.papan[row0][column0] = j

              this.reset_board()
              console.log(this.papan)
              this.sleep(100)
              let backtrack = this.solve()
              // console.log('hahahaha ', backtrack);
              if (backtrack) {
                return true
              }
              else {
                this.papan[row0][column0] = 0
              }
            }
          }
          return false
        // }
      }
    }
    return this.papan
  }

  board() {
    let sudoBoard = []
    for (var i = 0; i < this.row; i++) {
      let firstArr = []
      for (var j = 0; j < this.column; j++) {
        firstArr.push(+board_string[i*9+j])
      }
      sudoBoard.push(firstArr)
    }
    return sudoBoard
  }

  check_0() {
    let check_0 = []
    for (var i = 0; i < this.row; i++) {
      for (var j = 0; j < this.column; j++) {
        if (this.papan[i][j] === 0) {
          check_0.push([i,j])
        }
      }
    }
    return check_0
  }

  check_column(number, column) {
    let newArr = []
    for (var i = 0; i < 9; i++) {
      newArr.push(this.papan[i][column])
    }
    return newArr.indexOf(number) == -1
  }

  check_row(number, row) {
    return this.papan[row].indexOf(number) == -1
  }

  check_area(row, column, number) {
    let columnCorner = 0
    let rowCorner = 0
    let squareSize = 3
    while (row >= rowCorner + squareSize) {
      rowCorner += squareSize
    }
    while (column >= columnCorner + squareSize) {
      columnCorner += squareSize
    }
    for (var i = rowCorner; i < rowCorner+squareSize; i++) {
      for (var j = columnCorner; j < columnCorner+squareSize; j++) {
        if (this.papan[i][j] === number) {
          return false
        }
      }
    }
    return true
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
game.solve()
console.log(game.solve());

// console.log(game.board())
// console.log(game.check_row(8,0))
// console.log(game.check_column(8,3));
