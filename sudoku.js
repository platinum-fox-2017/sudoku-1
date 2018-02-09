"use strict"

class Sudoku {
  constructor(board_string) {
    this.strBoard = board_string
    this.sudokuBoard = this.board()
    this.emptyPosition = this.cekEmpty()
  }

  board() {
    let arrSudoku = []
    let counter = 0
    for(let i =0; i<9; i++){
      arrSudoku.push([])
      for(let j=0; j<9; j++){
        arrSudoku[i].push(Number(this.strBoard[counter]))
        counter++
      }
    }
    return arrSudoku
  }

  cekEmpty(){
    let arrOfZero=[]
    for(let i = 0; i<this.sudokuBoard.length; i++){
      for(let j = 0; j<this.sudokuBoard.length; j++){
        if(this.sudokuBoard[i][j] === 0){
          arrOfZero.push([i,j])
        }
      }
    }
    return arrOfZero
  }

  cekRow(row, value){
    for(let col = 0; col<this.sudokuBoard.length; col++){
      if(this.sudokuBoard[row][col] === value){
        return false
      }
    }
    return true
  }

  cekCol(col, value){
    for(let row = 0; row<this.sudokuBoard.length; row++){
      if(this.sudokuBoard[row][col] === value){
        return false
      }
    }
    return true
  }

  cekArea(row, col, value){
    let rowArea = Math.floor(row/3)*3
    let colArea = Math.floor(col/3)*3
    for(let i = 0; i<3; i++){
      for(let j = 0; j<3; j++){
        if(this.sudokuBoard[rowArea+i][colArea+j]===value){
          return false
        }
      }
    }
    return true
  }

  cekValue(row, col, value){
    return this.cekRow(row, value) && this.cekCol(col, value) && this.cekArea(row, col, value)
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
    for(let i = 0; i<this.emptyPosition.length; i++){
      let row = this.emptyPosition[i][0]
      let col = this.emptyPosition[i][1]

      if(this.sudokuBoard[row][col]==0){
        for(let value = 1; value<=9; value++){
          if(this.cekValue(row, col, value)){
            this.sudokuBoard[row][col] = value
            console.log("\x1B[2J")
            console.log(this.sudokuBoard) 
            this.sleep(50)

            let track = this.solve()
              if(track){
                return true
              }else{
                this.sudokuBoard[row][col] = 0
              }
          }
        }
        return false
      }
    }
    return true
  }
}


var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)
game.solve()

// console.log(game.board())
// console.log(game.cekValue(2, 8, 7))
