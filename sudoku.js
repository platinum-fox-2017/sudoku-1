"use strict"

class Sudoku {
  constructor(board_string) {
    this.column  = 9
    this.row = 9
    this.papan = this.board()
    this.check0 = this.check_0()
  }


  solve() {
    let board = this.papan
    for (var i = 0; i < this.row; i++) {
      let row0 = this.check0[i][0]
      let column0 = this.check0[i][1]
      for (var j = 1; j <= 9; j++) {
        if (this.check_column(j, column0) === true && this.check_row(j,row0) === true && this.check_area(j, row0, column0)) {
          board[row0][column0] = j
        }
      }
    }
    return board
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
    let newBoard = this.papan
    let check_O = []
    for (var i = 0; i < this.row; i++) {
      for (var j = 0; j < this.column; j++) {
        if (newBoard[i][j] === 0) {
          check_O.push([i,j])
        }
      }
    }
    return check_O
  }

  check_column(number, column) {
    let newBoard = this.papan
    let newArr = []
    for (var i = 0; i < 9; i++) {
      newArr.push(newBoard[i][column])
    }
    return newArr.indexOf(number) === -1
  }

  check_row(number, row) {
    let newBoard = this.papan
    return newBoard[row].indexOf(number) === -1
  }

  check_area(number, row, column) {
    let newBoard = this.papan
    let columnCorner = 0
    let rowCorner = 0
    let squareSize = 3
    while (row >= rowCorner + squareSize) {
      rowCorner+= squareSize
    }
    while (column >= columnCorner + squareSize) {
      columnCorner+=squareSize
    }
    for (var i = rowCorner; i < rowCorner+squareSize; i++) {
      for (var j = columnCorner; j < columnCorner+squareSize; j++) {
        if (newBoard[i][j] === number) {
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
