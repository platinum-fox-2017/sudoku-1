"use strict"

  function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

class Sudoku {
  constructor(board_string) {
    this.sudoku = []
    this.board_string = board_string
    this.zeroIndex = []
  }

  board() {
    let count = 0
    for (let i = 0; i < 9;i++){
      let temp = []
      for (let j = 0;j < 9;j++){
        temp.push(this.board_string[count])
        count++
      }
      this.sudoku.push(temp)
    }
    return this.sudoku
  }

  findZero(){
    for (var i = 0; i < this.board_string.length; i++) {
      if(this.board_string[i] === '0'){
        this.zeroIndex.push(i)
      }
    }
  }

  solve() {
    let row = 0, col =0
    this.board()
    this.findZero()
    console.log(this.sudoku);
    for (var i = 0; i < this.zeroIndex.length; i++) {
      row = Math.floor(this.zeroIndex[i]/9)
      col = this.zeroIndex[i]%9
      for (var j = this.sudoku[row][col]; j <= 10; j++) {
        if(this.checkRow(row,j) && this.checkCol(col,j) && this.checkArea(row,col,j)){
          this.sudoku[row][col] = String(j)
          sleep(100)
          console.log(this.sudoku);
          break;
        }
      }
      if (this.sudoku[row][col] > 9) {
        this.sudoku[row][col] = '0'
        i -= 2
      }
    }
    console.log(this.sudoku);
  }


  checkRow(row,index){
    if(this.sudoku[row].indexOf(index.toString()) !== -1){
      return false
    }
    return true
  }

  checkCol(col,index){
    for (var i = 0; i < 9; i++) {
      if(this.sudoku[i][col] == index){
        return false
      }
    }
    return true
  }

  checkArea(row,col,input){
    row = Math.floor(row/3)*3
    col = Math.floor(col/3)*3

     for (var i = row; i < (3+row); i++) {
       for (var j = col; j < (3+col); j++) {
         if(this.sudoku[i][j] == input){
           return false
         }
       }
     }
     return true
  }
}


var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
.split("\n")[10]

var game = new Sudoku(board_string)

game.solve()
// game.board()
// game.findZeroIndex()
// console.log(game.sudoku)
// console.log(game.zeroIndex);
