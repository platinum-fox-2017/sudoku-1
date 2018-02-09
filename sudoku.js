"use strict"

class Sudoku {
  constructor(board_string) {
    this.input = board_string
    this.boardGame = this.board()
  }

  solve() {
    let zeroPos = this.zeroIdentifier()
    let board = this.boardGame
    console.log(zeroPos);
    for (let i = 0; i < zeroPos.length; i++) {
      let row = zeroPos[i][0]
      let column = zeroPos[i][1]
      if(board[row][column] === 0) {
        for (let j = 1; j <= 9; j++) {
          if(this.rowChecker(row,j) && this.columnChecker(column,j) && this.grid_checker(column, row, j)) {
            board[row][column] = j
          }
        }
      }
    }
    return board
  }

  // Returns a string representing the current state of the board
  board() {
    let board = []
    var count = 0
    for (let i = 0; i < 9; i++) {
      let arr = []
      for (let j = 0; j < 9; j++) {
        arr.push(Number(this.input[count]))
        count++
      }
      board.push(arr)
    }
    return board
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

  zeroIdentifier() {
    let board = this.boardGame
    let zeroIndex = []
    for (let i = 0; i < 9; i++) {
      for(let j = 0; j< 9; j++) {
        if(board[i][j] === 0) {
          zeroIndex.push([i,j])
        }
      }
    }
    return zeroIndex
  }

  rowChecker(row, num) {
    let board = this.boardGame
    for (let i = 0; i < 9; i++) {
      if(board[row][i] === num) {
        return false
      }
    }
    return true
  }

  columnChecker(column, num) {
    let board = this.boardGame
    for (let i = 0; i < 9; i++) {
      if(board[i][column] === num) {
        return false
      }
    }
    return true
  }

  grid_checker(column, row, num) {
        let columnStart = 0;
        let rowStart = 0;
        let boxSize = 3;
        let board = this.boardGame
        //Checking from left column
        while (column >= columnStart + boxSize) {
            columnStart += boxSize
        }
        // console.log(columnStart)
        //Checking from top row
        while (row >= rowStart + boxSize) {
            rowStart += boxSize
        }
        // console.log(rowStart)
        for (let i = columnStart; i < columnStart + boxSize; i++) {
            for (let j = rowStart; j < rowStart + boxSize; j++) {
                if (board[i][j] === num) {
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

// console.log(game.board())
// console.log(game.zeroIdentifier());
// console.log(game.rowChecker(0,7));
console.log(game.solve());
// console.log(game.columnChecker(0,5));
// console.log(game.grid_checker(0,0,3));
