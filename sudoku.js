"use strict"

class Sudoku {
  constructor(board_string) { }

  solve() { }

  // Returns a string representing the current state of the board
  board() {
    let boardSudoku = []
    let count = 0
    for (let i = 0; i < 9; i++) {
      boardSudoku.push([])
      for (let x = 0; x < 9; x++) {
        boardSudoku[i].push(board_string[count])
        count++
      }
    }
    return boardSudoku
  }
  // console.log(boardSudoku)

  // return boardSudoku
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



