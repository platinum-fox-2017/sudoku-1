"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_value = board_string
    this.board_game = []
  }

  solve(){

  }



  // Returns a string representing the current state of the board
  board() {
    let col_length = Math.sqrt(this.board_value.length)
    let row_length = Math.sqrt(this.board_value.length)
    let count = 0

    for(let i=0; i<col_length; i++){
      this.board_game.push([])
      for(let j=0; j<row_length; j++){
        this.board_game[i].push(this.board_value[count])
        count++
      }

    }
    return this.board_game
  }

  check_column(col, num) {
    for(let i=0; i<this.board_game.length; i++){
      if(this.board_game[i][col] === num){
        return false
      }
    }
    return true
  }

  check_row(row, num) {
    for(let i=0; i<this.board_game.length; i++){
      if(this.board_game[row][i] === num){
        return false
      }
    }
    return true
  }

  check_area(row, col, num){
    let rowvalue = Math.floor(row / 3)* 3
    let colvalue = Math.floor(col / 3)* 3
    for(let i=rowvalue; i<rowvalue+3; i++){
      for(let j=colvalue; j<colvalue+3; j++){
        // console.log(rowvalue)
        console.log(this.board_game[i][j])
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
game.solve()

//console.log(board_string)
console.log(game.board())
game.check_area(0,0)
