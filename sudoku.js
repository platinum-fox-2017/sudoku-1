"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardsudoku = board_string
    this.papan = this.board()
    this.zero = this.zeroPosition()
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
    // console.log(this.board()[0])
    // console.log(this.board()[0][1])
    // console.log(this.ZeroPosition())
    for (let i = 0; i < this.zero.length; i++) {
      let rowempty = this.zero[i][0]
      let colempty = this.zero[i][1]

      if (this.papan[rowempty][colempty] === 0) {
        for (let j = 1; j < 10; j++) {
          if (this.checkCol(colempty, j) && this.checkRow(rowempty, j) && this.checkGrid(colempty, rowempty, j)) {
            this.papan[rowempty][colempty] = j
            this.reset_board()
            console.log(this.papan)
            this.sleep(300)
            let backtrack = this.solve()
            if (backtrack) {
              return true
            } else {
              this.papan[rowempty][colempty] = 0
            }
          }
        }
        return false
      }
    }
    return this.papan
  }

  // Returns a string representing the current state of the board
  board() {
    let boardSudoku = []
    let count = 0
    for (let i = 0; i < 9; i++) {
      boardSudoku.push([])
      for (let x = 0; x < 9; x++) {
        boardSudoku[i].push(parseInt(this.boardsudoku[count]))
        count++
      }
    }
    return boardSudoku
  }

  zeroPosition() {
    let zeroPos = []
    for (let x = 0; x < this.board().length; x++) {
      for (let y = 0; y < this.board()[x].length; y++) {
        if (this.board()[x][y] === 0) {
          zeroPos.push([x, y])
        }
      }
    }
    return zeroPos
  }

  checkRow(row, values) {
    for (let x = 0; x < this.papan.length; x++) {
      if (this.papan[row][x] === values) {
        return false
      }
    }
    return true
  }

  checkCol(col, values) {
    for (let y = 0; y < this.papan.length; y++) {
      if (this.papan[y][col] === values) {
        return false
      }
    }
    return true
  }

  checkGrid(col, row, values) {
    let gridCol = Math.floor(col / 3) * 3 // 3
    let gridRow = Math.floor(row / 3) * 3 // 3
    for (let i = gridRow; i < gridRow + 3; i++) {
      for (let j = gridCol; j < gridCol + 3; j++) {
        if (this.papan[i][j] === values) {
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
// game.solve()
// Remember: this will just fill out what it can and not "guess"
// console.log(game.board())
// console.log('-------------')
  console.log(game.solve())







