"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string
    this.sudoBoard = this.printBoard()
    this.zeroPos = this.emptyPos()
  }

  printBoard() {
    let board = []
    let count =0
    for(let i =0;i<9;i++){
      let inside = []
      for(let j=0;j<9;j++){
        inside.push(Number(this.board_string[count]))
        count++
      }
      board.push(inside)
    }
    return board
  }

  emptyPos(){
    let pos = []
    for(let i =0;i<this.sudoBoard.length;i++){
      for(let j =0;j<this.sudoBoard.length;j++){
        if(this.sudoBoard[i][j] === 0){
          pos.push([i,j])
        }
      }
    }
    return pos
  }

  checkRow(row,check){
    for (let i =0;i<this.sudoBoard.length;i++){
      if(this.sudoBoard[row][i] === check){
        return false
      }
    }
    return true
  }

  checkCol(col,check){
    for (let i =0;i<this.sudoBoard.length;i++){
      if(this.sudoBoard[i][col] === check){
        return false
      }
    }
    return true
  }

  checkSquare (row,col,check){
    let batasRow = Math.floor(row/3)*3
    let batasCol = Math.floor(col/3)*3
    for(let i =batasRow;i<batasRow+3;i++){
      for(let j=batasCol;j<batasCol+3;j++){
        if(this.sudoBoard[row][col] === check)
        return false
      }
    }
    return true
  }

  solve() {
    for(let i =0;i<this.zeroPos.length;i++){
      let rowZero = this.zeroPos[i][0]
      let colZero = this.zeroPos[i][1]
      if(this.sudoBoard[rowZero][colZero] === 0){
        for(let i =1;i<=9;i++){
          if(this.checkRow(rowZero,i)===true && this.checkCol(colZero,i)===true && this.checkSquare(rowZero,colZero,i)===true){
            this.sudoBoard[rowZero][colZero] = i
            this.reset_board()
            console.log(this.sudoBoard)
            this.sleep(10)
            if(this.solve()){
              return true
            }else{
              this.sudoBoard[rowZero][colZero] = 0
            }
          }
        }
        return false
      }
    }
    return true
  }

  sleep(milliseconds) {
    let start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

  reset_board() {
    console.log("\x1B[2J")
  }
  
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[1]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
// game.solve()

// console.log(game.printBoard())
// console.log(game.emptyPos())
// console.log(game.checkSquare(0,0,0))
console.log(game.solve())
