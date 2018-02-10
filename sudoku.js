"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_values = board_string
    this.board_game= []
    this.zeroPos = []
  }

  solve() {
    let row = 0
    let col = 0
    this.board()
    this.check_zero()
    console.log(this.board_game);
    for (let i=0; i<this.zeroPos.length; i++) {
      row = Math.floor(this.zeroPos[i]/9)
      col = this.zeroPos[i]%9
      for (let j=this.board_game[row][col]; j<=10; j++) {
        if(this.check_row(row,j) && this.check_column(col,j) && this.check_area(row,col,j)){
          this.board_game[row][col] = j.toString()
          this.sleep(15)
          console.log(this.board_game);
          break;
        }
      }
      if (this.board_game[row][col] > 9) {
        this.board_game[row][col] = '0'
        i -= 2
      }
    }
    console.log(this.board_game);
  }

  board() {
    let count = 0
    for (let i=0; i<9; i++){
      let arrBoard = []
      for (let j=0; j<9; j++){
        arrBoard.push(this.board_values[count])
        count++
      }
      this.board_game.push(arrBoard)
    }
    return this.board_game
  }

  check_row(row, num){
    if(this.board_game[row].indexOf(num.toString()) !== -1){
      return false
    }
    return true
  }

  check_column(col, num){
    for (let i=0; i<9; i++) {
      if(this.board_game[i][col] == num){
        return false
      }
    }
    return true
  }

  check_area(row, col, num){
    row = Math.floor(row/3)*3
    col = Math.floor(col/3)*3

     for (let i = row; i<(3+row); i++) {
       for (let j = col; j<(3+col); j++) {
         if(this.board_game[i][j] === num){
           return false
         }
       }
     }
     return true
  }


  check_zero(){
    for (let i = 0; i < this.board_values.length; i++) {
      if(this.board_values[i] === '0'){
        this.zeroPos.push(i)
      }
    }
  }

  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

}


var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
.split("\n")[6]

var game = new Sudoku(board_string)

game.solve()
// game.board()
//console.log(board_string)
// game.check_row(0,3)
//console.log(game.board())
console.log('==============FINISHED===========')
//console.log(game.solve())
// game.check_zero()
