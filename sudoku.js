"use strict"

class Sudoku {
  constructor(board_string) {
    this.sudokuBoard = this.board(board_string)
  }

  // Returns a string representing the current state of the board
  board() {
    //membuar nilai board_string menjadi board
    let arrBoard = []
    let size = 9
    for(let i=0; i<size; i++) {
      arrBoard.push([])
      for(let j=0; j<size; j++) {
        arrBoard[i].push(board_string[(i*size)+j])
      }
    }
    return arrBoard
  }

  //mencari angka unik
  solve() {
    let index = {
      row: 0,
      column:0,
      num: 0
    }
    let stack = []
    let number = 1

    for(index.row= 0; index.row<this.sudokuBoard.length; index.row++) {
      for(index.column=0; index.column<this.sudokuBoard.length; index.column++) {
        if(this.sudokuBoard[index.row][index.column] == 0) {
          if(this.isUnique(index,number)) {
            this.sudokuBoard[index.row][index.column] = number
            index.num = number
            stack.push(index)
            number = 0
            index.column = index.column+1
          } else {
            if(number > 8) {
              this.sudokuBoard[index.row][index.column] = 0
              stack  = stack.pop()
              number = index.num
              this.sudokuBoard[index.row][index.column] = 0
            }
          }
        } else {
          index.column++
          number = 1
        }
        number++
      }
    }





  }
  // solve() {
  //   //membuat penentuan titik yang akan dicek, di cek dari 0,0 --> 8,8
  //   let index = {
  //     row: 0,
  //     column: 0
  //   }
  //
  //   if(!this.find0(index)) {
  //     return true
  //   } else {
  //     for(let i=1; i<=9; i++) {
  //       if(this.isUnique(i, index)) {
  //         this.sudokuBoard[index.row][index.column] = String(i)
  //         if(this.solve()){
  //           this.sudokuBoard[index.row][index.column] = 0
  //           return true
  //         }
  //       }
  //     }
  //   }
  //   return false
  // }

  //memeriksa apakah pada index tersebut bernilai 0
  // find0(index) {
  //   for(index.row = 0; index.row<this.sudokuBoard.length; index.row++) {
  //     for(index.column = 0; index.column<this.sudokuBoard.length; index.column++) {
  //       if(this.sudokuBoard[index.row][index.column] == 0) {
  //         // console.log(index.row, index.column);
  //         return true
  //       }
  //     }
  //   }
  //   return false
  // }

  //recheck baris, kolom dan blok
  isUnique(index, num) {
    if(!this.checkHoarizontal(num,index) && !this.checkVertical(num,index) && !this.checkBlok(num,index)) {
      return true
    } else {
      return false
    }
  }

  //memeriksa baris
  checkHoarizontal(index, num) {
    for(let i=0; i<this.sudokuBoard.length; i++) {
      if(this.sudokuBoard[index.row][i] == num) {
        return true
      }
    }
    return false
  }

  //memeriksa kolom
  checkVertical(index, num) {
    for(let i=0; i<this.sudokuBoard.length; i++) {
      if(this.sudokuBoard[i][index.column] == num) {
        return true
      }
    }
    return false
  }

  //memeriksa blok
  checkBlok(index, num) {
    for(let i=index.row-index.row%3; i<3; i++) {
      for(let j=index.column-index.column%3; j<3; j++) {
        if(this.sudokuBoard[i][j] == num) {
          return true
        }
      }
    }
    return false
  }

  //memberikan papan yang sudah update dengan nilai pengecekan
  boardSolved() {
    return this.sudokuBoard;
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
console.log(game.board())
game.solve()
console.log(game.boardSolved())
// console.log(game.solve())
