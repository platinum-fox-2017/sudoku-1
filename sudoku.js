"use strict"

class Sudoku {
  constructor(board_string) {
    this.board = board_string
    this.sudoku;
  }

  generateBoard() {
    let arr = [];
    let count = 0;
    for (let i = 0; i < 9; i++) {
      let temp = []
      for (let j = 0; j < 9; j++) {
        temp.push(parseInt(this.board[count]))
        count++
      }
      arr.push(temp)
    }
    this.sudoku = arr
  }

  findPositionO() {
    let arrPositionO = [];
    let board = this.sudoku
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if(board[i][j] === 0) {
          arrPositionO.push([i,j])
        } 
      }
    }
    return arrPositionO
  }

  checkRow(row, num) {
    let board = this.sudoku
    for (let i = 0; i < board[row].length; i++) {

      if (board[row][i] === num) {

        return false
      } 
    }
    return true
  }

  checkCol(col, num) {
    let board = this.sudoku
    for (let i = 0; i < board.length; i++) {
      if (board[i][col] === num) {
        return false
      }
    }

    return true
  }

  checkGrid(row, col, num) {
    let board = this.sudoku
     let rowPos = Math.floor(row/3)
     let colPos = Math.floor(col/3)
     for (let i = rowPos * 3; i < rowPos * 3 + 3; i++) {
        for (let j = colPos * 3; j < colPos * 3 + 3; j++) {
          if(board[i][j] === num) {
            return false
          }
        }
     }
    return true
  }

  solve() {
    let zeroPosition = this.findPositionO();
    let board = this.sudoku;

    for (let i = 0; i < zeroPosition.length; i++) {
      let rowPos = zeroPosition[i][0]
      let colPos = zeroPosition[i][1]

      for (let j = board[rowPos][colPos]+1; j < 11; j++) {
        let rowCheck = this.checkRow(rowPos, j)
        let colCheck = this.checkCol(colPos, j)
        let gridCheck = this.checkGrid(rowPos, colPos, j)

        if (rowCheck === true && colCheck === true && gridCheck === true) {
          board[rowPos][colPos] = j;
          console.log("\x1B[2J")
          console.log(board)
          this.sleep(200)
          break
        }        
      }

      if (board[rowPos][colPos] > 9) {
        board[rowPos][colPos] = 0
        i -=  2
      } 

    }
    return board
  }


  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

  // Returns a string representing the current state of the board
  board() {
    return this.solve();
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
game.generateBoard()
game.solve()
// console.log(game.findPositionO())
// console.log(game.generateBoard())

// console.log(game.checkRow(0, 0))
// console.log(game.checkCol(8, 2))
// console.log(game.checkGrid(2, 8, 8))
// console.log(Math.floor(2/3))