"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardsudoku = board_string
  }

  solve() { }

  // Returns a string representing the current state of the board
  board() {
    let boardSudoku = []
    let count = 0
    for (let i = 0; i < 9; i++) {
      boardSudoku.push([])
      for (let x = 0; x < 9; x++) {
        boardSudoku[i].push(this.boardsudoku[count])
        count++
      }
    }
    return boardSudoku
  }

  ZeroPosition() {
    let zeroPos = []
    for (let x = 0; x < this.board().length; x++) {
      for (let y = 0; y < this.board()[x].length; y++) {
        if (this.board()[x][y] === '0') {
          zeroPos.push([x, y])
        }
      }
    }
    return zeroPos
  }

  CheckRow(row, values) {
    for (let x = 0; x < this.board().length; x++) {
      if (parseInt(this.board()[row][x]) === values) {
        return false
      }
    }
    return true
  }

  checkCol(col, values) {
    for (let y = 0; y < this.board().length; y++) {
      if (parseInt(this.board()[y][col]) === values) {
        return false
      }
    }
    return true
  }

  checkGrid(col, row, values) {

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
// game.solve()

console.log(game.board())
// console.log(game.ZeroPosition())
console.log(game.CheckRow(0, 9))
console.log(game.checkCol(0, 7))
console.log(game.checkGrid(0, 1, 9))



