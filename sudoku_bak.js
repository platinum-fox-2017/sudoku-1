"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_value = board_string
    this.board_game = []
    this.zeroPos = []
  }

  solve(){
    this.board()
    this.check_zero()
    for(let i=0; i<this.zeroPos.length; i++){
      let rowZero = this.zeroPos[i][0]
      let colZero = this.zeroPos[i][1]
      for(let j=this.board_game[rowZero][colZero]; j<=10; j++){
        if(this.check_column(colZero,j) && this.check_row(rowZero,j) && this.check_area(rowZero,colZero,j)){
          this.board_game[rowZero][colZero] = String(j)
          this.sleep(50)
          console.log(this.board_game)
          break
        }
      }
      if(this.board_game[rowZero][colZero] > 9){
        this.board_game[rowZero][colZero] = '0'
        i -= 2
      }
    }
    console.log(this.board_game)
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
    let rowvalue = 0
    let colvalue = 0
    let square = 3

    while(col >= colvalue + square){
      colvalue += square
    }
    while(row >= rowvalue + square){
      rowvalue += square
    }
    for(let i=rowvalue; i<rowvalue+square; i++){
      for(let j=colvalue; j<colvalue+square; j++){
        if(this.board_game[i][j] === num){
          return false
        }
      }
    }
    return true
  }

  check_zero(){
    let limit = this.board_value.length
    let zeroPos = []
    for(let i=0; i<limit; i++){
      if(this.board_value[i] === '0'){
        this.zeroPos.push(i)
      }
    }
  }

  sleep(milliseconds) {
    var start = new Date().getTime()
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
game.solve()
// game.board()

//console.log(board_string)
// game.check_row(0,3)
console.log(game.board())
console.log('================')
console.log(game.solve())
// game.check_zero()
