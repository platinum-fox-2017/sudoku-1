"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_game = board_string
    this.board_size = []
  }

  solve(){

  }

  check_horizontal() {
    let hasil = ''
    for(let i=0; i<this.board_size.length; i++){
      console.log(this.board_size[0][1])
      
      for(let j=0; j<this.board_size[i].length; j++){
        if(this.board_size[0][i] === '0'){
          return 'ZONK'
        }
      
        else{
          return 'AMAN'
        }
      }
    }
  }

  // Returns a string representing the current state of the board
  board() {
    let col = Math.sqrt(board_string.length)
    let row = Math.sqrt(board_string.length)
    let arrBoard = []
    let count = 0

    for(let i=0; i<col; i++){
      this.board_size.push([])
      for(let j=0; j<row; j++){
        this.board_size[i].push(this.board_game[count])
        count++
      }

    }
    return this.board_size
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
//onsole.log(arrBoard.this.board)
console.log(game.board())
console.log(game.check_horizontal())
