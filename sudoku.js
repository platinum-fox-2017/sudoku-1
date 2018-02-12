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
    this.board_string = board_string
    this.boards = []
  }

  solve() {
    //------------------backtrack recursive --------------------
    for( let row = 0 ; row < 9 ; row++){
      for(let column = 0 ; column < 9 ; column++ ){
        if(this.boards[row][column] == 0){
          for( let angka = 1 ; angka <= 9 ; angka++){
            if(this.checkBaris(row,column,angka) && this.checkColoum(row,column,angka) && this.checkArea(row,column,angka)){
              this.boards[row][column] = angka
              console.log(this.boards)
              console.log(`jumlah posisi 0 : ${this.zeroPosition().length}`)
              sleep(1)
                if (this.solve()){
                  return true
                } else {
                  this.boards[row][column] = 0
                }
              }
            }
          return false
        }
      }
    }
    return true
  }


  board() {
    let sum = 0
    for(let i = 0 ; i < 9 ; i++){
      this.boards.push([])
      for(let j = 0; j < 9 ; j++){
        this.boards[i].push(Number(this.board_string[sum]))
        sum += 1
      }
    }
    return this.boards
  }

  zeroPosition (){
    let zeroIndex = []
    for(let i = 0 ; i < 9 ;i++){
      for(let j = 0 ; j < 9 ; j++){
        if(this.boards[i][j] === 0){
          zeroIndex.push([i,j])
        }
      }
    }
    return zeroIndex
  }

  checkBaris(baris,column,angka){
    let validasiBaris = true
    for(let i = 0 ; i < 9 ; i ++){
        if(this.boards[i][column] == angka){
           validasiBaris = false
        }
    }
    return validasiBaris
  }

  checkColoum(baris,column,angka){
    let validasiColumn = true
    for(  let i  = 0 ; i < 9 ; i++){
        if(this.boards[baris][i] == angka){
           validasiColumn = false
      }
    }
    return validasiColumn
  }

  checkArea(baris,column,angka){
    let validasiArea = true
    let row = Math.floor(baris/3)*3
    let col = Math.floor(column/3)*3
    for(let i = row ; i < row+3 ; i++){
      for(let j = col ; j < col+3 ;j++){
        if(this.boards[i][j] == angka){
          validasiArea = false
        }
      }
    }
    return validasiArea
  }


}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]
let baru = '300906700000005000078000900046008007720000054100300620004000370000100000007403001'

var game = new Sudoku(baru)
game.board()
// console.log(game.zeroPosition().length)
// Remember: this will just fill out what it can and not "guess"
game.solve()
// console.log(game.board())
