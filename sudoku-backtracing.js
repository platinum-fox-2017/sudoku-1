"use strict"

class Sudoku {
  constructor(board_string) {
    this.column  = 9
    this.row = 9
    this.papan = this.board()
    this.check0 = this.check()
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
    for (var i = 0; i < this.check0.length; i++) {
      let row0 = this.check0[i][0]
      let column0 = this.check0[i][1]
      // console.log('col ',column0);
        if (this.papan[row0][column0] == 0) {
          for (var j = 1; j <= 9; j++) {
            if (this.check_column(j, column0) && this.check_row(j,row0) && this.check_area(row0, column0, j)) {
              this.papan[row0][column0] = j

              this.reset_board()
              console.log(" ----------------------------")
              for(let i=0;i<9;i++){
                var simpan=''
                for (let j=0;j<9;j++){
                  if(j===0){
                    simpan+="| "+this.papan[i][j]+" "
                  }else{
                    if(j===2 || j===5 ||j===8){
                      simpan+=" "+this.papan[i][j]+" |"
                    }else{
                      simpan+=" "+this.papan[i][j]+" "
                    }
                  }
                }
                console.log(simpan)
                if(i===2 || i===5 ||i===8){
                  console.log(" ----------------------------")
                }
              }

              // console.log(this.papan)
              this.sleep(100)
              let backtrack = this.solve()
              if (backtrack) {
                return this.papan
              }
              else {
                this.papan[row0][column0] = 0
              }
            }
          }
          return false
        }
    }
    return this.papan
  }

  board() {
    let sudoBoard = []
    for (var i = 0; i < this.row; i++) {
      let firstArr = []
      for (var j = 0; j < this.column; j++) {
        firstArr.push(Number(board_string[i*9+j]))
      }
      sudoBoard.push(firstArr)
    }
    return sudoBoard
  }

  check() {
    let check_0 = []
    for (var i = 0; i < this.row; i++) {
      for (var j = 0; j < this.column; j++) {
        if (this.papan[i][j] === 0) {
          check_0.push([i,j])
        }
      }
    }
    return check_0
  }

  check_column(value, column) {
    let newArr = []
    for (var i = 0; i < 9; i++) {
      newArr.push(this.papan[i][column])
    }
    console.log(newArr)
    return newArr.indexOf(value) == -1
  }

  check_row(value, row) {
    return this.papan[row].indexOf(value) == -1
  }

  check_area(row, column, value) {
    let columnCorner = 0
    let rowCorner = 0
    let squareSize = 3
    while (row >= rowCorner + squareSize) {
      rowCorner += squareSize
    }
    while (column >= columnCorner + squareSize) {
      columnCorner += squareSize
    }
    for (var i = rowCorner; i < rowCorner+squareSize; i++) {
      for (var j = columnCorner; j < columnCorner+squareSize; j++) {
        if (this.papan[i][j] === value) {
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
var tampil=game.solve()
game.reset_board();
console.log(" ----------------------------")
for(let i=0;i<9;i++){
  var simpan=''
  for (let j=0;j<9;j++){
    if(j===0){
      simpan+="| "+tampil[i][j]+" "
    }else{
      if(j===2 || j===5 ||j===8){
        simpan+=" "+tampil[i][j]+" |"
      }else{
        simpan+=" "+tampil[i][j]+" "
      }
    }
  }
  console.log(simpan)
  if(i===2 || i===5 ||i===8){
    console.log(" ----------------------------")
  }
}

// console.log(game.board())
// console.log(game.check_row(8,0))
// console.log(game.check_column(8,3));
