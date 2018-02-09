"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string
    this.board = this.boards()
    this.empty = this.emptyPositions()
  }

  boards(){
    let board = [];
    for (let i = 0; i < 9; i++){
        board.push([])
        for (let j = 0; j < 1; j++){
            var set = 9
            var multiplier = i*9
            board[i].push(this.board_string.slice(multiplier, set*(i+1)))
            board[i] = board[i][0].split('').map(a => +a)    
        }
    }
    return board
  }

  emptyPositions(){
    let emptyCoordinates = [];

    for (let i = 0; i < this.board.length; i++){
      for (let j = 0; j < this.board[i].length; j++){
        if (this.board[i][j] === 0){
          emptyCoordinates.push([i,j])
        }
      }
    }
    return emptyCoordinates
  }

  checkRow(board, row, num){
    for (let i = 0; i < board[row].length; i++){
        if (board[row][i] === num){
            return false
        }
    }
    return true
  }

  checkCol(board, col, num){
    for (let i = 0; i < board[col].length; i++){
        if (board[i][col] === num){
            return false
        }
    }
    return true
  }

  check3by3(board, row, col, num){
    let rowCoordinate = Math.floor(row/3)*3
    let colCoordinate = Math.floor(col/3)*3

    for (let i = rowCoordinate; i < rowCoordinate+3; i++){
        for (let j = colCoordinate; j < colCoordinate+3; j++){
            if (board[i][j] == num){
                return false
            }
        }
    }
    return true
  }

  checkOk(board, row, col, num){
      if (this.checkRow(board, row, num) && this.checkCol(board, col, num) && this.check3by3(board, row, col, num)){
          return true
      } else {
          return false
      }
  }

  solve() {
      let maxNum = 9
      let row, col, num, found

      for (let i = 0; i < this.empty.length;){
        row = this.empty[i][0]
        col = this.empty[i][1]
        num = this.board[row][col] + 1
        found = false

        while (!found && num <= maxNum){
            if (this.checkOk(this.board, row, col, num)){
                found = true
                this.board[row][col] = num
                i++
            } else {
                num++
            }
        }

        if (!found) {
            this.board[row][col] = 0
            i--
        }
      }
      return this.board.map(a => a.map(b => ''+b).join(' ')).join("\n")
  }

}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[12]

var board_string2 = fs.readFileSync('set-02_project-euler_50-easy-puzzles.txt').toString().split('\n')[0]
  
// var game = new Sudoku(board_string)
var game = new Sudoku(board_string2)

console.log(game.solve())